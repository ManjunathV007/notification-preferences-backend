import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'group_preferences' })
export class GroupPreference {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column()
  groupId!: string;

  @Column({ default: true })
  enabled!: boolean;
}
