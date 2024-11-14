import UserModel from "../../models/user/UserSchema";
import missiles from '../../assets/missiles.json'
import { Request, Response } from 'express';
import {detectToken} from "../../service/JWTService"
import {createResponseForAttack} from '../../service/missilesService'

export const getMissiles = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];       
        if (!token) {
            res.status(401).json({ message: "Token missing", success: false });
            return;
        }
        const decodedToken = detectToken(token);         
        const user = await UserModel.findById(decodedToken.userId).select('organization.resources').select('organization.name');
        
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        
        const response = user.isDefence? user.organization : createResponseForAttack(user.organization)        
        res.status(200).json({ data: response, success: true });

    } catch (error:any) {
        res.status(400).json({ message: error.message, success: false });
    }
};

export const getOneMissiles = async (req: Request, res: Response) => {
    const missileName = req.params.missileName;
    try {
        const missile = missiles.find(mis => mis.name === missileName);
        
        if (!missile) {
            res.status(404).json({ message: "missile not found" });
            return;
        }
    
        res.status(200).json({ data: missile, success: true });

    } catch (error:any) {
        res.status(400).json({ message: error.message, success: false });
    }
};

