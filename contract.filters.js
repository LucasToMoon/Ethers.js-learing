import { ethers } from "ethers";
import {} from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`${process.env.ALCHEMY_MAINNET_URL}`);
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'

const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address) public view returns(uint)",
  ];

const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);

const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
console.log(`USDT balance: ${ethers.utils.formatUnits(ethers.BigNumber.from(balanceUSDT),6)}\n`)

console.log("\n2. Create filters to listen for transfers of USDT into the exchange")
let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
console.log("Filter details1: ")
console.log(filterBinanceIn);
contractUSDT.on(filterBinanceIn, (from, to, value) => {
  console.log('---------Listening to USDT depositing the exchange--------');
  console.log(
    `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
  )
}).on('error', (error) => {
  console.log(error)
})

let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance, null);
console.log("\n3. Create a filter to listen and transfer USDT out of the exchange")
console.log("Filter details2：")
console.log(filterToBinanceOut);
contractUSDT.on(filterToBinanceOut, (from, to, value) => {
  console.log('---------Listening to USDT withdrawing the exchange--------');
  console.log(
    `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
  )
}
).on('error', (error) => {
  console.log(error)
});
