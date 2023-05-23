import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { UserEnvironment } from './'

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


	@Column({nullable: true})
		phoneNumber: string

	@OneToMany(type => UserEnvironment, userEnvironment => userEnvironment.user)
		userEnvironments: UserEnvironment[]
}


