import { Injectable, BadRequestException } from '@nestjs/common';
import ormConfig from '../../../ormconfig';
import { Organization } from '../../entities/organization.entity';

@Injectable()
export class OrgService {
  private repo() {
    return ormConfig.getRepository(Organization);
  }

  async create(name: string) {
    if (!name) throw new BadRequestException('name required');
    const org = this.repo().create({ name });
    return this.repo().save(org);
  }

  async findById(id: string) {
    return this.repo().findOneBy({ id });
  }

  async listCustomers(orgId: string) {
    // Customers are users with role CUSTOMER
    const userRepo = ormConfig.getRepository('users');
    const users = await userRepo.find({ where: { orgId, role: 'CUSTOMER' } });
    return users;
  }
}
