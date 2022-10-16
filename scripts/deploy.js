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

  const [signer] = await hre.thor.getSigners();
  const provider = await hre.thor.getProvider();
  console.log(signer._address);
  console.log(await provider.getBalance(signer._address));

  /* NFTMintContract Deployment */
  const ERC721Mint = await hre.thor.getContractFactory("ERC721Mint");
  const erc721Mint = await ERC721Mint.deploy("Ganster NFT", "Gangster");

  await erc721Mint.deployed();

  console.log("ERC721Mint deployed to: ", erc721Mint.address);

  /* Fixed Price NFTMarketplace Deployment */
  const ERC721Factory = await hre.thor.getContractFactory("ERC721Factory");
  const erc721Factory = await ERC721Factory.deploy();

  await erc721Factory.deployed();

  console.log("ERC721Factory deployed to: ", erc721Factory.address);

  /* Auction Price NFTMarketplace Deployment */
  const Auction = await hre.thor.getContractFactory("Auction");
  const auction = await Auction.deploy(
    "0xFBCE93D28Dc0B6D06C772E7E48721161A5B895b8",
    1,
    1664740605,
    1664750727
  );

  await auction.deployed();

  console.log("Auction Contract deployed to: ", auction.address);

  fs.writeFileSync(
    "./status.json",
    JSON.stringify(
      {
        mintAddress: erc721Mint.address,
        nftFactoryAddress: erc721Factory.address,
        auctionAddress: auction.address,
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
