import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orgId!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;
}
