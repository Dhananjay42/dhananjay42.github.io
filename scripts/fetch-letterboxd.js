const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const USERNAME = 'clroymustang';
const PROFILE_URL = `https://letterboxd.com/${USERNAME}/`;

async function fetchLetterboxdData() {
  try {
    console.log(`Fetching Letterboxd data for ${USERNAME}...`);

    // Fetch the profile page
    const response = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const films = [];

    // Method 1: Try to find film links in poster containers
    $('div.poster').each((index, element) => {
      if (films.length >= 20) return;

      const $poster = $(element);
      const link = $poster.find('a').attr('href');
      const img = $poster.find('img');
      const title = img.attr('alt') || img.attr('title');
      const src = img.attr('src');

      if (link && title) {
        films.push({
          title: title.trim(),
          url: `https://letterboxd.com${link}`,
          poster: src || null
        });
      }
    });

    // Method 2: If method 1 didn't work, try film-entry links
    if (films.length === 0) {
      $('a.film-poster-link').each((index, element) => {
        if (films.length >= 20) return;

        const href = $(element).attr('href');
        const img = $(element).find('img');
        const title = img.attr('alt');
        const src = img.attr('src');

        if (href && title) {
          films.push({
            title: title.trim(),
            url: `https://letterboxd.com${href}`,
            poster: src || null
          });
        }
      });
    }

    console.log(`Found ${films.length} films`);

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
