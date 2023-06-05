require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block_number")
require("hardhat-gas-reporter");
require("solidity-coverage");

const Alchemy_Provider = process.env.RPC_URL_Alchemy_Goerli;
const Private_Key = process.env.Private_Key;
const Etherscan_API_KEY = process.env.Etherscan_API_KEY;
const Coinmarketcap_API_KEY = process.env.Coinmarketcap_API_KEY;
const Polygon_Provider_POLY = process.env.RPC_URL_QuickNode_POLYGON;
const PolygonScan_API_KEY = process.env.PolygonScan_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultnetwork: "hardhat", // is different from the local host
  networks: {
    goerli: { 
      url: Alchemy_Provider,
      accounts: [Private_Key],
      chainId: 5,
    },
    polygon: {
      url: Polygon_Provider_POLY,
      accounts: [Private_Key],
      chainId: 80001,
    },
    localhost: {
      url: process.env.localhost_RPC,
      // accounts: [process.env.localhost_Private_Key], // not necessary to give the accounts
      chainId: 31337,
    },
  },
  solidity: "0.8.17",
  etherscan: {
    apiKey: Etherscan_API_KEY,
  },
  polygonscan: {
    apiKey: PolygonScan_API_KEY,
  },
  gasReporter: {
    enabled: true,
    // outputFile: "gas-reporter.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: Coinmarketcap_API_KEY,
    // token: "BNB",
  },
};
