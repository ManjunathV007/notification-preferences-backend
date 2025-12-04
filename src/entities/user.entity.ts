import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './organization.entity';

export type Role = 'ADMIN' | 'CUSTOMER';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

  @Column({ type: 'text' })
  role!: Role;

  @Column()
  orgId!: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'orgId' })
  organization!: Organization;
}
