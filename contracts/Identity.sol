// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct User {
        string did;
        string name;
        string email;
        string phone;
        string dob; // Date of birth
    }

    mapping(address => User) private users;

    function createIdentity(string memory did, string memory name, string memory email, string memory phone, string memory dob) public {
        users[msg.sender] = User(did, name, email, phone, dob);
    }

    function getIdentity(address user) public view returns (string memory, string memory, string memory, string memory, string memory) {
        User memory userInfo = users[user];
        return (userInfo.did, userInfo.name, userInfo.email, userInfo.phone, userInfo.dob);
    }
}
