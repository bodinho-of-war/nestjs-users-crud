import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../components/user/entity/user.entity";
import { UserRepositoryInterface } from "../components/user/interface/user.repository.interface";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "./base/base.abstract.repository";

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> implements UserRepositoryInterface {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {
        super(usersRepository)
    }

    async create(user: User) {
        try {
            const createdUser = await super.create(user)
            delete createdUser.password
            delete createdUser.salt
            return createdUser
        } catch (error) {
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