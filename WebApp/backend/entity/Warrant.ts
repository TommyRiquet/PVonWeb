import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Transcript } from '.'

enum state {
	renewed = 'renewed',
	resigned = 'resigned',
	free = 'free'
}

@Entity()
export class Warrant {
	@PrimaryGeneratedColumn()
		id: number

	@Column()
		adminName: string

	@Column({ type: 'enum', enum: state, default: state.free })
		state: state

	@Column({nullable: true})
		duration: string

	@ManyToOne(type => Transcript)
		transcript: Transcript

}
