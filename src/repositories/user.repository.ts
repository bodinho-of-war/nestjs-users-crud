import { ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../components/user/entity/user.entity";
import { UserRepositoryInterface } from "../components/user/interface/user.repository.interface";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "./base/base.abstract.repository";

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserEntity> implements UserRepositoryInterface {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {
        super(usersRepository)
    }

    async create(user: UserEntity) {
        try {
            const createdUser = await super.create(user)
            return createdUser
        } catch (error) {
            Logger.error(error)
            if (error.code.toString() === '23505') {
                throw new ConflictException('E-mail já existente');
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados',
                );
            }
        }
    }

}