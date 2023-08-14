import { BaseEntity } from '../../../../data/entity/BaseEntity/BaseEntity'

export interface IBaseRepositoryCreate<T extends BaseEntity> {
    createResource(resource: T) : Promise<T>
}

export interface IBaseRepositoryGetResources<T extends BaseEntity> {
    getResources(): Promise<T[]>
}

export interface IBaseRepositoryGetResourceByParams<T extends BaseEntity> {
    getRosourceByParams(params: {[keys: string]: any}[], include: string[]) : Promise<T>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IBaseRepositoryDeleteResourceByIdentifier<T extends BaseEntity> {
    deleteResource(id: number) : Promise<boolean>
}

export interface IBaseRepositoryUpdateByIdentifier<T extends BaseEntity> {
    updateResourceByIdentifier(id: number, resource: T) : Promise<boolean>
}