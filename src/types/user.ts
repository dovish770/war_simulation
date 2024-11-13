interface IUser extends Document {
    username: string;
    password: string;
    organization: string;
    region?: string;
}

export default IUser