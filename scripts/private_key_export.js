const ethers = require("ethers");
let mnemonic =
  "fiction toward solid wide page gossip chat dress school maximum typical month";
let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
console.log(mnemonicWallet.privateKey);
