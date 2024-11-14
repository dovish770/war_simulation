import IOrganization from "./organization"

interface AttackResponse{
    locations: string[],
    organization: IOrganization
}

export default AttackResponse