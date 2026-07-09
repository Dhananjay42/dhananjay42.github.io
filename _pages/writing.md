---
layout: archive
title: "Writing"
permalink: /writing/
author_profile: true
---

{% include base_path %}

Here are a few things that I've written:

<div class="portfolio-grid">
  {% for item in site.data.writing %}
    <div class="grid__item">
      <article class="archive__item">
        <div class="archive__item-body">
          <h2 class="archive__item-title">
            <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
          </h2>
          <p class="page__meta">{{ item.outlet }}{% if item.date %} · {{ item.date | date: "%B %Y" }}{% endif %}</p>
          <p class="archive__item-excerpt">{{ item.description }}</p>
          <p class="page__meta"><a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">Read the full piece</a></p>
        </div>
      </article>
    </div>
  {% endfor %}
</div>

I also ramble about movies on letterboxd, although it is a lot more informal, and potentially full of grammatical/spelling mistakes. Feel free to check it out:

{% if site.author.letterboxd %}
<p>
  <a href="{% if site.author.letterboxd contains '://' %}{{ site.author.letterboxd }}{% else %}https://letterboxd.com/{{ site.author.letterboxd }}{% endif %}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Follow on Letterboxd</a>
</p>
{% endif %}

