import { ethers } from "ethers";
import {} from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`${process.env.ALCHEMY_MAINNET_URL}`);
const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

const abiDAI = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
];

const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiDAI, provider)

const address = await wallet.getAddress()
const address2 = "0xed55d1b71b6bfa952ddbc4f24375c91652878560"
console.log("\n1. Read the DAI balance of the test wallet")
const balanceDAI = await contractDAI.balanceOf(address2)
console.log(`DAI positions: ${ethers.utils.formatEther(balanceDAI)}\n`)

console.log("\n2.  Try to call transfer transfer 1 DAI with callStatic, msg.sender is address2 address")
const tx = await contractDAI.callStatic.transfer("vitalik.eth", ethers.utils.parseEther("1"), {from: address2})
console.log(`Will the deal be a success? : `, tx)
