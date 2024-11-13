export interface IResource {
    name: string;
    amount: number;
    _id?:string
}

interface IOrganization {
    name: string;
    resources: IResource[];
    budget: number;
    _id?:string
}

export default IOrganization