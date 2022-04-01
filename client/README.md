# Dragon Drop

## Table Of Contents

- [Project Overview](#project-overview)
  - [Overview](#what-it-is)
  - [Technical Details](#technical-details)
  - [Features](#features)
  - [History](#history)
- [Pictures](#pictures)
  - [Main Page](#main-page)
  - [Public Maps](#public-maps)
  - [Map Page](#map-page)
  - [Add Place To Map Popup](#add-place-to-map-popup)
  - [Edit Place On Map Popup](#edit-place-on-map-popup)
  - [Maps User Can Contribute To](#maps-user-is-contributer-on)
  - [Users Favourites](#users-favourites)
  - [Users Created Maps](#users-created-maps)
  - [Add Map Popup](#add-map-popup)
  - [Edit Map Popup](#edit-map-popup)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)

## Project Overview

### What it is

This project was created by [Olga]https://github.com/0lgaP, [Sarah](https://github.com/sawrrawr) and [Josh](https://github.com/JoshuaOLoduca). For more information please check out our githubs :)
<br>
This App is designed for game masters and story tellers. This application serves as an interactive tool for worldbuilding. This app utilises the power of react-dnd library to allow the user to drag and drop various story components inorder to accomodate branching and complex storylines. This is a labour of love, if you are inetrested in contributing to this project, please get in touch!
<br>
Breakdown of contributions: <br>
Josh - Maps!<br>
Sarah - NPCs, Campaigns history<br>
Olga - Story, selected art assets, player characters and logo<br>

### Technical details

- Free flowing story management system that integrates Drag and Drop
- Multi Dashboard system for DnD story telling intricacies
- A SQL based data management system for easy campaign wide updates
- Unique Use of react-dnd for a gridless map system

## Features

- Story Editor/Maker
    - Add Story Cards
    - Edit Story Cards
        - Link NPCs to Cards
- NPC Manager
  - Add NPCs
  - Update NPCs
- Party(Players) Rolodex style dashboard
  - Add registered members
  - Add their player sheet for future reference
  - Add/Update Player character Icon
- Easy to use Map system with drag and move
  - Asset Management
    - Add Assets on the Fly
    - Remove Assets On the Fly
    - Layer Existing Assets
  - Story Interaction
    - Mark story cards as done
    - Toggle NPCs linked to story cards status

### History

> Wiki maps is a midterm project done for [Lighthouse Labs full time web dev course](https://www.lighthouselabs.ca/en/web-development-bootcamp?gclid=CjwKCAiAx8KQBhAGEiwAD3EiP9K5uhrRFugeZydQWBfMfKlzszrgM5eBmYdxEhY6g8nt6hOxNGgqkxoCkQEQAvD_BwE)\
> We had 10 topics to choose from.
> Each one had their own requirements

## Pictures

---

### Main Page

> ![Main Page](/ReadMeData/Main%20Page.png)

---

### Public Maps

> ![Public Maps](/ReadMeData/Public%20Maps.png)

---

### Map Page

> ![Map Page](/ReadMeData/Map.png)

---

### Add Place to Map Popup

> ![Add Place To Map Popup](/ReadMeData/Add%20Place.png)

---

### Edit Place on Map Popup

> ![Edit Place On Map Popup](/ReadMeData/Edit%20Place_fixed.png)

---

### Maps User is Contributer on

> ![Maps User Can Contribute To](/ReadMeData/Maps%20user%20can%20Collaborate%20On.png)

---

### Users Favourites

> ![Users Favourites](/ReadMeData/Users%20Favourites.png)

---

### Users Created Maps

> ![Users Created Maps](/ReadMeData/Users%20Maps.png)

---

### Add Map Popup

> ![Add Map Popup](/ReadMeData/Users%20Maps%20Add.png)

---

### Edit Map Popup

> ![Edit Map Popup](/ReadMeData/Users%20Maps%20Edit.png)

---

## Getting Started

1. Clone the repository
2. Run `npm install` in the `\server` and `\client` folders
3. In the `\server` create `.env` based on our `.env.example`
4. On `\server` run `npm run db:reset` this will seed the database with our pre-made assets
5. Finally: <br>
   On `\server` run `npm run dev` <br>
   On `\client' run `npm start`
6. Enjoy the app in the browser, when you close the app, your information will be saved, but if ever you need to start over, please run command described in 4 again.

## Dependencies

```sh
    "@headlessui/react": "^1.5.0",
    "@heroicons/react": "^1.0.6",
    "axios": "^0.26.1",
    "immutability-helper": "^3.1.1",
    "react": "^17.0.2",
    "react-dnd": "^15.1.1",
    "react-dnd-html5-backend": "^15.1.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.0",
    "react-scripts": "5.0.0",
    "socket.io-client": "^4.4.1",
    "web-vitals": "^2.1.4"
    "cookie-parser": "~1.4.4",
    "cookie-session": "^2.0.0",
    "debug": "~2.6.9",
    "dotenv": "^16.0.0",
    "express": "~4.16.1",
    "morgan": "~1.9.1",
    "pg": "^8.7.3",
    "socket.io": "^4.4.1",
    "uuid": "^8.3.2"
```
