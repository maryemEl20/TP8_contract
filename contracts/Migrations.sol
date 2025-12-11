// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    constructor() {
        owner = msg.sender;
    }

    function setCompleted(uint completed) public {
        require(msg.sender == owner, "Only owner can set completion");
        last_completed_migration = completed;
    }
}
