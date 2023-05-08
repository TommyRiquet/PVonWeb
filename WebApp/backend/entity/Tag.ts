import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Index } from 'typeorm'
import { Environment, Transcript } from './'

@Entity()
@Index(['name', 'environment'], { unique: true })
export class Tag {
	@PrimaryGeneratedColumn()
		id: number

	@Column()
		name: string

	@Column({ nullable: true})
		description: string

	@ManyToMany(type => Transcript)
	@JoinTable()
		transcripts: Transcript[]

	@ManyToOne(type => Environment, environment => environment.transcripts)
		environment: Environment

}
