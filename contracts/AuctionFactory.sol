// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import { Auction } from './Auction.sol';

contract AuctionFactory {
    address[] public auctions;

    event AuctionCreated(address auctionContract, address owner, uint numAuctions, address[] allAuctions);

    constructor () {}

    function createAuction(uint bidIncrement, uint startBlock, uint endBlock, string memory ipfsHash) public{
        Auction newAuction = new Auction(msg.sender, bidIncrement, startBlock, endBlock, ipfsHash);
        auctions.push(newAuction);

        AuctionCreated(newAuction, msg.sender, auctions.length, auctions);
    }

    function allAuctions() public returns (address[] memory) {
        return auctions;
    }
}