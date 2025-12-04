import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { TopicService } from './topic.service';
import { getRepository } from 'typeorm';
import { Topic } from '../../entities/topic.entity';

@Controller('orgs/:orgId/groups/:groupId/topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async create(
    @Param('orgId') orgId: string,
    @Param('groupId') groupId: string,
    @Body('name') name: string,
    @Body('description') description?: string
  ) {
    return this.topicService.create(orgId, groupId, name, description);
  }

  @Get()
  async list(@Param('orgId') orgId: string, @Param('groupId') groupId: string) {
    return this.topicService.findByGroup(groupId);
  }

  @Get(':topicId')
  async get(@Param('orgId') orgId: string, @Param('groupId') groupId: string, @Param('topicId') topicId: string) {
    const topic = await this.topicService.findById(topicId);
    if (!topic || topic.orgId !== orgId || topic.groupId !== groupId) {
      throw new Error('Topic not found');
    }
    return topic;
  }
}
