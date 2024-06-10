import { Controller, Get, Ip, Logger } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get('health')
  async HealthCheck(@Ip() clientIp) {
    this.logger.log(`Ping Tested by '${clientIp}'`);
    return this.appService.getHello(clientIp);
  }
}
