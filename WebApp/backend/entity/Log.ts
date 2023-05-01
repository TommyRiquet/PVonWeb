import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { User } from './User'
import { Environment } from './Environment'
import { Transcript } from './Transcript'

enum Action {
	create = 'create',
	update = 'update',
	delete = 'delete'
}


@Entity()
export class Log {
	@PrimaryGeneratedColumn()
		id: number

	@Column({ type: 'enum', enum: Action, nullable: false })
		action: Action

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
		timestamp: string

	@ManyToOne(type => User, {nullable: false})
		user: User

	@ManyToOne(type => Environment, {nullable: false})
		environment: Environment

	@ManyToOne(type => Environment)
		targetEnvironment: Environment

	@ManyToOne(type => Transcript)
		targetTranscript: Transcript

	@ManyToOne(type => User)
		targetUser: User

}
