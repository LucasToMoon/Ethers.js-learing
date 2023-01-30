
import { ethers } from "ethers";
import {} from 'dotenv/config';

const providerETH = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)
const providerGoerli = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_ID}`)


console.log("1. Check Vitalik's ETH balance on the main network and Goerli test networks");

const balance = await providerETH.getBalance(`vitalik.eth`);
const balanceGoerli = await providerGoerli.getBalance(`vitalik.eth`);

console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`);
console.log(`Goerli ETH Balance of vitalik: ${ethers.utils.formatEther(balanceGoerli)} ETH`);

console.log("\n2. Query which chain the provider is connected to")
const network = await providerETH.getNetwork();
console.log(network);

console.log("\n3. Query block height")
const blockNumber = await providerETH.getBlockNumber();
console.log(blockNumber);

console.log("\n4. Check current gas price")
const gasPrice = await providerETH.getGasPrice();
console.log(gasPrice);

console.log("\n5. Query the current recommended gas settings")
const feeData = await providerETH.getFeeData();
console.log(feeData);

console.log("\n6. Query Block Information")
const block = await providerETH.getBlock(0);
console.log(block);

console.log("\n7. Given the contract address to query the contract bytecode, the example uses the WETH address")
const code = await providerETH.getCode("0xc778417e063141139fce010982780140aa0cd5ab");
console.log(code);

