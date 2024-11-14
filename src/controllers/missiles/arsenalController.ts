import { Request, Response } from 'express';
import UserModel from '../../models/user/UserSchema';
import { IResource } from '../../types/organization';
import { detectToken } from "../../service/JWTService";

export const decreaseResourceAmount = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const missileName = req.body.missileName;

        if (!token) {
            return res.status(401).json({ message: "Token missing", success: false });
        }

        if (!missileName) {
            return res.status(400).json({ message: "Missile name is required", success: false });
        }

        const decodedToken = detectToken(token);
        const user = await UserModel.findById(decodedToken.userId)
            .select('organization.resources name');

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const missileResource = user.organization.resources.find((resource: IResource) => resource.name === missileName);

        if (!missileResource) {
            return res.status(404).json({ message: "Missile not found in resources", success: false });
        }

        if (missileResource.amount > 0) {
            missileResource.amount -= 1;
            await user.save();

            return res.status(200).json({ data: user, success: true });
        } else {
            return res.status(404).json({ message: "Not enough missiles", success: false });
        }
    } catch (error: any) {
        return res.status(400).json({ message: error.message, success: false });
    }
};
