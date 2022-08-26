//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Messenger {
    event newMessage(string message, address sender);

    string private message;

    constructor(string memory _msg) {
        console.log("Deploying a Greeter with greeting:", _msg);
        message = _msg;
    }

    function giveMessage() public view returns (string memory) {
        return message;
    }

    function writeMessage(string calldata _msg) external {
        console.log("Changing greeting from '%s' to '%s'", message, _msg);
        message = _msg;
        emit newMessage(_msg, msg.sender);
    }

    // function greetingsAvailable() public returns (string memory,string memory, string memory){
    //     return ("Morning sunshine", "Good day", "Have a nice night");
    // }
}
