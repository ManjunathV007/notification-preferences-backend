import { Injectable, BadRequestException } from '@nestjs/common';
import ormConfig from '../../../ormconfig';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  private repo() {
    return ormConfig.getRepository(User);
  }

  async create(orgId: string, email: string, role: 'ADMIN' | 'CUSTOMER') {
    if (!orgId || !email) throw new BadRequestException('orgId and email required');
    const user = this.repo().create({ orgId, email, role });
    return this.repo().save(user);
  }

  async findById(id: string) {
    return this.repo().findOneBy({ id });
  }

  async findByOrg(orgId: string) {
    return this.repo().find({ where: { orgId } });
  }
}
