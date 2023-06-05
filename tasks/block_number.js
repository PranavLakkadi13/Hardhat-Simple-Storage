// most of the times we will only use scripts 
// its just good to know about tasks and how to add them 
// this is code basically added to the hardhat available tasks 

const { task } = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
    async (taskargs, hre) => {
        const blocknumber = await hre.ethers.provider.getBlockNumber();
        console.log(`the current block is: ${blocknumber}`);
    }
)

module.exports = {}