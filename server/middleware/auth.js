import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        // our custom auth system...
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            // our custom made property for track id by whole backend application
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            // our custom made property for track id by whole backend application
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;