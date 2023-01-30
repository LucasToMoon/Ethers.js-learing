
import { ethers } from "ethers";
import {} from 'dotenv/config';

const providerETH = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)
const providerGoerli = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_ID}`)


console.log("1. Check Vitalik's ETH balance on the main network and Goerli test networks");

const balance = await providerETH.getBalance(`vitalik.eth`);
const balanceGoerli = await providerGoerli.getBalance(`vitalik.eth`);

console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`);
console.log(`Goerli ETH Balance of vitalik: ${ethers.utils.formatEther(balanceGoerli)} ETH`);

