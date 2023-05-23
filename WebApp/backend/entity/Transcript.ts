import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm'
import { Environment, Tag } from './'

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

	@Column({default: ''})
		shareHolders: string

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
		occurenceDate: string

	@Column({ default: false })
		deleted: boolean

	@ManyToOne(type => Environment, environment => environment.transcripts)
		environment: Environment

	@ManyToMany(type => Tag, { cascade: true })
	@JoinTable()
		tags: Tag[]

}
