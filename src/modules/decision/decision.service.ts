import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import ormConfig from '../../../ormconfig';
import { isValidChannel } from '../../common/enums/channel.enum';

@Injectable()
export class DecisionService {
  async shouldSend(orgId: string, userId: string, topicId: string, channel: string) {
    if (!isValidChannel(channel)) throw new BadRequestException('Invalid channel');

    const user = await ormConfig.getRepository('users').findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.orgId !== orgId) throw new BadRequestException('User does not belong to org');

    const topic = await ormConfig.getRepository('topics').findOne({ where: { id: topicId } });
    if (!topic) throw new NotFoundException('Topic not found');
    if (topic.orgId !== orgId) throw new BadRequestException('Topic does not belong to org');

    const groupId = topic.groupId;

    const gp = await ormConfig.getRepository('group_preferences').findOne({ where: { userId, groupId } });

    if (gp && gp.enabled === false) {
      return { allowed: false };
    }

    const tp = await ormConfig.getRepository('topic_preferences').findOne({ where: { userId, topicId } });

    if (tp && tp.channels && tp.channels[channel] === true) {
      return { allowed: true };
    }

    return { allowed: false };
  }
}
