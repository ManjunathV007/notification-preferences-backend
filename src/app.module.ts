import { Module } from '@nestjs/common';
import { OrgModule } from './modules/org/org.module';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';
import { TopicModule } from './modules/topic/topic.module';
import { PreferenceModule } from './modules/preference/preference.module';
import { DecisionModule } from './modules/decision/decision.module';

@Module({
  imports: [OrgModule, UserModule, GroupModule, TopicModule, PreferenceModule, DecisionModule],
})
export class AppModule {}
