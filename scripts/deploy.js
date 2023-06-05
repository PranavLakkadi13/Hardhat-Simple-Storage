// imports
// run is helpful to verify contracts and network is for network configurations 
const { ethers, run, network } = require("hardhat"); 

// async function
async function main() {
  const simplestoragefactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract .....  ");
  const simpleStorage = await simplestoragefactory.deploy();

  await simpleStorage.deployed();
  address1 = simpleStorage.address;

  console.log(`the address of the deployed contract: ${address1}`);
  console.log("Contract has been deployed.......");
  // console.log(network.config)
  // to make sure that it verifies the contract on block explorer with the respective API keys 
  if (network.config.chainId === 80001||network.config.chainId === 5 && process.env.PolygonScan_API_KEY||process.env.Etherscan_API_KEY) {
    console.log("Waiting for the blocks confirmation");
    // waiting for some blocks bcoz the block explorer is not exactly in sync with the network
    await simpleStorage.deployTransaction.wait(2); // wait for 2 blocks before verifying
    await verify(simpleStorage.address, []);
  }

  // to interact with the contract -------------------------------->
  const currentValue = await simpleStorage.retrieve();
  console.log(`the current value is : ${currentValue}`);
  // to update the value 
  const transactionResponse = await simpleStorage.store(781232);
  await transactionResponse.wait(1);
  const temp2 = await simpleStorage.retrieve();
  console.log(`the value is : ${temp2}`);
  const temp = await simpleStorage.store(7887);
  await temp.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`the updated value is: ${updatedValue}`);
  const owner = await simpleStorage.owner();
  console.log(`the owner of the contract ${owner}`);
}

async function verify(contractAddress, args){
  console.log("Verifying contract...");
  try {
   (await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    }));
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
