import { ethers } from "ethers";
import { } from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_ID}`)

//WETH ABI only contains the transfer events we care about
const abiWETH = [
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const addressWETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6' // WETH Contract
const contract = new ethers.Contract(addressWETH, abiWETH, provider)

const block = await provider.getBlockNumber()
console.log(`Current block height: ${block}`);
console.log(`Print event details:`);
//queryFilter() contains 3 parameters, the event name (required), the start block (optional), 
//and the end block (optional). The search result will be returned as an array
const transferEvents = await contract.queryFilter('Transfer', block - 10, block)
// Print the first transfer event
console.log(transferEvents[0])