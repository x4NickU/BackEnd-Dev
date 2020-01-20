pragma solidity ^0.5.4;
// 1. Admin
// 2. Beneficiary
// 3. Numeri di payout
// 4. Intervallo tra i payout
// 5. Cifra a piacimento
// Admin -> Beneficiario -> Click withdraw(Only admin) -> Partono pagamenti ogni 10 secondi
contract DeedSplitPay {
    address public admin;
    address payable beneficiary;
    uint constant public payouts = 10;
    uint constant public payoutsInterval = 10;
    uint public amount;
    uint public paidPayouts;
    uint public startTime;
    
    constructor(address payable _beneficiary) payable public {
        require(msg.value > 0, 'Devi impostare money');
        admin = msg.sender;
        beneficiary = _beneficiary;
        amount = msg.value / payouts;
        startTime = now;
    }
    
    function balanceOf() public view returns(uint) {
        return address(this).balance;
    }
    
    function withdraw() public {
        require(msg.sender == admin,'Solo admin strunz');
        require(paidPayouts < payouts,'Già invitato tutti i sordi');
        uint payoutsCount = (now - startTime) / payoutsInterval; // 100/10 = 10
        uint payoutsGood = payoutsCount - paidPayouts; //10
        payoutsGood = payoutsGood + paidPayouts > payouts ? payouts - paidPayouts : payoutsGood;
        paidPayouts += payoutsGood;
        beneficiary.transfer(amount * payoutsGood);
        
    }
}