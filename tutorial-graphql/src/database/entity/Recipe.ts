/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
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

  @Column()
  @ManyToOne(() => User, (user) => user.id)
  userId: number

  @Column()
  @ManyToOne(() => Category, (category) => category.id)
  category: number
}
