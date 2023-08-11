import { BaseEntity } from  '../../entity/BaseEntity/BaseEntity'
import { AppDataSource } from  '../../../data-source'
import { InsertResult, Repository } from 'typeorm'
import { ERROR_INSERTING_DATA } from '../../../dictionaryConst/const'

export class GenericDataSource<T extends BaseEntity> {
    
    private readonly repository: Repository<T>
    private readonly nameClass: string
    
    /**
     *
     */
    constructor(classCtor: {new()}) {
        this.repository = AppDataSource.getRepository(classCtor.name)
        this.nameClass = classCtor.name
    }

    async create(resource: T) : Promise<T> {
        let inserResult: InsertResult
        inserResult = await this.repository.createQueryBuilder()
                       .insert()
                       .into(this.nameClass)
                       .values([resource])
                       .execute()               
        return {...resource, id: inserResult.identifiers[0].id}
    }

    async list() : Promise<T[]> {
        return []
    }

    async getById(id: number) : Promise<T> {
        return 'AS' as any
    }

    async update(id: number, origin: T) : Promise<boolean> {
        return true
    }

    async deleteById(id: number) : Promise<boolean> {
        return true
    }
}