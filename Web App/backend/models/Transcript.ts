import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Environment } from './Environment';

@Entity()
export class Transcript {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  data: string;

  @ManyToOne(type => Environment, environment => environment.user)
  environment: Environment;
  
}
