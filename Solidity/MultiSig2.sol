pragma solidity ^0.5.4;

//1. Portafoglio
//2. Pagamento:
  //1. Crea pagamenti(id,amount,address to, sent,approvals)
  //2. Spedisce pagamenti
  //3. Se le conferme sono oltre un tot
//3. Approvatori: array di approvatori(admin) , quota di tenuta da parte del contratto
//4. Usare struct per trasferire e mapping per gestire array + transfer;

contract MultiSig2 {
    uint public quota;
    address[] public approvers;
    struct Transfer {
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }
    mapping(address => mapping(uint => bool)) approvals;
    mapping(uint => Transfer) transfer;
    uint nextId;
    
    constructor(address[] memory _approvers, uint _quota) payable public {
        approvers = _approvers;
        quota = _quota;
    }
    
    function createTransfer(uint _amount, address payable _to) onlyApprover() external {
        transfer[nextId] = Transfer(
            nextId,
            _amount,
            _to,
            0,
            false
        );
        nextId++;
    }
    
    function sendTransfer(uint id) onlyApprover() external {
        require(transfer[id].sent == false,'è gia stata inviata');
        if(approvals[msg.sender][id] == false) {
            approvals[msg.sender][id] = true;
            transfer[id].approvals++;
        }
        if(transfer[id].approvals >= quota) {
            address payable to = transfer[id].to;
            transfer[id].sent = true;
            uint amount = transfer[id].amount;
            to.transfer(amount);
        }
    }
    
    modifier onlyApprover() {
        bool allowed = false;
        for (uint i = 0; i < approvers.length;i++) {
            if(approvers[i] == msg.sender) {
                allowed = true;
            }
        }
        require(allowed == true, 'Only allowed');
        _;
    }
}