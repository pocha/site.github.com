---
layout: page
title: Help A Biker
description: >
  Listing all the resources that can help a traveling motorbiker in a foriegn land during emergency
last_modified_at: 2018-08-03
no_link_title: false
no_excerpt: false
hide_image: false
cover: true
---

During my [solo London to India motorcycle trip](/solo-world-trip), I got a lot of help from various motorbikers. Usually, the modus operandi went like this - some motorbiker whom I had found from [Bunk A Biker](https://www.zeemaps.com/bunk-a-biker_world), knew local motorcycle club & asked for help in the group on my behalf & voila, my problem used to be solved :). While on the road, I figured that finding these groups by myself was hard. So I decided to create a listing of such resources.

## Resource List

<div data-tags-editor data-tags-placeholder="filter resources by tags. Eg - biker-club or stay or norway" data-tags-list="">
</div>
<p style="font-size: x-small; width:100%; text-align:center"> <span>Multiple tags supported. Press enter after typing each tag name for filtering to take effect </span></p>

<ul markdown="1">
{% for entry in site.data.help_a_biker.resources %}
    <li data-tags="{{ entry.tags }}">
        <h4>{{ entry.name }}</h4>

        <p>{{ entry.content }}</p>

        {% if entry.links.first %}
            {% for link in entry.links %}
                {% if link.type and link.type == "whatsapp" %}
                    <a href="https://wa.me/{{ link.content }}" target="_blank">{{ link.content }} (click to open in whatsapp)</a>
                {% else %}
                    <a href="{{ link }}">{{ link }}</a>
                {% endif %}
                <br/>
            {% endfor %}
        {% else %}
            <a href="{{ entry.links }}">{{ entry.links }}</a><br/>
        {% endif %}

        {% assign tags = entry.tags | split: "," %}
        <div class="tg-wrapper">
            {% for tag in tags %} <span class="tg-tag"> {{ tag }}</span>{% endfor %}
        </div>
    </li>

{% endfor %}

</ul>

<script src="./tags_editor.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<style>

    [data-toggle='on'] {
        display:block;
    }

    [data-toggle='off'] {
        display:none;
    }

</style>
