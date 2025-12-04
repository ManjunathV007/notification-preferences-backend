import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrgService } from './org.service';

@Controller('orgs')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Post()
  async create(@Body('name') name: string) {
    return this.orgService.create(name);
  }

  @Get(':orgId/customers')
  async listCustomers(@Param('orgId') orgId: string) {
    return this.orgService.listCustomers(orgId);
  }
}
