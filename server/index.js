import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';


const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


const PORT = process.env.PORT || 5000;

// MongoDB DataBase Connections
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT)))
    .catch(error => console.log('Error Happen ===> ', error));

// mongoose.set('useFindAndModify', false);


// http://localhost:5000/posts
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
// express middleware for using routes File...



// Default info show at root page...
const welcomeMessage = (req, res) => {

    res.send(`<h1 style="
        color: tomato; 
        text-align: center; 
        font-family: verdana;
        ">

        BackEnd || Hello... From Memories App... 😎👋

    </h1>`);
}
app.get('/', welcomeMessage);


