#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime
import re

USERNAME = 'clroymustang'
PROFILE_URL = f'https://letterboxd.com/{USERNAME}/'

def fetch_letterboxd_data():
    try:
        print(f'Fetching Letterboxd data for {USERNAME}...')
        
        # Fetch the profile page
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(PROFILE_URL, headers=headers, timeout=15)
        response.raise_for_status()
        
        html_content = response.content.decode('utf-8')
        soup = BeautifulSoup(html_content, 'html.parser')
        films = []
        
        print(f'Page fetched, searching for films...')
        
        # Try multiple selectors
        selectors = [
            ('div.poster', 'div'),  # Recent watches
            ('li.poster-container', 'li'),
            ('a.film-poster', 'a'),
            ('div[data-film-id]', 'div'),
        ]
        
        for selector, tag in selectors:
            elements = soup.select(selector) if tag == 'div' else soup.find_all(tag, class_=selector.split('.')[1] if '.' in selector else None)
            
            if len(elements) > 0:
                print(f'Found {len(elements)} elements with selector: {selector}')
                
                for elem in elements:
                    if len(films) >= 20:
                        break
                    
                    # Try to extract link and image
                    link_elem = elem.find('a') if elem.name != 'a' else elem
                    img_elem = elem.find('img') if elem.name != 'img' else elem
                    
                    if not img_elem:
                        img_elem = link_elem.find('img') if link_elem else None
                    
                    if link_elem and img_elem:
                        href = link_elem.get('href')
                        title = img_elem.get('alt') or img_elem.get('title') or link_elem.get('title')
                        poster_src = img_elem.get('src') or img_elem.get('data-src')
                        
                        if href and title and not 'watchlist' in str(title).lower():
                            films.append({
                                'title': str(title).strip(),
                                'url': f'https://letterboxd.com{href}' if href.startswith('/') else href,
                                'poster': str(poster_src) if poster_src else None
                            })
                            print(f'  Added: {title}')
                
                if len(films) > 0:
                    break
        
        print(f'Total films found: {len(films)}')
        
        # Create _data directory if it doesn't exist
        data_dir = os.path.join(os.path.dirname(__file__), '..', '_data')
        os.makedirs(data_dir, exist_ok=True)
        
        # Write to JSON file
        output_file = os.path.join(data_dir, 'letterboxd.json')
        data = {
            'username': USERNAME,
            'profile_url': PROFILE_URL,
            'films': films,
            'last_updated': datetime.now().isoformat(),
            'total_films': len(films)
        }
        
        with open(output_file, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f'✓ Saved {len(films)} films to {output_file}')
        
    except Exception as error:
        print(f'Error fetching Letterboxd data: {str(error)}')
        import traceback
        traceback.print_exc()
        
        # Create fallback file
        data_dir = os.path.join(os.path.dirname(__file__), '..', '_data')
        os.makedirs(data_dir, exist_ok=True)
        
        output_file = os.path.join(data_dir, 'letterboxd.json')
        fallback_data = {
            'username': USERNAME,
            'profile_url': PROFILE_URL,
            'films': [],
            'last_updated': datetime.now().isoformat(),
            'error': str(error),
            'total_films': 0
        }
        
        with open(output_file, 'w') as f:
            json.dump(fallback_data, f, indent=2)
        
        print('Created fallback letterboxd.json')
        exit(1)

if __name__ == '__main__':
    fetch_letterboxd_data()

