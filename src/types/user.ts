    import IOrganization from "./organization";

    interface IUser extends Document {
        _id?:string
        username: string;
        password: string;
        organization: IOrganization;
        isDefence:boolean
    }

    export default IUser