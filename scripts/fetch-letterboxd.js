const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const USERNAME = 'clroymustang';
const PROFILE_URL = `https://letterboxd.com/${USERNAME}/`;

async function fetchLetterboxdData() {
  try {
    console.log(`Fetching Letterboxd data for ${USERNAME}...`);

    // Fetch the profile page
    const response = await axios.get(PROFILE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    const films = [];

    // Find all film posters on the page
    $('li[data-film-id]').each((index, element) => {
      if (films.length >= 20) return; // Limit to 20 recent films

      const $film = $(element);
      
      // Extract data from the poster
      const filmLink = $film.find('a[data-film-link]').attr('href');
      const filmTitle = $film.find('img').attr('alt');
      const posterImg = $film.find('img').attr('src');
      
      if (filmLink && filmTitle) {
        films.push({
          title: filmTitle,
          url: `https://letterboxd.com${filmLink}`,
          poster: posterImg || null,
          watched_date: null // Would need to parse from page if needed
        });
      }
    });

    // If we couldn't parse posters, try alternative method with a-tags
    if (films.length === 0) {
      $('a.film-poster').each((index, element) => {
        if (films.length >= 20) return;

        const href = $(element).attr('href');
        const title = $(element).attr('title');
        const style = $(element).attr('style');
        
        // Extract poster URL from background-image style
        let posterUrl = null;
        if (style && style.includes('background-image')) {
          const match = style.match(/url\(['"]?([^'")]+)['"]?\)/);
          posterUrl = match ? match[1] : null;
        }

        if (href && title) {
          films.push({
            title: title,
            url: `https://letterboxd.com${href}`,
            poster: posterUrl,
            watched_date: null
          });
        }
      });
    }

    // Save to JSON file
    const dataDir = path.join(__dirname, '..', '_data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputFile = path.join(dataDir, 'letterboxd.json');
    const data = {
      username: USERNAME,
      profile_url: PROFILE_URL,
      films: films,
      last_updated: new Date().toISOString(),
      total_films: films.length
    };

    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(`✓ Saved ${films.length} films to ${outputFile}`);
    console.log(`Film titles: ${films.map(f => f.title).join(', ')}`);

  } catch (error) {
    console.error('Error fetching Letterboxd data:', error.message);
    
    // Create a fallback empty file so the action doesn't fail completely
    const dataDir = path.join(__dirname, '..', '_data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputFile = path.join(dataDir, 'letterboxd.json');
    const fallbackData = {
      username: USERNAME,
      profile_url: PROFILE_URL,
      films: [],
      last_updated: new Date().toISOString(),
      error: error.message,
      total_films: 0
    };

    fs.writeFileSync(outputFile, JSON.stringify(fallbackData, null, 2));
    console.log('Created fallback letterboxd.json');
    process.exit(1);
  }
}

fetchLetterboxdData();
