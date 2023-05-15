
export interface IEnvironment {
    id?: string;
    name: string;
    description: string;
}

export interface IGoal {
    id?: string;
    name: string;
    description: string;
    environment: IEnvironment?,
    configuration: IConfiguration?
}

export interface IConfigurationTemplate {
    id: number;
    name: string;
    description: string,
    properties: IProperty[] | [IProperty] 
}

export interface IProperty {
    name: string;
    value: string,
    description: string
}

export interface IPropertyInstance {
    configuration_template: number,
    inter: string,
    name: string;
    value: string,
}

export interface IConfiguration {
    id: string;
    name: string;
    description: string,
    properties: [IPropertyInstance],
    configurationTemplate: number[],
    environment: IEnvironment
}

export interface ITag {
    id: number;
    title: string;
}