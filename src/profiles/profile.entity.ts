import { BaseEntity, Column, Entity, Unique } from "typeorm";

@Entity({ name: 'profiles' })
@Unique(['name'])
export class Profile extends BaseEntity {

    @Column({ type: 'varchar', length: 200 })
    name: string

}