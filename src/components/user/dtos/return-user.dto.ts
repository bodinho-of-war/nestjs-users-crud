import { Exclude, Expose } from 'class-transformer';
import { ProfileEntity } from 'src/components/profile/entity/profile.entity';


export class ReturnUserDto {
    id: string
    name: string
    email: string

    @Exclude()
    password: string

    @Exclude()
    status: boolean;

    @Exclude()
    salt: string

    @Expose({ name: 'last_login' })
    lastLogin: Date

    @Expose({ name: 'created' })
    createdAt: Date

    @Expose({ name: 'modified' })
    updatedAt: Date

    profiles: ProfileEntity[]

    token: string

    constructor(partial: Partial<ReturnUserDto>) {
        Object.assign(this, partial);
    }
}