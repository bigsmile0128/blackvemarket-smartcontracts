pragma solidity ^0.8.16;

contract Contract {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function echo(string memory input) public view returns (string memory) {
        string memory output = input;
        return output;
    }
}