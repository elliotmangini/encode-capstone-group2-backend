import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Signer } from 'ethers';
import { AppService } from './app.service';

interface hashSigner {
  signer: Signer;
  hash: string;
}

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

  // @Get("mint/:hash/:signer")
  // mint(
  //   @Param('hash') hash: string,
  //   @Param('signer') signer: Signer,
  // )
  //   {
  //   return this.appService.mint(hash, signer);
  // }

  @Post("mint")
  mint(@Body() body: hashSigner) {
    return this.appService.mint(body);
  }

}
