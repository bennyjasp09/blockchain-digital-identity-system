// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    mapping(address => string) private identities;

    function createIdentity(string memory did) public {
        identities[msg.sender] = did;
    }

    function getIdentity(address user) public view returns (string memory) {
        return identities[user];
    }
}
