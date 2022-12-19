import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  email?: string;

  @Column()
  password: string;

  @Column({ type:"decimal", precision:10, scale: 1, default: 5000.0 })
  balance?: number;
}