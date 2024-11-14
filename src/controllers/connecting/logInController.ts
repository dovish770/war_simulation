import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../models/user/UserSchema';
import { createToken } from '../../service/JWTService';


export const login = async (req: Request, res: Response) => {
  
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required." });
        return;
    }

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;

        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: 'Invalid password' });
                return;
            } else {
                const token:string = createToken(user)
                res.status(200).json({ message: "Logged in successfully", token:token, user:user });
                return;
            }
        }

    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
};
