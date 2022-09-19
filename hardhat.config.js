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
        "0x0de3c71faf60811c15d21e45ac3aad709545f9408528711f7b63a3adbb843f99",
      // delegateUrl: "https://sponsor-testnet.vechain.energy/by/#",
      // blockGasLimit: 10000000,
    },
  },
};
