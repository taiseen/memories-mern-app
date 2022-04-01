31 March 2022 

# Server Site

|No| Package Installs       | Use for                                       |
|--|------------------------|-----------------------------------------------|
|1 | yarn add `body-parser` | enabling POST request                         |
|2 | yarn add `cors`        | enabling Cors origin request                  |
|3 | yarn add `express`     | creating routing for application              |
|4 | yarn add `mongoose`    | creating DB modals for POST-ing data          |
|5 | yarn add `nodemon`     | changing happen, server restart automatically |
|6 | yarn add `dotenv`      | hide the confidential data from public        |


# Heroku

```
heroku login

heroku git:clone -a moments-app-bd
cd moments-app-bd

git add .
git commit -am "make it better"
git push heroku master
```