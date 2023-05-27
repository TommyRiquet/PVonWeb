import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { UserEnvironment } from './'

export enum Language {
	EN = 'en',
	FR = 'fr'
}

@Entity()
export class User {
	@PrimaryGeneratedColumn()
		id: number

	@Column()
		firstName: string

	@Column()
		lastName: string

	@Column()
		email: string

	@Column()
		password: string

	@Column({
		type: 'enum',
		enum: Language,
		default: Language.EN
	})
		language: Language

	@Column({nullable: true})
		phoneNumber: string

	@OneToMany(type => UserEnvironment, userEnvironment => userEnvironment.user)
		userEnvironments: UserEnvironment[]
}


