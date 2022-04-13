31 March 2022 

# Server Site ==> Dependencies...

|No| Package Installs       | Use for                                       |
|--|------------------------|-----------------------------------------------|
|1 | yarn add `body-parser` | enabling POST request                         |
|2 | yarn add `cors`        | enabling Cors origin request                  |
|3 | yarn add `express`     | creating routing for application              |
|4 | yarn add `mongoose`    | creating DB modals for POST-ing data          |
|5 | yarn add `nodemon`     | changing happen, server restart automatically |
|6 | yarn add `dotenv`      | hide the confidential data from public        |
|7 | yarn add `bcryptjs`    | hashing function for password security        |
|8 | yarn add `jsonwebtoken`| share security information between two parties|


<br />

# Heroku

```
heroku login

git init
git add .
git commit -am "all ==> OK"

1st time: heroku git:remote -a memories-app-bd
2nd time: heroku git:clone -a memories-app-bd 

git push heroku master
```

```
CONNECTION_URL = mongodb+srv://USERNAME:PASS@sandbox.6vljy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

AUTH_KEY = demoTestingKey
```