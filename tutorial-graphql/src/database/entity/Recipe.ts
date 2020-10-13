/** @format */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ length: 150 })
  description: string

  @Column({ nullable: false })
  ingredients: string

  @Column()
  category: number
}
