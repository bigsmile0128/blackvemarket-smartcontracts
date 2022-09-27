// const ethers = require("ethers");
// let mnemonic =
//   "fiction toward solid wide page gossip chat dress school maximum typical month";
// let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
// console.log(mnemonicWallet.privateKey);

const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");

function generateAddressesFromSeed(mnemonic, count) {
  let seed = bip39.mnemonicToSeedSync(mnemonic).toString("hex");
  let hdwallet = hdkey.fromMasterSeed(seed);
  let wallet_hdpath = "m/44'/60'/0'/0";

  let accounts = [];
  for (let i = 0; i < count; i++) {
    let wallet = hdwallet.derivePath(wallet_hdpath + (i + 1)).getWallet();
    let address = "0x" + wallet.getAddress().toString("hex");
    let privateKey = wallet.getPrivateKey().toString("hex");
    accounts.push({ address: address, privateKey: privateKey });
  }
  return accounts;
}
const mnemonic =
  "able cable venue sphere joke strike fruit trigger absurd divide since trap";
const count = 1;
const result = generateAddressesFromSeed(mnemonic, count);

console.log(result);
