import { Injectable, BadRequestException } from '@nestjs/common';
import ormConfig from '../../../ormconfig';
import { GroupPreference } from '../../entities/groupPreference.entity';
import { TopicPreference } from '../../entities/topicPreference.entity';
import { Topic } from '../../entities/topic.entity';

@Injectable()
export class PreferenceService {
  private gpRepo() {
    return ormConfig.getRepository(GroupPreference);
  }
  private tpRepo() {
    return ormConfig.getRepository(TopicPreference);
  }
  private topicRepo() {
    return ormConfig.getRepository(Topic);
  }

  async setGroupPreference(userId: string, groupId: string, enabled: boolean) {
    let pref = await this.gpRepo().findOne({ where: { userId, groupId } });
    if (!pref) {
      pref = this.gpRepo().create({ userId, groupId, enabled });
    } else {
      pref.enabled = enabled;
    }
    return this.gpRepo().save(pref);
  }

  async getGroupPreference(userId: string, groupId: string) {
    return this.gpRepo().findOne({ where: { userId, groupId } });
  }

  async setTopicPreference(userId: string, topicId: string, channels: any) {
    // verify topic exists
    const topic = await this.topicRepo().findOneBy({ id: topicId });
    if (!topic) throw new BadRequestException('Invalid topic');
    let pref = await this.tpRepo().findOne({ where: { userId, topicId } });
    if (!pref) {
      pref = this.tpRepo().create({ userId, topicId, channels });
    } else {
      pref.channels = channels;
    }
    return this.tpRepo().save(pref);
  }

  async getTopicPreference(userId: string, topicId: string) {
    return this.tpRepo().findOne({ where: { userId, topicId } });
  }

  async getAllPreferencesForUser(userId: string) {
    const groups = await ormConfig.getRepository('groups').find();
    const topics = await ormConfig.getRepository('topics').find();
    const groupPrefs = await this.gpRepo().find({ where: { userId } });
    const topicPrefs = await this.tpRepo().find({ where: { userId } });

    const mapTopicPref = new Map(topicPrefs.map((t: any) => [t.topicId, t]));
    const mapGroupPref = new Map(groupPrefs.map((g: any) => [g.groupId, g]));

    const result = groups.map((g: any) => {
      const groupTopics = topics.filter((t: any) => t.groupId === g.id);
      return {
        group: g,
        groupPreference: mapGroupPref.get(g.id) || null,
        topics: groupTopics.map((t: any) => ({
          topic: t,
          topicPreference: mapTopicPref.get(t.id) || null,
        })),
      };
    });

    return result;
  }
}
