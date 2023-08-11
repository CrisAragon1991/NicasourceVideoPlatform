import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { BaseEntity as BaseEntityTypeOrm } from 'typeorm'

export class BaseEntity extends BaseEntityTypeOrm {
    /**
     *
     */
    constructor() {
        super();
    }

    @CreateDateColumn()
    createdAt: string
    @UpdateDateColumn()
    updatedAt: string
    @DeleteDateColumn()
    deleteDate: string
}