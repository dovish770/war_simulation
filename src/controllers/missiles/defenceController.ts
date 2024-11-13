import UserModel from "../../models/user/UserSchema";
import IMissile from "../../types/missiles";
import missiles from '../../assets/missiles.json'
import {IResource} from '../../types/organization'
import { Request, Response } from 'express';
import {detectId} from "../../service/JWTService"

export const getInterceptors = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            res.status(401).json({ message: "Token missing", success: false });
            return;
        }
        const userId = detectId(token); 
        const user = await UserModel.findById(userId).select('organization.resources');
        
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
                
        const currResources:IResource[] = user.organization.resources;

        res.status(200).json({ data: currResources, success: true });

    } catch (error:any) {
        res.status(400).json({ message: error.message, success: false });
    }
};

export const getOneInterceptor = async (req: Request, res: Response) => {
    const missileName = req.params.missileName;
    try {
        const missile = missiles.find(mis=>mis.name === missileName);
        
        if (!missile) {
            res.status(404).json({ message: "missile not found" });
            return;
        }
    
        res.status(200).json({ data: missile, success: true });

    } catch (error:any) {
        res.status(400).json({ message: error.message, success: false });
    }
};

