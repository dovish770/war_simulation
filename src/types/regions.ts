const area_dict: { [key: string]: string } = {
    "south": "IDF - South",
    "center": "IDF - Center",
    "north": "IDF - North",
    "west bank": "IDF - West Bank"
};

export const areaRules: {[key:string]: [string,string]} = {
    "Hezbollah": ["north", "center"],
    "Hamas": ["south", "center"],
    "IRGC": ["north", "west bank"],
    "Houthis": ["west bank", "south"]
}

export default area_dict