import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Transcript } from './Transcript';

@Entity()
export class Environment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => User, user => user.environments)
  user: User[];

  @OneToMany(type => Transcript, transcript => transcript.environment)
  transcripts: Transcript[];
  
}
