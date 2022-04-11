import jwt from "jsonwebtoken";

// want to edit post 
// want to like post 
// click edit button ==> auth middleware (next) ==> edit controllers
// click like button ==> auth middleware (next) ==> like controllers

// auth middleware ==> conform or denied the user activity request.

// so when user perform some action, that not immediately server serve...
// 1st auth middleware check by its if() condition code block{}
//      that this is specific valid user or not!!!
//      if valid user then ==> go to ==> next ==> controller...

const auth = async (req, res, next) => {

    try {

        // get token form FrontEnd, for checking user authentication
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        // our custom auth system...
        if (token && isCustomAuth) {
            // its give us (userName, id...) about each specific token
            decodedData = jwt.verify(token, process.env.AUTH_KEY);

            // our custom made req-Object property... (userId)
            // for track id by whole backend application
            req.userId = decodedData?.id;
        } else {
            // google auth system... 🟨 in this case we dont need the secret key... 🔑
            decodedData = jwt.decode(token);

            // our custom made req-Object property... (userId)
            // for track id by whole backend application
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;