import { ethers } from "ethers";
import {} from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_ID}`)
const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

const abiERC20 = [
    "constructor(string memory name_, string memory symbol_)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint256 amount) external returns (bool)",
    "function mint(address to, uint amount) external",
];

const addressMTK = '0xe6C9De2761b747256Fb1e4298D4C68ABC985A764' // MTK Contract

const contractERC20 = new ethers.Contract(addressMTK, abiERC20, wallet)

console.log("\n2. Call the mint() function and give yourself the address mint 10,000 tokens")
console.log(`Contract name: ${await contractERC20.name()}`)
console.log(`COntract symbol: ${await contractERC20.symbol()}`)
const tx1 = await contractERC20.mint(wallet.address, "20000000000000000000000", {gasLimit: 100000, gasPrice: 10000000000});
console.log("Waiting for transactions on-chain")
await tx1.wait()
console.log(`Token balance in address after mint: ${await contractERC20.balanceOf(wallet.address)}`)
console.log(`Total supply of tokens: ${await contractERC20.totalSupply()}`)

// const to = 0xff0cf60B220CEA3851Ae49cbf94D011CE4342b54
// console.log("\n3. Call the transfer() function and transfer 1,000 tokens to to")
// const tx2 = await contractERC20.transfer(to, "1500000000000000000000", {gasLimit: 100000, gasPrice: 10000000000})
// console.log("Waiting for transactions on-chain")
// await tx2.wait()
// console.log(`Token balance in Vitalik wallet: ${await contractERC20.balanceOf(to)}`)


