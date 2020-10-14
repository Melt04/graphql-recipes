/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { Category } from './Category'
import { User } from './User'

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ length: 150 })
  description: string

  @Column({ type: 'simple-array', nullable: false })
  ingredients: string[]

  @ManyToOne(() => User, (user) => user.recipe)
  user: User

  @ManyToOne(() => Category, (category) => category.id)
  category: Category
}
