import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as myNFTJson from './assets/MyNFT.json';

interface cardDictionary {
  name: string,
  percievedLoudness: number,
  tailLength: number,
  bodyLength: number,
  dynamicRange: number,
  duration: number
}

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  signer;
  myNFTFactory: ethers.ContractFactory;
  // myNFTContract;


  constructor() {
     this.provider = ethers.getDefaultProvider("goerli", {
      alchemy: process.env.ALCHEMY_API_KEY,
      infura: process.env.INFURA_API_KEY,
      etherscan: process.env.ETHERSCAN_API_KEY,
    });
    
    const wallet = new ethers.Wallet(process.env.METAMASK_KEY_GOERLI ?? "");
    this.signer = wallet.connect(this.provider);
    this.myNFTFactory = new ethers.ContractFactory(myNFTJson.abi, myNFTJson.bytecode, this.signer);
    // this.myNFTContract = this.myNFTFactory.attach("0xcf5641144a0BbF4B986038087a0f1A11F173dA05");
  }

   cardDictionary(hash: string): cardDictionary {
    const cardDictionary = {
      "QmQMQwwyYue8kpvaHintYsDhphrjdm6rh5MwT7W6fkVBXW": {
        name: "Diver",
        percievedLoudness: 1,
        tailLength: 2,
        bodyLength: 3,
        dynamicRange: 4,
        duration: 5
      },
      "QmUREMVExiVwJh9A8GnxEnyi7eZpfdLPMvrENzv1jZ4wLD": {
        name: "Dream Rhodes",
        percievedLoudness: 6,
        tailLength: 7,
        bodyLength: 8,
        dynamicRange: 9,
        duration: 10
      }
    }
    console.log('cardDictionary[hash]', cardDictionary[hash]);
    return cardDictionary[hash];
  }

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

  async mint(hash: string): Promise<number> {

    const cardObject = this.cardDictionary(hash);
    
    const { name, percievedLoudness, tailLength, bodyLength, dynamicRange, duration } = cardObject;
    const contractInstance = this.myNFTFactory.attach("0xcf5641144a0BbF4B986038087a0f1A11F173dA05").connect(this.signer);
    
    const tx = await contractInstance.safeMint("0x1ce750e83B91D00b6cCe3ae6feBe71420feAa5FF", name, hash, Number(percievedLoudness), Number(tailLength), Number(bodyLength), Number(dynamicRange), Number(duration));
    await tx.wait();
    console.log('tx', tx);
    return 7;
  }
  

  // example of error handling
  // throw new Error("This is an error.");
}
