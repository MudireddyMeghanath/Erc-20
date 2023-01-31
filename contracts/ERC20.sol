// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GLDToken is Ownable,ERC20 {
    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 1000000000*(10**uint256(decimals())));
    }
    function mint(address account,uint256 amount) public onlyOwner returns(bool){
        require(account!=address(this) && amount!= uint256(0),"cannot");
        _mint(account,amount);
        return true;
    }
      function burn(address account,uint256 amount) public onlyOwner returns(bool){
        require(account!=address(this) && amount!= uint256(0),"cannot burn");
        _burn(account,amount);
        return true;
      }
        function buy() public payable returns(bool){
            require(msg.sender.balance>=msg.value&& msg.value!=0,"hello");
            uint amount=msg.value*1000;
            _transfer(owner(),_msgSender(),amount);
            return true;
        }
        function width(uint256 amount) public onlyOwner returns(bool){
            require(amount<=address(this).balance,"hello");
            payable(_msgSender()).transfer(amount);
            return true;
        }
    
   
}