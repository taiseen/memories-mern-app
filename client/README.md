31 March 2022 

# Client Site ==> Dependencies...

|No| Package Installs       | Usage of                                          |
|--|------------------------|---------------------------------------------------|
| 1| yarn add `axios`       | api CRUD request                                  |
| 2| yarn add `moment`      | working with time & date                          |
| 3| yarn add `redux`       | lib for managing & centralizing app state.        |
| 4| yarn add `react-redux` | allows React compo's to read data from Redux Store|
| 5| yarn add `redux-thunk` | middleware for Redux, async action using redux    |
| 6| yarn add `react-router-dom`    | for component navigation                  |
| 7| yarn add `@material-ui/core`   | designing UI of app                       |
| 8| yarn add `@material-ui/icons`  | icon's for designing UI                   |
| 9| yarn add `react-google-login`  | google login info support                 |
|10| yarn add `jwt-decode`          | helps decoding JWTs token                 |
|11| npm install `react-file-base64`| convert images into string                |


Learning by inspired from[.](https://youtu.be/ngc9gnGgUdA)



Hello there...

The requirement is deleting images by Axios delete function passing the (delete_url) as argument of that image which uploaded by using the user API key. (It's only just for learning purposes)  

For learning purpose I'm going to try like this :

export const imageDelete = delete_url => axios.delete(delete_url);

It shows an error...  so is there any way to delete that uploaded img, with the help of Axios delete API call?

Thank You.