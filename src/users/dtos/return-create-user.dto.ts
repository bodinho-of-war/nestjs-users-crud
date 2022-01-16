export class ReturnCreateUserDto {
    id: string
    name: string
    email: string
    created: Date
    modified: Date
    last_login: Date
    profiles: object[]
    token: string
}