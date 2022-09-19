// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "./royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "./royalties/contracts/LibPart.sol";
import "./royalties/contracts/LibRoyaltiesV2.sol";

contract NFT is ERC721URIStorage, ERC721Enumerable, RoyaltiesV2Impl {
    using Counters for Counters.Counter;
    Counters.Counter private nftTokenId;

    address contractAddress;

    constructor(address marketplaceAddress, string memory _name, string memory _symbol) {
        ERC721(_name, _symbol)
        contractAddress = marketplaceAddress;
    }
 
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    /// @notice Returns a token's URI
    /// @dev See {IERC721Metadata-tokenURI}.
    /// @param tokenId - the id of the token whose URI to return
    /// @return a string containing an URI pointing to the token's ressource
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function createNFtToken(string memory nftTokenURl)
        public
        returns (uint256)
    {
        nftTokenId.increment();
        uint256 id = nftTokenId.current();
        _mint(msg.sender, id);

        _setTokenURI(id, nftTokenURl);

        setApprovalForAll(contractAddress, true);

        return id;
    }

    //configure royalties
    function setRoyalties(
        uint256 _tokenId,
        address payable _royaltiesRecipientAddress,
        uint96 _percentageBasisPoints
    ) public {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesRecipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721,ERC721Enumerable)
        returns (bool)
    {
        if (interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }

        if (interfaceId == _INTERFACE_ID_ERC2981) {
            return true;
        }

        return super.supportsInterface(interfaceId);
    }

    //ُTransfate nft after

    function transferToken(
        address from,
        address to,
        uint256 tokenId
    ) external {
        require(ownerOf(tokenId) == from, "From address must be token owner");
        _transfer(from, to, tokenId);
    }

    function getContractAddress() public view returns (address) {
        return contractAddress;
    }
}
