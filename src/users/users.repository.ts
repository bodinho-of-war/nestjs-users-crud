import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";
import { genSalt, hash } from 'bcrypt'
import * as crypto from 'crypto'
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password, profiles } = createUserDto

        const user = this.create()
        user.name = name
        user.email = email
        user.profiles = profiles
        user.status = true
        user.confirmationToken = crypto.randomBytes(32).toString('hex')
        user.salt = await genSalt()
        user.password = await this.hashPassword(password, user.salt)
        try {
            await user.save()
            delete user.password
            delete user.salt
            return user
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

    private async hashPassword(password: string, salt: string): Promise<string> {
        return hash(password, salt);
    }
}