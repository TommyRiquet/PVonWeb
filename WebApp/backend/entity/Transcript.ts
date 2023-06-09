import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm'
import { Environment, Tag, Warrant } from './'

enum CompanySize {
	small = 'small',
	medium = 'medium',
	large = 'large'
}

@Entity()
export class Transcript {
	@PrimaryGeneratedColumn()
		id: number

	@Column()
		name: string

	@Column()
		companyName: string

	@Column({ type: 'enum', enum: CompanySize, default: CompanySize.small })
		companySize: CompanySize

	@Column()
		adminName: string

	@Column()
		secretaryName: string

	@Column()
		scrutineerName: string

	@Column({default: true})
		isConvocation: boolean

	@Column({default: true})
		isExact: boolean

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
		occurenceDate: string

	@Column({nullable: true})
		link: string

	@Column({ default: false })
		deleted: boolean

	@ManyToOne(type => Environment, environment => environment.transcripts)
		environment: Environment

	@OneToMany(type => Warrant, warrant => warrant.transcript, { cascade: true })
		warrants: Warrant[]

	@ManyToMany(type => Tag, { cascade: true })
	@JoinTable()
		tags: Tag[]

}
