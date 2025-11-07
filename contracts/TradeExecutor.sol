// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title TradeExecutor - secured trading executor for bot-controlled trades
contract TradeExecutor is Ownable, ReentrancyGuard {
    mapping(address => bool) public executors;
    bool public paused;

    event ExecutorAdded(address indexed executor);
    event ExecutorRemoved(address indexed executor);
    event TradeExecuted(
        address indexed executor,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        bytes metadata
    );
    event Paused();
    event Unpaused();

    modifier onlyExecutor() {
        require(executors[msg.sender], "Not authorized executor");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract paused");
        _;
    }

    constructor() Ownable(msg.sender) {}

    // --- Access control ---

    function setExecutor(address exec, bool allowed) external onlyOwner {
        executors[exec] = allowed;
        if (allowed) emit ExecutorAdded(exec);
        else emit ExecutorRemoved(exec);
    }

    function pause() external onlyOwner {
        paused = true;
        emit Paused();
    }

    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused();
    }

    // --- Core logic ---

    /// @notice Execute trade (dummy placeholder)
    /// @dev Replace this with integration to a DEX (e.g. Uniswap router).
    function executeTrade(
        address tokenIn,
        address tokenOut,
        address recipient,
        uint256 amountIn,
        bytes calldata metadata
    ) external nonReentrant onlyExecutor whenNotPaused returns (bool) {
        require(tokenIn != address(0), "Invalid tokenIn");
        require(recipient != address(0), "Invalid recipient");
        require(amountIn > 0, "Amount must be > 0");

        bool success = IERC20(tokenIn).transferFrom(msg.sender, recipient, amountIn);
        require(success, "Transfer failed");

        emit TradeExecuted(msg.sender, tokenIn, tokenOut, amountIn, metadata);
        return true;
    }
}
