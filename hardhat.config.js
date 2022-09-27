require("@nomicfoundation/hardhat-toolbox");
require("@vechain.energy/hardhat-thor");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    vechain: {
      // url: "https://sync-testnet.vechain.org",
      // url: "https://testnet.veblocks.net",
      url: "https://testnet.vecha.in",
      privateKey:
        "8b87d9d400616164337edabbfb4af02c89994a047b3bfe63f4ba10cf69d1ceae",
      // delegateUrl: "https://sponsor-testnet.vechain.energy/by/#",
      // blockGasLimit: 10000000,
    },
  },
};
