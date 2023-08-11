import { BaseEntity } from "../../../../data/entity/BaseEntity/BaseEntity"

export interface IBaseRepositoryCreate<T extends BaseEntity> {
    createResource(resource: T) : Promise<T>
}

export interface IBaseRepositoryGetResources<T extends BaseEntity> {
    getResources(): Promise<T[]>
}

export interface IBaseRepositoryGetResourceByIdentifier<T extends BaseEntity> {
    getRosourceByIdentifier(id: number) : Promise<T>
}

export interface IBaseRepositoryDeleteResourceByIdentifier<T extends BaseEntity> {
    deleteResource(id: number) : Promise<boolean>
}

export interface IBaseRepositoryDeleteUpdateByIdentifier<T extends BaseEntity> {
    updateResourceByIdentifier(id: number) : Promise<boolean>
}