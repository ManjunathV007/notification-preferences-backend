import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('orgs/:orgId/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Param('orgId') orgId: string,
    @Body('email') email: string,
    @Body('role') role: 'ADMIN' | 'CUSTOMER'
  ) {
    return this.userService.create(orgId, email, role);
  }

  @Get()
  async list(@Param('orgId') orgId: string) {
    return this.userService.findByOrg(orgId);
  }

  @Get(':userId')
  async get(@Param('orgId') orgId: string, @Param('userId') userId: string) {
    const user = await this.userService.findById(userId);
    if (!user || user.orgId !== orgId) {
      throw new Error('User not found');
    }
    return user;
  }
}
