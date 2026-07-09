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