import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Index } from 'typeorm'
import { Environment, Transcript } from './'

@Entity()
export class Tag {
	@PrimaryGeneratedColumn()
		id: number

	@Column()
		name: string

	@Column({ nullable: true})
		description: string

	@Column({ default: true })
		isActive: boolean

	@ManyToOne(type => Environment, environment => environment.transcripts)
		environment: Environment

}
