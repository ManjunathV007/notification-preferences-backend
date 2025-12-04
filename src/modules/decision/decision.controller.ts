import { Controller, Post, Body } from '@nestjs/common';
import { DecisionService } from './decision.service';

@Controller('decision')
export class DecisionController {
  constructor(private readonly decisionService: DecisionService) {}

  @Post()
  async decide(@Body() body: { orgId: string; userId: string; topicId: string; channel: string }) {
    const { orgId, userId, topicId, channel } = body;
    return this.decisionService.shouldSend(orgId, userId, topicId, channel);
  }
}
