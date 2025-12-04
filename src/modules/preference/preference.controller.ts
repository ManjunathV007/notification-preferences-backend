import { Controller, Put, Body, Param, Get } from '@nestjs/common';
import { PreferenceService } from './preference.service';

@Controller()
export class PreferenceController {
  constructor(private readonly prefService: PreferenceService) {}

  @Put('users/:userId/groups/:groupId/preference')
  async setGroup(@Param('userId') userId: string, @Param('groupId') groupId: string, @Body('enabled') enabled: boolean) {
    return this.prefService.setGroupPreference(userId, groupId, enabled);
  }

  @Put('users/:userId/topics/:topicId/preference')
  async setTopic(@Param('userId') userId: string, @Param('topicId') topicId: string, @Body() body: any) {
    // body.channels expected
    const channels = body.channels || body;
    return this.prefService.setTopicPreference(userId, topicId, channels);
  }

  @Get('users/:userId/topics/:topicId/preference')
  async getTopic(@Param('userId') userId: string, @Param('topicId') topicId: string) {
    return this.prefService.getTopicPreference(userId, topicId);
  }

  @Get('users/:userId/preferences')
  async getAll(@Param('userId') userId: string) {
    return this.prefService.getAllPreferencesForUser(userId);
  }
}
