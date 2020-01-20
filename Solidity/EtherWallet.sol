pragma solidity ^0.5.4;

contract EtherWallet {
    address payable public owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function deposit() payable public {
        
    }

    function send(address payable to, uint amount) public {
        require(msg.sender == owner, 'Devi essere owner');
        to.transfer(amount);
    }
    
    function balanceOf() view public returns(uint) {
        return address(this).balance;
    }
} 