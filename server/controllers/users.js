import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserInfo from '../models/userInfo.js';


export const signIn = async (req, res) => {

    const { email, password } = req.body;

    try {

        // if user has - previcely no account...
        const existingUser = await UserInfo.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist..." });
        }

        // if user password does not right...
        const isPass = await bcrypt.compare(password, existingUser.password);
        if (!isPass) return res.status(400).json({ message: "Invalid credentials" });

        // backend generated token for user, to tracking...
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json(error);
    }

}

export const signUp = async (req, res) => {

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {

        // 1st find that ==> user is already present in our DB
        const existingUser = await UserInfo.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exist" });

        // check the password and confirmPassword
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        // encripted this password for security
        const hashPassword = await bcrypt.hash(password, 12);


        const result = await UserInfo.create(
            { email, password: hashPassword, name: `${firstName} ${lastName}` }
        );

        // create a token for user, to tracking...
        const token = jwt.sign(
            { email: result.email, id: result._id },
            "test",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result, token });


    } catch (error) {
        res.status(500).json(error);
    }

}

