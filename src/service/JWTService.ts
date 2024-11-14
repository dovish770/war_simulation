import jwt from 'jsonwebtoken';
import IUser from '../types/user';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the env file');
}


export const createToken = (user: IUser): string => {
    const token = jwt.sign(
        {
            userId: user._id,
            organization: user.organization,
            isDefence: user.isDefence
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}

export const detectToken = (token:string) => {
    const decoded: any = jwt.verify(token, JWT_SECRET);      
    return decoded;
}