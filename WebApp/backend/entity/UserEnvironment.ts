import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm'

import { Environment, User } from './'

@Entity()
export class UserEnvironment {

	@PrimaryColumn()
		userId: number

    @ManyToOne(type => User, user => user.userEnvironments)
    	user: User

	@PrimaryColumn()
		environmentId: number

    @ManyToOne(type => Environment, environment => environment.userEnvironments)
    	environment: Environment

	@Column()
    	role: string
}
