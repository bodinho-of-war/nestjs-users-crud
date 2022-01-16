import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty({
        message: 'Informe o nome do perfil'
    })
    @MaxLength(200, {
        message: 'O nome deve conter menos de 200 caracteres'
    })
    name: string
}