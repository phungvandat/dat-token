// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SafeMath.sol";

contract DATToken {
    using SafeMath for uint256;

    event Transfer(address indexed _from, address indexed _to, uint256 _tokens);
    event Approval(
        address indexed _tokenOwner,
        address indexed spender,
        uint256 _tokens
    );

    string public name = "DAT Token";
    string public symbol = "DAT";
    uint256 public totalSupply = 20000000;
    uint8 public constant decimals = 18;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    address public owner;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function balanceOf(address addr) public view returns (uint256) {
        return balances[addr];
    }

    function transfer(address receiver, uint256 numTokens)
        public
        returns (bool)
    {
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);

        emit Transfer(msg.sender, receiver, numTokens);

        return true;
    }

    function approve(address spender, uint256 numTokens) public returns (bool) {
        allowed[msg.sender][spender] = numTokens;

        emit Approval(msg.sender, spender, numTokens);

        return true;
    }

    function allowance(address _owner, address delegate)
        public
        view
        returns (uint256)
    {
        return allowed[_owner][delegate];
    }

    function transferFrom(
        address _owner,
        address buyer,
        uint256 numTokens
    ) public returns (bool) {
        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);

        emit Transfer(_owner, buyer, numTokens);

        return true;
    }
}
