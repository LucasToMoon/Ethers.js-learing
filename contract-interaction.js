import { ethers } from "ethers";
import {} from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_ID}`)

const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public",
];

const addressWETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6' // WETH Contract

const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

const address = await wallet.getAddress()
console.log("\n1. Read WETH balance")
const balanceWETH = await contractWETH.balanceOf(address)
console.log(`Pre-Deposit WETH Positions: ${ethers.utils.formatEther(balanceWETH)}\n`)

console.log("\n2. Call the desposit() function and deposit 0.001 ETH")
const tx = await contractWETH.deposit({value: ethers.utils.parseEther("0.001")})
await tx.wait()
console.log(`Transaction details:`)
console.log(tx)
const balanceWETH_deposit = await contractWETH.balanceOf(address)
console.log(`WETH positions after deposit: ${ethers.utils.formatEther(balanceWETH_deposit)}\n`)

console.log("\n3. Call the transfer() function and transfer 0.001 WETH to vitalik")
const tx2 = await contractWETH.transfer("vitalik.eth", ethers.utils.parseEther("0.001"))
await tx2.wait()
const balanceWETH_transfer = await contractWETH.balanceOf(address)
console.log(`WETH positions after deposit: ${ethers.utils.formatEther(balanceWETH_transfer)}\n`)

