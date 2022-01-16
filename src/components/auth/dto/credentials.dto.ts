import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CredentialsDto {
    @IsNotEmpty({
        message: 'Informe um endereço de email'
    })
    @IsEmail({}, {
        message: 'Informe um endereço de email válido'
    })
    email: string;

    @IsNotEmpty({
        message: 'Informe uma senha',
    })
    @MinLength(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    })
    password: string;
}