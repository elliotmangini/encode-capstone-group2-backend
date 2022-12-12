import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("last-block")
  getLastBlock() {
    return this.appService.getLastBlock();
  }

  @Get("block/:hash")
  getBlockDefaultLatest(@Param('hash') hash: string) {
    return this.appService.getBlockDefaultLatest(hash);
  }

}
