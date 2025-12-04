import { Injectable, BadRequestException } from '@nestjs/common';
import ormConfig from '../../../ormconfig';
import { Group } from '../../entities/group.entity';

@Injectable()
export class GroupService {
  private repo() {
    return ormConfig.getRepository(Group);
  }

  async create(orgId: string, name: string, description?: string) {
    if (!orgId || !name) throw new BadRequestException('orgId and name required');
    const grp = this.repo().create({ orgId, name, description });
    return this.repo().save(grp);
  }

  async findByOrg(orgId: string) {
    return this.repo().find({ where: { orgId } });
  }

  async findById(id: string) {
    return this.repo().findOneBy({ id });
  }
}
