pragma solidity ^0.5.4;

contract Deed{
    address public lawyer;
    address payable public beneficiary;
    uint time;
    
    constructor(address payable _beneficiary, uint _time) payable public {
     lawyer = msg.sender;
     beneficiary = _beneficiary;
     time = _time + now;
    }
    
    function withdraw() public {
        require(msg.sender == lawyer, 'Devi essere owner');
        beneficiary.transfer(address(this).balance);
    }
    function balance() external view returns(uint){
        return address(this).balance;
    }
    function deposit() public payable {
        
    }
}