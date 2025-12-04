import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'topics' })
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orgId!: string;

  @Column()
  groupId!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;
}
