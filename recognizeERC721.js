import { ethers } from "ethers";
import {} from 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`${process.env.ALCHEMY_MAINNET_URL}`);

const abiERC721 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function supportsInterface(bytes4) public view returns(bool)",
];

const addressBAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"

const contractERC721 = new ethers.Contract(addressBAYC, abiERC721, provider)

const nameERC721 = await contractERC721.name()
const symbolERC721 = await contractERC721.symbol()
console.log("\n1.Read ERC721 contract information")
console.log(`Contract address: ${addressBAYC}`)
console.log(`Name: ${nameERC721}`)
console.log(`Symbol: ${symbolERC721}`)

const selectorERC721 = "0x80ac58cd"
const isERC721 = await contractERC721.supportsInterface(selectorERC721)
console.log("\n2. Use ERC165's supportsInterface to determine if the contract is ERC721 compliant")
console.log(`Whether the contract is ERC721 compliant: ${isERC721}`)

