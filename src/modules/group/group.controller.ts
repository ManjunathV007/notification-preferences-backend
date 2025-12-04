import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('orgs/:orgId/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Param('orgId') orgId: string, @Body('name') name: string, @Body('description') description?: string) {
    return this.groupService.create(orgId, name, description);
  }

  @Get()
  async list(@Param('orgId') orgId: string) {
    // returns groups without topics; topics endpoint below
    return this.groupService.findByOrg(orgId);
  }
}
