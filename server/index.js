import mongoDB from './connection/mongoDB.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const app = express();

app.use(express.static('public'));
app.use('/fav.ico', express.static('public/fav.ico'));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());



// http://localhost:5000/posts
// http://localhost:5000/users
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
// express middleware for using routes File...



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server Start on port :', PORT, '🟩');
    mongoDB();
});



// Default welcome message at root/index page...
const welcomeMessage = (req, res) => {
    res.send(` 
    <head>
        <title>Server On! ✅</title> 
        <link rel="icon" href="/fav.ico">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

            body {
                text-align       : center;
                background-color : #eee;
            }

            h1{
                width         : max-content;
                margin        : 40px auto 00px; 
                padding       : 20px 30px 24px;
                font-family   : 'Nunito', sans-serif;
                font-size     : 42px;
                color         : #111;
                border        : 1px solid black;
                border-radius : 3px;
            }

            img{
                width  : 750px;
                height : 750px;
            }
        </style>
    </head>

    <body>
        <h1> Memories App - Server is running... ✅ </h1>
        <img src='server.png'/>
    </body>
    `);
}
app.get('/', welcomeMessage);