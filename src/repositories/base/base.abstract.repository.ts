import { Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { BaseInterfaceRepository } from "./base.interface.repository";

@Injectable()
export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {

    constructor(private entity: Repository<T>) { }

    public async updateOne(data: T | any): Promise<T> {
        return await this.entity.save(data)
    }

    public async create(data: T | any): Promise<T> {
        return await this.entity.save(data)
    }

    public async findOneById(id: number): Promise<T> {
        return await this.entity.findOne(id)
    }

    public async findByCondition(filterCondition: any): Promise<T> {
        return await this.entity.findOne({ where: filterCondition })
    }

    public async findAll(): Promise<T[]> {
        return await this.entity.find()
    }

    public async remove(id: string): Promise<DeleteResult> {
        return await this.entity.delete(id)
    }

    public async findWithRelations(relations: any): Promise<T[]> {
        return await this.entity.find(relations)
    }
}