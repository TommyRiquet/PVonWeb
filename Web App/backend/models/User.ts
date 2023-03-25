import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Environment } from './Environment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;


  @ManyToOne(type => Environment, environment => environment.user)
  environments: Environment;
  
}
