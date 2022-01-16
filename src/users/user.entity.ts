import { hash } from "bcrypt";
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

    @Column({ type: 'jsonb', nullable: true })
    profiles: object[]

    @Column({ nullable: false, default: true })
    status: boolean;

    @Column({ nullable: false })
    salt: string

    @Column({ nullable: true, type: 'varchar', length: 64 })
    confirmationToken: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    recoverToken: string;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    async checkPassword(password: string): Promise<boolean> {
        const hashed = await hash(password, this.salt);
        return hashed === this.password;
    }
}