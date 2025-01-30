import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm"
import { transformer } from "../authDateTransformer"
  
@Entity({ name: "verification_tokens" })
export class VerificationTokenEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string
 
  @Column()
  token!: string
 
  @Column()
  identifier!: string
 
  @Column({ transformer: transformer.date })
  expires!: string
}