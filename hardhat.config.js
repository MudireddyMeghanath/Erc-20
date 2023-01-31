require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.6",
  gasReporter:{
    enabled:true,
    currency:"INR",
    noColors:true,
    outputFile:"gasReport.txt",
    coinmarketcap:"5109de41-936d-4def-a6d0-6524c1d935e3",
    token:"matic",

  }

};
