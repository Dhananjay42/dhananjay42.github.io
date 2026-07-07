---
layout: single
title: "Letterboxd"
permalink: /letterboxd/
author_profile: true
---

I use Letterboxd to track and review all the films I watch. It's a great platform for organizing my viewing habits, discovering new recommendations, and connecting with other film enthusiasts.

## Why Letterboxd?

- **Comprehensive tracking** of films watched, rated, and reviewed
- **Social discovery** - see what friends are watching
- **Lists and rankings** - organize films by genre, year, or custom themes
- **Detailed reviews** - write thoughts on films I've watched
- **Statistics** - visualize viewing patterns over time

---

## Recent Watches

{% if site.data.letterboxd and site.data.letterboxd.films and site.data.letterboxd.films.size > 0 %}

<div class="letterboxd-films">
  {% for film in site.data.letterboxd.films %}
    <div class="letterboxd-film">
      <a href="{{ film.url }}" target="_blank" rel="noopener noreferrer">
        {% if film.poster %}
          <img src="{{ film.poster }}" alt="{{ film.title }}" loading="lazy">
        {% else %}
          <div class="letterboxd-film-placeholder">
            <span>{{ film.title }}</span>
          </div>
        {% endif %}
      </a>
      <div class="letterboxd-film-title">
        <a href="{{ film.url }}" target="_blank" rel="noopener noreferrer">{{ film.title }}</a>
      </div>
    </div>
  {% endfor %}
</div>

<p style="font-size: 0.85em; color: #666; margin-top: 1rem;">
  Last updated: {{ site.data.letterboxd.last_updated | date: "%B %d, %Y at %H:%M UTC" }}
</p>

{% else %}

<p>Loading recent watches... (or check my <a href="https://letterboxd.com/{{ site.data.letterboxd.username | default: 'clroymustang' }}/" target="_blank" rel="noopener noreferrer">full profile</a>)</p>

{% endif %}

---

## Check Out My Profile

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://letterboxd.com/clroymustang/" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 1.2rem 2.5rem; background: #3d5afe; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 1.1em; transition: background 0.2s ease;">
    Visit My Full Profile →
  </a>
</div>

<style>
  .letterboxd-films {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
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
    object-fit: cover;
  }

  .letterboxd-film img:hover {
    transform: scale(1.05);
  }

  .letterboxd-film-placeholder {
    width: 100%;
    height: 150px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    text-align: center;
    padding: 1rem;
    font-size: 0.9em;
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
    color: #0366d6;
  }
</style>
