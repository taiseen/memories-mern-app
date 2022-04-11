31 March 2022 

# Moments App 

## Material UI + React + Redux + NodeJs + MongoDB (Atlas)

# [Frontend](https://memories-app-bd.netlify.app) | [Backend](https://memories-app-bd.herokuapp.com/) 

<br/>

```
client side ==> yarn + yarn start
server side ==> yarn + yarn start 
```
[Google](https://console.cloud.google.com/apis/credentials?project=local-riders-308310) for login.

# Client Site ==> Dependencies...

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


<br/>


# Server Site ==> Dependencies...

|No| Package Installs       | Use for                                       |
|--|------------------------|-----------------------------------------------|
|1 | yarn add `cors`        | enabling Cors origin request                  |
|2 | yarn add `dotenv`      | hide the confidential data from public        |
|3 | yarn add `express`     | creating routing for application              |
|4 | yarn add `nodemon`     | changing happen, server restart automatically |
|5 | yarn add `mongoose`    | creating DB modals for POST-ing data          |
|6 | yarn add `bcryptjs`    | hashing function for password security        |
|7 | yarn add `body-parser` | enabling POST request                         |
|8 | yarn add `jsonwebtoken`| share security information between two parties|


Background Resource : https://www.svgbackgrounds.com