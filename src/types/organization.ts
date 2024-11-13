interface IResource {
    name: string;
    amount: number;
}

interface IOrganization {
    name: string;
    resources: IResource[];
    budget: number;
}

export default IOrganization