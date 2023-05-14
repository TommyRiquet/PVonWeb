import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { User } from './User'
import { Transcript } from './Transcript'

@Entity()
export class Environment {
  @PrimaryGeneratedColumn()
  	id: number

  @Column()
  	name: string

  @Column()
  	description: string

  @OneToMany(type => User, user => user.environment)
  	users: User[]

  @OneToMany(type => Transcript, transcript => transcript.environment)
  	transcripts: Transcript[]

}
