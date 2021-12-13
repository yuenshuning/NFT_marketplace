pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract CryptoBird is ERC721Connector {

    // array
    string [] public cryptoBirds;

    mapping(string => bool) _cryptoBirdsExists;

    function mint(string memory _cryptoBird) public {

        require(!_cryptoBirdsExists[_cryptoBird], 'Error - already exists');
        cryptoBirds.push(_cryptoBird);
        uint _id = cryptoBirds.length - 1;

        _mint(msg.sender, _id);

        _cryptoBirdsExists[_cryptoBird] = true;

    }

    constructor() ERC721Connector('CryptoBird','CBIRDS'){}

}


