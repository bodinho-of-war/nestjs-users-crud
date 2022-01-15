import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 300 })
    name: string

    @Column({ type: 'varchar', length: 100 })
    email: string

    @Column({ type: 'varchar', length: 100 })
    password: string

    @Column({ type: 'jsonb', array: true, nullable: true })
    profiles: object[]

    @Column({ type: 'timestamp' })
    lastLogin: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}