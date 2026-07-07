---
layout: single
title: "Letterboxd"
permalink: /letterboxd/
author_profile: true
---

## My Recent Watches

I track all my film watches on Letterboxd. Here's a snapshot of what I've been watching recently:

<div style="margin: 2rem 0; text-align: center;">
  <p>
    <a href="https://letterboxd.com/clroymustang/" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 1rem 2rem; background: #3d5afe; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;">Visit My Letterboxd Profile →</a>
  </p>
</div>

<div id="letterboxd-widget" style="margin: 2rem 0;">
  <div id="letterboxd-loading" style="text-align: center; padding: 2rem;">
    <p>Loading recent watches...</p>
  </div>
  <div id="letterboxd-content" style="display: none;"></div>
</div>

<style>
  .letterboxd-films {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
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
    font-size: 0.8rem;
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
</style>

<script>
async function fetchLetterboxdWatches() {
  const username = 'clroymustang';
  const loading = document.getElementById('letterboxd-loading');
  const content = document.getElementById('letterboxd-content');

  try {
    // Fetch directly from Letterboxd profile page
    const profileUrl = `https://letterboxd.com/${username}/`;
    const response = await fetch(profileUrl);
    const html = await response.text();
    
    // Extract recent films from the HTML
    // Looking for film poster data in the page
    const filmMatches = html.match(/<li class="poster-container[^>]*>[\s\S]*?<\/li>/g) || [];
    
    if (filmMatches.length === 0) {
      throw new Error('No films found');
    }

    let html_output = '<h3>Recent Watches</h3>';
    html_output += '<div class="letterboxd-films">';
    
    let count = 0;
    filmMatches.forEach(match => {
      if (count >= 15) return;
      
      // Extract image URL
      const imgMatch = match.match(/src="([^"]+\.jpg)"/);
      const hrefMatch = match.match(/href="([^"]+)"/);
      
      if (imgMatch && hrefMatch) {
        const imgUrl = imgMatch[1];
        const filmUrl = hrefMatch[1];
        const filmTitle = match.match(/title="([^"]+)"/);
        const title = filmTitle ? filmTitle[1] : 'Unknown';
        
        html_output += `
          <div class="letterboxd-film">
            <a href="https://letterboxd.com${filmUrl}" target="_blank" rel="noopener noreferrer">
              <img src="${imgUrl}" alt="${title}" loading="lazy" style="max-width: 100%;">
            </a>
            <div class="letterboxd-film-title">
              <a href="https://letterboxd.com${filmUrl}" target="_blank" rel="noopener noreferrer">${title}</a>
            </div>
          </div>
        `;
        count++;
      }
    });
    
    html_output += '</div>';
    
    if (count > 0) {
      content.innerHTML = html_output;
      content.style.display = 'block';
    } else {
      throw new Error('No films could be extracted');
    }
    loading.style.display = 'none';
    
  } catch (error) {
    console.error('Error fetching Letterboxd data:', error);
    loading.innerHTML = '<p style="color: #666;">Unable to load dynamic feed. Check out my <a href="https://letterboxd.com/clroymustang/" target="_blank" rel="noopener noreferrer">full profile</a> for all my watches!</p>';
  }
}

// Fetch when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchLetterboxdWatches);
} else {
  fetchLetterboxdWatches();
}
</script>
