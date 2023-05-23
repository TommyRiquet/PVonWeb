import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { UserEnvironment, Transcript } from './'

@Entity()
export class Environment {
	@PrimaryGeneratedColumn()
		id: number

	@Column()
		name: string

	@Column()
		description: string

	@OneToMany(type => UserEnvironment, userEnvironment => userEnvironment.environment)
		userEnvironments: UserEnvironment[]

	@OneToMany(type => Transcript, transcript => transcript.environment)
		transcripts: Transcript[]

}
