import { CredentialsDto } from "src/components/auth/dto/credentials.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserEntity } from "../entity/user.entity";

export interface UserServiceInterface {
    create(userDto: CreateUserDto): Promise<UserEntity>
    findAll(): Promise<UserEntity[]>
    checkCredentials(credentialsDto: CredentialsDto): Promise<UserEntity>
    registerLogin(user: UserEntity): Promise<UserEntity>
}