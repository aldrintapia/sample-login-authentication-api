import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn({
    type: 'uuid',
    default: 'uuid_generate_v4()',
    nullable: false,
    generated: true,
  })
  @Expose()
  id: string;

  @Column({
    unique: true,
  })
  @Expose()
  username: string;

  @Column()
  @Expose()
  password: string;

  @Column({
    default: 'a@a.com',
  })
  @Expose()
  email: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'now()',
    nullable: true,
  })
  @Expose()
  created_date: string;

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'now()',
    nullable: true,
  })
  @Expose()
  updated_date: string;
}
