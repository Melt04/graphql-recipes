/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm'

import { hashPassword } from '../../utils/database/hashPassword'
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  pasword: string

  @CreateDateColumn()
  createdDate: Date

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.pasword = await hashPassword(this.pasword)
  }
}
