import { ethers } from "ethers";
import {} from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_ID}`)
const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
];
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6' //goerli
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

const address = await wallet.getAddress()
console.log("\n1. Read WETH balance")
// encode calldata
const param1 = contractWETH.interface.encodeFunctionData(
    "balanceOf",
    [address]
  );
console.log(`Coding results: ${param1}`)
// Create a tx
const tx1 = {
    to: addressWETH,
    data: param1
}
// Initiating a transaction, readable operation (view/pure) can be done with provider.call(tx)
const balanceWETH = await provider.call(tx1)
console.log(`Pre-Deposit WETH Positions: ${ethers.utils.formatEther(balanceWETH)}\n`)

// Code calldata
const param2 = contractWETH.interface.encodeFunctionData(
    "deposit"          
    );
console.log(`Coding results: ${param2}`)
// Create a tx
const tx2 = {
    to: addressWETH,
    data: param2,
    value: ethers.utils.parseEther("0.001")}
// Initiating a transaction and writing to it requires wallet.sendTransaction(tx)
const receipt1 = await wallet.sendTransaction(tx2)
// Waiting for transactions to go up
await receipt1.wait()
console.log(`Transaction details: `)
console.log(receipt1)
const balanceWETH_deposit = await contractWETH.balanceOf(address)
console.log(`Deposit after WETH position: ${ethers.utils.formatEther(balanceWETH_deposit)}\n`)
