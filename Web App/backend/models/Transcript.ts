import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { Environment } from './Environment'

@Entity()
export class Transcript {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	companyName: string

	@Column()
	adminName: string

	@Column()
	secretaryName: string

	@Column()
	scrutineerName: string

	@Column()
	shareHolders: string

	@Column()
	occurenceDate: string

	@ManyToOne(type => Environment, environment => environment.transcripts)
	environment: Environment
  
}
