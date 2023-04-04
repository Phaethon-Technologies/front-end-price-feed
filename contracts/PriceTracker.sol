// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./PriceConsumerV3.sol";

contract PriceTracker {
    PriceConsumerV3 public priceConsumer;

    constructor(address _priceConsumer) {
        priceConsumer = PriceConsumerV3(_priceConsumer);
    }

    function getLatestDaiPrice() external view returns (int) {
        return priceConsumer.getLatestPricedai();
    }

     function getLatestUsdcPrice() external view returns (int) {
        return priceConsumer.getLatestPriceusdc();
    }
}
