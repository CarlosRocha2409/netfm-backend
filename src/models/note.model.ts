import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Topic } from "./topic.model";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;

  @Column()
  body!: string;

  @Column()
  topicId!: number;

  @ManyToOne(() => Topic)
  @JoinColumn({
    name: "topicId",
  })
  topic!: Topic;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at!: Date;
}
