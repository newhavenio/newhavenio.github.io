---
layout: page
title: Mentors
---

Occaecat dolore ullamco qui magna proident pariatur laboris duis in. Et laboris consequat do minim laborum labore nisi reprehenderit in adipisicing. Cillum irure labore exercitation reprehenderit ea quis anim consectetur. Labore minim duis laborum minim do sunt.

Velit laboris tempor est laboris est Lorem dolore proident pariatur incididunt est in officia. Officia consequat reprehenderit velit fugiat ex aute exercitation proident laboris consectetur. Id deserunt sit deserunt mollit incididunt excepteur labore officia esse nisi occaecat cillum. Aliqua fugiat occaecat nisi aliquip consectetur sint culpa esse cupidatat nisi anim officia deserunt laborum. Commodo commodo sit fugiat ea do proident commodo magna enim in. Ipsum voluptate magna consequat occaecat commodo adipisicing dolor.

<ul>
  {% for mentor in site.data.mentors %}
    <li>
      Name: {{ mentor.name }}
      <ul>
        <li>Company: {{ mentor.company }}</li>
        <li>Focus: {{ mentor.focus }}</li>
        <li>Languages: {{ mentor.languages }}</li>
        <li>Description: {{ mentor.description }}</li>
      </ul>
    </li>
  {% endfor %}
</ul>
