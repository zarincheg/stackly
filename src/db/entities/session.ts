import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm"
import { transformer } from "../authDateTransformer"
import { UserEntity } from "@/db/entities/user"

@Entity({ name: "sessions" })
export class SessionEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ unique: true })
    sessionToken!: string

    @Column({ type: "uuid" })
    userId!: string

    @Column({ transformer: transformer.date })
    expires!: string

    @ManyToOne(() => UserEntity, (user) => user.sessions, { lazy: true })
    user!: Promise<UserEntity>
}