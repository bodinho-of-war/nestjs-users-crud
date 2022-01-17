import { genSalt, hash, hashSync } from "bcrypt";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer'

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 300 })
    name: string

    @Column({ type: 'varchar', length: 100 })
    email: string

    @Column({ type: 'varchar', length: 100 })
    @Exclude()
    password: string

    @Column({ type: 'jsonb', nullable: true })
    profiles: object[]

    @Column({ nullable: false, default: true })
    @Exclude()
    status: boolean;

    @Column({ nullable: false })
    @Exclude()
    salt: string

    @Column({ type: 'timestamp', nullable: true })
    @Expose({ name: 'last_login' })
    lastLogin: Date

    @CreateDateColumn()
    @Expose({ name: 'created' })
    createdAt: Date

    @UpdateDateColumn()
    @Expose({ name: 'modified' })
    updatedAt: Date

    @BeforeInsert()
    async hashPassword() {
        this.salt = await genSalt()
        this.password = await hashSync(this.password, this.salt)
    }

    async checkPassword(password: string): Promise<boolean> {
        const hashed = await hash(password, this.salt);
        return hashed === this.password;
    }
}