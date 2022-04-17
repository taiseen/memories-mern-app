import jwt from "jsonwebtoken";

// want to edit post 
// want to like post 
// click edit button ==> auth middleware (next) ==> then goto edit() controllers
// click like button ==> auth middleware (next) ==> then goto like() controllers

// auth middleware ==> conform or denied the user activity request.

// so when user perform some action, that not immediately server serve...
// 1st auth middleware check by its if() condition code block{}
//      that this is specific valid user or not!!!
//      if valid user then ==> go to ==> next ==> controller...

// where we use this auth middleware? ==> inside the router()

const auth = async (req, res, next) => {

    try {

        // is user, who he is? who is clam to be...
        // we can do that by the help of jwt - JSON Web Token...
        // get token form FrontEnd, for checking user authentication...
        const token = req.headers.authorization.split(' ')[1];

        // 2 kind of token ==> 1) google auth, 2) our custom token
        const isCustomAuth = token.length < 500;

        // get the token data & stor into this variable...
        let decodedData;

        // our custom auth system...
        if (token && isCustomAuth) {
            // its give us (userName, id...) about each specific token
            decodedData = jwt.verify(token, process.env.AUTH_KEY);

            // our custom made req-Object property... (userId)
            // for track id by whole backend application
            // this (req.userId) is very important...
            req.userId = decodedData?.id;
        } else {
            // google auth system... 🟨 in this case we don't need the secret key... 🔑
            decodedData = jwt.decode(token);

            // our custom made req-Object property... (userId)
            // for track id by whole backend application
            // this (req.userId) is very important...
            req.userId = decodedData?.sub;
        }

        // do these checking & go to next step...
        // pass the action at the second level | function as controller...
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;