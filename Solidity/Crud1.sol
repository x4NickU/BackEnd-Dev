pragma solidity ^0.5.4;

contract Crud1 {
    struct User {
        uint id;
        string name;
    }
    User[] public users;
    uint public nextId = 1;
    
    function create(string memory _name) public {
        users.push(User(nextId, _name));
        nextId++;
    }
    
    function update(uint _id, string calldata _name) external {
        uint i = find(_id);
        users[i].name = _name;
    }
    
    function read(uint _id) view external returns(string memory name) {
        uint i = find(_id);
        return users[i].name;
    }
    
    function destroy(uint _id) external {
        uint i = find(_id);
        delete users[i];
    }
    
    function find(uint _id) view internal returns(uint) {
        for(uint i = 0; i < users.length; i++) {
            if(users[i].id == _id) {
                return i;
            }
        }
        revert("User non esiste!");
    }
}