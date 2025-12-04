import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// import entity classes so TypeORM has metadata at runtime
import { Organization } from './src/entities/organization.entity';
import { User } from './src/entities/user.entity';
import { Group } from './src/entities/group.entity';
import { Topic } from './src/entities/topic.entity';
import { GroupPreference } from './src/entities/groupPreference.entity';
import { TopicPreference } from './src/entities/topicPreference.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'notif_pref',
  synchronize: true,
  logging: false,
  // pass the imported entity classes directly
  entities: [Organization, User, Group, Topic, GroupPreference, TopicPreference],
  migrations: [],
});
