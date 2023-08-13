import { BaseEntity } from  '../../entity/BaseEntity/BaseEntity'
import { AppDataSource } from  '../../../data-source'
import { InsertResult, Repository } from 'typeorm'
import { ERROR_INSERTING_DATA, RESOURCE_NOT_FOUND } from '../../../dictionaryConst/const'
import { ApplicationError } from '../../../utilities/application-error'

export class GenericDataSource<T extends BaseEntity> {
    
    readonly repository: Repository<T>
    readonly nameClass: string
    
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
        return await this.repository.createQueryBuilder(this.nameClass)
                                    .getMany()
    }

    async getByParams(searchParams: {[key:string]: any}[], include: string[]) : Promise<T> {
        let searchstring = ''
        searchParams.forEach((param, index )=> {
            let keyname = Object.keys(param)[0]
            if (index === 0) {
                searchstring = searchstring + `${this.nameClass}.${keyname} = '${param[keyname]}'`
            } else {
                searchstring = searchstring + ` and where ${this.nameClass}.${keyname} = '${param.keyname}'`
            }
        })
        let query = this.repository.createQueryBuilder(this.nameClass)
                                   .where(searchstring)
        include.forEach(cad => {
            query.leftJoinAndSelect(`${this.nameClass}.${cad}`, cad)
        })
        let result = await query.getOne();
        if (result) {
            return result
        } else {
            throw new ApplicationError(RESOURCE_NOT_FOUND, 404)
        }
    }

    async update(id: number, origin: T) : Promise<boolean> {
        let result = await this.repository.createQueryBuilder()
                             .update(this.nameClass)
                             .set(origin)
                             .where(`${this.nameClass}.id = :id`, {id})
                             .execute()
        return result.affected === 0 ? false : true
    }

    async deleteById(id: number) : Promise<boolean> {
        await this.repository.createQueryBuilder(this.nameClass)
                             .where(`${this.nameClass}.id = :id`, {id})
                             .softDelete()
                             .execute() 
        return true
    }
}