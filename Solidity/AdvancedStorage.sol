pragma solidity ^0.5.4;

contract AdvancedStorage {
    uint[] public ids;
    mapping(uint => bool) id;
    function set(uint _ids) external {
        ids.push(_ids);
    }
    
    function get(uint _ids) external view returns(uint) {
        
        return ids[_ids];
    }
    
    function getAll() external view returns(uint[] memory) {
        return ids;
    }
    
    function lenght() external view returns(uint) {
        return ids.length;
    }
}