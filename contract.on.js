import { ethers } from "ethers";
import {} from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`${process.env.ALCHEMY_MAINNET_URL}`);

//USDT
const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)"
  ];
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

  // Listens only once
  console.log("\n1. Using contract.once(), listen to the Transfer event once");
  contractUSDT.once('Transfer', (from, to, value)=>{
    // print result
    console.log(
      `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
    )
  })

  // Continuous monitoring of USDT contracts
  console.log("\n2. Use contract.on() to continuously listen for Transfer events");
  contractUSDT.on('Transfer', (from, to, value)=>{
    console.log(
     // print results
     `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
    )
  })
