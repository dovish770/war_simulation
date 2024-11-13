import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserModel from '../../models/user/UserSchema';
import area_dict from '../../types/regions';
import IOrganization from '../../types/organization';
import organizations from '../../assets/organizations.json'

export const signIn = async (req: Request, res: Response) => {
    try {
        const { username, password, organization, region } = req.body;

        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: "This username is already in use!" });
            return;
        }

        if (!username || !password || !organization) {
            res.status(400).json({ message: "Required fields are missing" });
            return;
        }

        let isDefence;
        let updatedOrganization:string;

        if (organization === 'IDF') {
            if (!region) {
                res.status(400).json({ message: "Required valid region" });
                return;
            }   
            isDefence = true
        }

        updatedOrganization = region ? area_dict[region.toLowerCase()] : organization;
        const fullOrganization:IOrganization|undefined = organizations.find(org => org.name === updatedOrganization);

        if (!fullOrganization){
            res.status(404).json({ message: "organization not found" });
                return;
        }

        const hashedPassword = await bcrypt.hash(password, 9);

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            organization: fullOrganization,
            isDefence: isDefence
        });
        
        const addedUser = await UserModel.create(newUser);

        res.status(201).json({ data: addedUser, success: true });

    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
};

