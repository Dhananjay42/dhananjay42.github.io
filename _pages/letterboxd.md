---
layout: single
title: "Letterboxd"
permalink: /letterboxd/
author_profile: true
---

<div id="letterboxd-widget" style="margin: 2rem 0;">
  <div id="letterboxd-loading" style="text-align: center; padding: 2rem;">
    <p>Loading recent watches...</p>
  </div>
  <div id="letterboxd-content" style="display: none;"></div>
</div>

<style>
  .letterboxd-films {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .letterboxd-film {
    text-align: center;
  }

  .letterboxd-film img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
  }

  .letterboxd-film img:hover {
    transform: scale(1.05);
  }

  .letterboxd-film-title {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    max-height: 2.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .letterboxd-film-title a {
    text-decoration: none;
    color: inherit;
  }

  .letterboxd-film-title a:hover {
    text-decoration: underline;
  }

  .letterboxd-profile-link {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background: #2e3440;
    color: #eceff4;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
  }

  .letterboxd-profile-link:hover {
    background: #3b4252;
  }
</style>

<script>
async function fetchLetterboxdWatches() {
  const username = 'clroymustang';
  const loading = document.getElementById('letterboxd-loading');
  const content = document.getElementById('letterboxd-content');

  try {
    // Fetch from Letterboxd RSS feed
    const rssUrl = `https://letterboxd.com/${username}/rss/`;
    
    // Using a CORS proxy since Letterboxd RSS might have CORS issues
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();
    
    // Parse the XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');
    
    let html = '<h2>Recent Watches</h2>';
    html += '<div class="letterboxd-films">';
    
    // Get first 20 recent watches
    let count = 0;
    items.forEach(item => {
      if (count >= 20) return;
      
      const title = item.querySelector('title')?.textContent || 'Unknown';
      const link = item.querySelector('link')?.textContent || '#';
      const description = item.querySelector('description')?.textContent || '';
      
      // Extract image from description if available
      const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : 'https://a.ltrbxd.com/resized/film-0-0-0-0-0ZKUnhikfmbjEZbIh0w2Tg-300-450-0-300-crop.jpg';
      
      if (title !== 'watched' && !title.includes('watchlist')) {
        html += `
          <div class="letterboxd-film">
            <a href="${link}" target="_blank" rel="noopener noreferrer">
              <img src="${imageUrl}" alt="${title}" loading="lazy">
            </a>
            <div class="letterboxd-film-title">
              <a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>
            </div>
          </div>
        `;
        count++;
      }
    });
    
    html += '</div>';
    html += `<a href="https://letterboxd.com/${username}/" target="_blank" rel="noopener noreferrer" class="letterboxd-profile-link">Visit Full Profile →</a>`;
    
    content.innerHTML = html;
    content.style.display = 'block';
    loading.style.display = 'none';
    
  } catch (error) {
    console.error('Error fetching Letterboxd data:', error);
    loading.innerHTML = '<p>Unable to load recent watches. <a href="https://letterboxd.com/clroymustang/" target="_blank">Visit Letterboxd profile →</a></p>';
  }
}

// Fetch when page loads
document.addEventListener('DOMContentLoaded', fetchLetterboxdWatches);
</script>
