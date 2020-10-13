/** @format */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  pasword: string
}
