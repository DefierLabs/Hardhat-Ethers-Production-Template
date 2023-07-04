pragma solidity >=0.8.4;

import { IERC20 } from "@openzeppelin/contracts-0.8/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts-0.8/access/Ownable.sol";

// import { console } from "hardhat/console.sol";

contract Example is Ownable {
    constructor() public {}

    receive() external payable {}

    fallback() external payable {}

    function start() public {}
}
