import { ethers } from "ethers";
import {} from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_ID}`)

const wallet1 = ethers.Wallet.createRandom()
const wallet1WithProvider = wallet1.connect(provider)
const mnemonic = wallet1.mnemonic

const wallet2 = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider)

const wallet3 = ethers.Wallet.fromMnemonic(mnemonic.phrase)

const address1 = await wallet1.getAddress()
const address2 = await wallet2.getAddress() 
const address3 = await wallet3.getAddress()

console.log(`1. Get wallet address`);
console.log(`wallet1 address: ${address1}`);
console.log(`wallet2 address: ${address2}`);
console.log(`wallet3 address: ${address3}`);
console.log(`Are the addresses of wallet1 and wallet3 the same: ${address1 === address3}`);

console.log(`\n2. wallet1 mnemonic: ${wallet1.mnemonic.phrase}`)

console.log(`\n3. wallet2 private key: ${wallet2.privateKey}`)

console.log(`\n4. Number of transactions`)
const txCount1 = await wallet1WithProvider.getTransactionCount()
const txCount2 = await wallet2.getTransactionCount()
console.log(`Number of transactions sent by wallet1: ${txCount1}`)
console.log(`Number of transactions sent by wallet2: ${txCount2}`)

console.log(`\n5. Send ETH (test network)`);
console.log(`i. Pre-sending balance`)
console.log(`wallet1: ${ethers.utils.formatEther(await wallet1WithProvider.getBalance())} ETH`)
console.log(`wallet2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`)
const tx = {
    to: address1,
    value: ethers.utils.parseEther("0.001")
}
console.log(`\nii. Wait for the transaction to be confirmed on the blockchain (takes a few minutes)`)
const receipt = await wallet2.sendTransaction(tx)
await receipt.wait() // Waiting for on-chain confirmation of transactions
console.log(receipt) // Print transaction details
console.log(`\niii. Balance after sending`)
console.log(`wallet1: ${ethers.utils.formatEther(await wallet1WithProvider.getBalance())} ETH`)
console.log(`wallet2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`)