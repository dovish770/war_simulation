import AttackResponse from "../types/attackArsenal&location"
import IOrganization from "../types/organization"
import { IResource } from "../types/organization";
import { areaRules } from "../types/regions";

export const createResponseForAttack = (organization:IOrganization) => {
    const locations:string[] = areaRules[organization.name]
    
    const response:AttackResponse = {
        organization:organization,
        locations:locations
    }
    return response
}