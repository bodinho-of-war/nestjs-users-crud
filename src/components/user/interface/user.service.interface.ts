import { CredentialsDto } from "src/components/auth/dto/credentials.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entity/user.entity";

export interface UserServiceInterface {
    create(userDto: CreateUserDto): Promise<User>
    findAll(): Promise<User[]>
    checkCredentials(credentialsDto: CredentialsDto): Promise<User>
}