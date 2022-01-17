import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'profiles' })
@Unique(['name'])
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column({ type: 'varchar', length: 200 })
    name: string

}