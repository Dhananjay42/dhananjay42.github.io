#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime

USERNAME = 'clroymustang'
PROFILE_URL = f'https://letterboxd.com/{USERNAME}/'

def fetch_letterboxd_data():
    try:
        print(f'Fetching Letterboxd data for {USERNAME}...')
        
        # Fetch the profile page
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(PROFILE_URL, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        films = []
        
        # Find all film posters
        posters = soup.find_all('div', class_='poster')
        
        for poster in posters:
            if len(films) >= 20:
                break
            
            link_elem = poster.find('a')
            img_elem = poster.find('img')
            
            if link_elem and img_elem:
                href = link_elem.get('href')
                title = img_elem.get('alt') or img_elem.get('title')
                poster_src = img_elem.get('src')
                
                if href and title:
                    films.append({
                        'title': title.strip(),
                        'url': f'https://letterboxd.com{href}',
                        'poster': poster_src
                    })
        
        print(f'Found {len(films)} films')
        
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
