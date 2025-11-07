// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleOrderBook {
    struct Order {
        address owner;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 timestamp;
        bool active;
    }

    Order[] public orders;
    event OrderPlaced(uint256 indexed id, address indexed owner);
    event OrderCancelled(uint256 indexed id, address indexed owner);

    function placeOrder(address tokenIn, address tokenOut, uint256 amountIn) external returns (uint256) {
        orders.push(Order({
            owner: msg.sender,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            amountIn: amountIn,
            timestamp: block.timestamp,
            active: true
        }));
        uint256 id = orders.length - 1;
        emit OrderPlaced(id, msg.sender);
        return id;
    }

    function cancelOrder(uint256 id) external {
        require(id < orders.length, "invalid id");
        Order storage o = orders[id];
        require(o.owner == msg.sender, "not owner");
        require(o.active, "not active");
        o.active = false;
        emit OrderCancelled(id, msg.sender);
    }

    function getOrderCount() external view returns (uint256) {
        return orders.length;
    }
}
