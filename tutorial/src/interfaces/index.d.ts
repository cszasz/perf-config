
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
    id?: string;
    name: string;
    description: string,
    properties: IProperty[] | [IProperty] 
}

export interface IProperty {
    name: string;
    value: string,
}

export interface IPropertyInstance {
    interface: string,
    name: string;
    value: string,
}

export interface IConfiguration {
    id: string;
    name: string;
    description: string,
    properties: [IPropertyInstance],
    configurationTemplate: IConfigurationTemplate,
    environment: IEnvironment
}

