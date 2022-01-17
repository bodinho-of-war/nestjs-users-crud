import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"
import { ProfileEntity } from "src/components/profile/entity/profile.entity"

export class CreateUserDto {
    @IsNotEmpty({
        message: 'Informe o nome do usuário'
    })
    @MaxLength(200, {
        message: 'O nome deve conter menos de 200 caracteres'
    })
    name: string

    @IsNotEmpty({
        message: 'Informe um endereço de email'
    })
    @IsEmail({}, {
        message: 'Informe um endereço de email válido'
    })
    @MaxLength(200, {
        message: 'O endereço de email deve conter menos de 200 caracteres'
    })
    email: string

    @IsNotEmpty({
        message: 'Informe uma senha',
    })
    @MinLength(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    })
    password: string

    @IsNotEmpty({
        message: 'Informe um perfil'
    })
    profiles: ProfileEntity[]
}