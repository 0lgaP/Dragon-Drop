# Dragon Drop 
This project was created by [Olga]https://github.com/0lgaP, [Sarah](https://github.com/sawrrawr) and [Josh](https://github.com/JoshuaOLoduca). For more information please check out our githubs :)
<br>
This App is designed for game masters and story tellers. This application serves as an interactive tool for worldbuilding. This app utilises the power of react-dnd library to allow the user to drag and drop various story components inorder to accomodate branching and complex storylines. This is a labour of love, if you are inetrested in contributing to this project, please get in touch!
<br>
Breakdown of contributions: <br>
Josh - Maps!<br>
Sarah - NPCs, Campaigns history<br>
Olga - Story, selected art assets, player characters and logo<br>

# Getting Started with Dragon Drop
1. Clone the repository 
2. Run `npm install` in the `\server` and `\client` folders
3. In the `\server` create `.env` based on our `.env.example`
4. On `\server` run `npm run db:reset` this will seed the database with our pre-made assets
5. Finally: <br>
On `\server` run `npm run dev` <br>
On `\client' run `npm start`
6. Enjoy the app in the browser, when you close the app, your information will be saved, but if ever you need to start over, please run command described in 4 again.

# Dependencies
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