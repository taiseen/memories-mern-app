import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserInfo from '../models/userInfo.js';

// bcrypt ==> for hashing the user password, 
// for that no one can understand user pass by see it...

// jwt ==> safe way to store the user in a browser for some period of time... 1h, 2h... 1W...
// jwt ==> by creating token for user, track user by this token id...


// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// Creating account fot - New User...
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅
export const signUp = async (req, res) => {

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {

        // 🟥 1st find that ==> user, is already present in our DB?
        const existingUser = await UserInfo.findOne({ email });

        // 🟥 if user already exist in our DB, then send sms ==> "User already exist"
        if (existingUser) return res.status(400).json({ message: "User already exist" });

        // 🟥 if the password and confirmPassword DOES ❗NOT match, with each other...
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        // 🟥 Encrypted the users password for security... that no 1 can see normally
        const hashPassword = await bcrypt.hash(password, 12);

        // 🟥 Creating a user & save into DataBase
        const result = await UserInfo.create(
            { name: `${firstName} ${lastName}`, email, password: hashPassword }
        );

        // 🟥 Create a token form "result" user Object
        // BackEnd create Token to send FrontEnd ==> for tracking 🧐 the user...
        // token we create in Backend by the help of [jwt] (.sign() method)
        // inside token, store information about current user
        const token = jwt.sign(
            { email: result.email, id: result._id },
            process.env.AUTH_KEY,
            { expiresIn: "1h" }
        );

        // sent this "token" to FrontEnd for track the user..
        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json(error);
    }
}



// 📌📌📌📌📌📌📌📌📌📌📌📌
// Login system for - Old User...
// 📌📌📌📌📌📌📌📌📌📌📌📌
export const signIn = async (req, res) => {

    const { email, password } = req.body;

    try {

        // 🟥 searching 🔎 this existing user in DataBase... (NOT Create New 1)
        const existingUser = await UserInfo.findOne({ email });

        // Return Value of the collection.findOne() ==> this returns a Promise...
        // that resolves to the 1st document in the collection that matches the query.
        // If no documents match the specified query, the promise resolves to null.

        // 🟥 if user ❗not find in DB... (existingUser == null) ==> ❎ falsy value 
        // then making it ✅ truthy value, for run this if() block of code... 
        // no user found === !existingUser 
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist..." });


        // 🟥 old users password matching check...
        const isPassCorrect = await bcrypt.compare(password, existingUser.password);
        // if pass is ❗not match...
        if (!isPassCorrect) return res.status(400).json({ message: "Password dont match" });


        // const userInfo = {
        //     id: existingUser._id,
        //     email: existingUser.email,
        // }
        // const token = jwt.sign(userInfo, process.env.AUTH_KEY, { expiresIn: "1h" });

        // 🟥 BackEnd create Token to send FrontEnd ==> for tracking 🧐 the user...
        // token we create in Backend by the help of [jwt] (.sign() method)
        // inside token, store information about current user
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.AUTH_KEY,
            { expiresIn: "1h" }
        );

        // sent this "token" to FrontEnd for track the user...
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json(error);
    }

}