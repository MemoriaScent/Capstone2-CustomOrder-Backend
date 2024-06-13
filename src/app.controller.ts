import { Controller, Get, Ip, Logger, UseGuards, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get('health')
  //@UseGuards(AuthGuard)
  async HealthCheck(@Ip() clientIp) {
    this.logger.log(`Ping Tested by '${clientIp}'`);
    return this.appService.getHello(clientIp);
  }
}
