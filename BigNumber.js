import { ethers } from "ethers";
import {} from 'dotenv/config';

const oneGwei = ethers.BigNumber.from("1000000000"); // Generate from string
console.log(oneGwei)
console.log(ethers.BigNumber.from("0x3b9aca00")) // Generate from hex string
console.log(ethers.BigNumber.from(1000000000)) // Genatate from number
// Cannot generate BigNumber from a number other than js's largest safe integer, the following code will report an error
// ethers.BigNumber.from(Number.MAX_SAFE_INTEGER);
console.log("Maximum safe integer in js:", Number.MAX_SAFE_INTEGER)

console.log("Add: ", oneGwei.add(1).toString())
console.log("Sub: ", oneGwei.sub(1).toString())
console.log("Mul: ", oneGwei.mul(2).toString())
console.log("Div: ", oneGwei.div(2).toString())
console.log("Is equal: ", oneGwei.eq("1000000000"))

//Code reference：https://docs.ethers.io/v5/api/utils/display-logic/#utils-parseUnits
console.group('\n2. Formatting: small units to large units: formatUnits');
console.log(ethers.utils.formatUnits(oneGwei, 0));
// '1000000000'
console.log(ethers.utils.formatUnits(oneGwei, "gwei"));
// '1.0'
console.log(ethers.utils.formatUnits(oneGwei, 9));
// '1.0'
console.log(ethers.utils.formatUnits(oneGwei, "ether"));
// `0.000000001`
console.log(ethers.utils.formatUnits(1000000000, "gwei"));
// '1.0'
console.log(ethers.utils.formatEther(oneGwei));
// `0.000000001` equal to formatUnits(value, "ether")
console.groupEnd();

console.group('\n3. Parse. Large unit to small unit: parseUnits');
console.log(ethers.utils.parseUnits("1.0").toString());
// { BigNumber: "1000000000000000000" }
console.log(ethers.utils.parseUnits("1.0", "ether").toString());
// { BigNumber: "1000000000000000000" }
console.log(ethers.utils.parseUnits("1.0", 18).toString());
// { BigNumber: "1000000000000000000" }
console.log(ethers.utils.parseUnits("1.0", "gwei").toString());
// { BigNumber: "1000000000" }
console.log(ethers.utils.parseUnits("1.0", 9).toString());
// { BigNumber: "1000000000" }
console.log(ethers.utils.parseEther("1.0").toString());
// { BigNumber: "1000000000000000000" } equal to parseUnits(value, "ether")
console.groupEnd();