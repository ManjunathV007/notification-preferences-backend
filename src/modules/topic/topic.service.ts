import { Injectable, BadRequestException } from '@nestjs/common';
import ormConfig from '../../../ormconfig';
import { Topic } from '../../entities/topic.entity';

@Injectable()
export class TopicService {
  private repo() {
    return ormConfig.getRepository(Topic);
  }

  async create(orgId: string, groupId: string, name: string, description?: string) {
    if (!orgId || !groupId || !name) throw new BadRequestException('orgId, groupId, name required');
    const topic = this.repo().create({ orgId, groupId, name, description });
    return this.repo().save(topic);
  }

  async findByGroup(groupId: string) {
    return this.repo().find({ where: { groupId } });
  }

  async findById(id: string) {
    return this.repo().findOneBy({ id });
  }

  async findByOrg(orgId: string) {
    return this.repo().find({ where: { orgId } });
  }
}
