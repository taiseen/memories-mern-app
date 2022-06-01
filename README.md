<img src="./client/src/assets/readme.png" style='width:180px' align="right" />

> 31 - Mar - 2022 

# Memories | MERN App

# [Frontend][client] | [Backend][server]

## Stack Use:
|No| Stack           | 
|--|-----------------|
| 1| Material UI     | 
| 2| React           | 
| 3| Redux           | 
| 4| Node-Js         |
| 5| Express-Js      |
| 6| MongoDB (Atlas) |

<br />

## Learning context by developing this application:
|No| Context learn by building this project...      | 
|--|------------------------------------------------|
| 1| Project Structure                              | 
| 2| Full CRUD operation                            | 
| 3| Searching operation                            | 
| 4| Google OAuth login                             |
| 5| MongoDB Connection                             |
| 6| Application can scalable                       |
| 7| Pagination for data view                       |
| 8| JSON Web Token for track user                  |
| 9| Comment section for login user                 |
|10| User can Like own + others post                |
|11| Role Base Access Control - `RBAC`              |
|12| Image file uploaded at imgbb.com               |
|13| use Redux for centrally data management        |


```
client side ==> yarn + yarn start
server side ==> yarn + yarn start 
```

# Client | side dependencies...

|No| Package Installs       | Usage of                                          |
|--|------------------------|---------------------------------------------------|
| 1| yarn add `axios`       | api CRUD request                                  |
| 2| yarn add `moment`      | working with time & date                          |
| 3| yarn add `redux`       | lib for managing & centralizing app state.        |
| 4| yarn add `react-redux` | allows React compo's to r/w data from Redux Store |
| 5| yarn add `redux-thunk` | middleware for Redux, async action using redux    |
| 6| yarn add `jwt-decode`  | helps decoding JWTs token | for session time out  |
| 7| yarn add `react-router-dom`    | for component navigation                  |
| 8| yarn add `react-file-base64`   | convert image to string || file to base64 |
| 9| yarn add `react-google-login`  | google login info support                 |
|10| yarn add `@material-ui/lab`    | those components, are not ready for core  |
|11| yarn add `@material-ui/core`   | designing UI of app                       |
|12| yarn add `@material-ui/icons`  | icon's for designing UI                   |
|13| yarn add `@material-ui/chip-input` | a chip input field using Material-UI  |

[SVG][bg-res] for background. <br/>
[Google OAuth][g-auth] for login.

<br/>


# Server | side dependencies...

|No| Package Installs       | Use for                                       |
|--|------------------------|-----------------------------------------------|
|1 | yarn add `cors`        | enabling Cors origin request                  |
|2 | yarn add `dotenv`      | hide the confidential data from public        |
|3 | yarn add `express`     | creating routing for application              |
|4 | yarn add `nodemon`     | changing happen, server restart automatically |
|5 | yarn add `mongoose`    | creating DB schema/modal for POST-ing data    |
|6 | yarn add `bcryptjs`    | hashing function for password security        |
|7 | yarn add `body-parser` | enabling POST request                         |
|8 | yarn add `jsonwebtoken`| share security information between two parties|





[client]: https://memories-app-bd.netlify.app
[server]: https://memories-app-bd.herokuapp.com

[bg-res]: https://www.svgbackgrounds.com
[g-auth]: https://console.cloud.google.com/apis/credentials?project=local-riders-308310