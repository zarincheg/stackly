import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm"
import { transformer } from "../authDateTransformer"
import { SessionEntity } from "./session"
import { AccountEntity } from "./account"

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "varchar", nullable: true })
    name!: string | null

    @Column({ type: "varchar", nullable: true, unique: true })
    email!: string | null

    @Column({ type: "varchar", nullable: true, transformer: transformer.date })
    emailVerified!: string | null

    @Column({ type: "varchar", nullable: true })
    image!: string | null

    @Column({ type: "varchar", nullable: true })
    role!: string | null

    @OneToMany(() => SessionEntity, (session) => session.userId, { lazy: true })
    sessions!: Promise<SessionEntity[]>

    @OneToMany(() => AccountEntity, (account) => account.userId, { lazy: true })
    accounts!: Promise<AccountEntity[]>
}