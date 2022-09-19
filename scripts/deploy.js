// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  await hre.run("compile");

  /* NFTMintContract Deployment */
  const ERC721Token = await hre.thor.getContractFactory("NFT");
  const erc721Token = await ERC721Token.deploy(
    "0xD848C998a36c05A0afE48f0E6Bfa40232a94Fd9B"
  );

  await erc721Token.deployed();

  console.log("NFTMint deployed to: ", erc721Token.address);

  const ERC721Factory = await hre.thor.getContractFactory("ERC721Factory");
  const erc721Factory = await ERC721Factory.deploy();

  await erc721Factory.deployed();

  console.log("NFTMint deployed to: ", erc721Factory.address);

  fs.writeFileSync(
    "./status.json",
    JSON.stringify(
      {
        nftAddress: erc721Token.address,
      },
      "",
      2
    )
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
