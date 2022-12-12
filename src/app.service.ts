import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AppService {

  getHello(): string {
    return 'This is a front end somehow!';
  }

  async getLastBlock() {
    // return "Last block is gonna go here.";
    const lastBlock = await ethers.getDefaultProvider("goerli").getBlock("latest");
    return `Last block is number ${lastBlock.number}. 😎 and pog.`;
  }

  getBlockDefaultLatest(blockNumberOrTag: string = "latest") {
    return ethers.getDefaultProvider("goerli").getBlock(blockNumberOrTag);
  }

  

  // example of error handling
  // throw new Error("This is an error.");
}
