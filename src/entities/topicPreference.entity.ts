import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'topic_preferences' })
export class TopicPreference {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column()
  topicId!: string;

  // JSONB holding channel booleans
  @Column({ type: 'jsonb', default: '{}' })
  channels!: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    in_app?: boolean;
    chat?: boolean;
    whatsapp?: boolean;
    [key: string]: boolean | undefined;
  };
}
