// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3  {
    AggregatorV3Interface internal priceFeeddai;
    AggregatorV3Interface internal priceFeedusdc;

  
    constructor() {
        priceFeeddai = AggregatorV3Interface(
            0x14866185B1962B63C3Ea9E03Bc1da838bab34C19
        );
        priceFeedusdc = AggregatorV3Interface(
            0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E
        );
    }

    function getLatestPricedai() external view returns (int) {
        (
            ,
            int price,
            ,
            ,
        ) = priceFeeddai.latestRoundData();
       return price;
    }

    function getLatestPriceusdc() external view returns (int) {
        (
            ,
            int price,
            ,
            ,
        ) = priceFeedusdc.latestRoundData();
       return price;
    }

}
