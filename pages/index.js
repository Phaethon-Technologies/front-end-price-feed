import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MarketAddress, MarketAddressABI } from '../content/constant';

export default function Home() {
  const [daiPrice, setDaiPrice] = useState(null);

  const [usdcPrice, setUsdcPrice] = useState(null)

useEffect(() => {
  fetchDaiandUsdcPrice() 
})

  const fetchDaiandUsdcPrice = async () => {
    
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = MarketAddress; 
      const contractABI = MarketAddressABI; 
      console.log(contractABI)
      const myContract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      const latestPricedai = await myContract.getLatestDaiPrice();
      setDaiPrice(latestPricedai);
      const latestPriceusdc = await myContract.getLatestUsdcPrice();
      setUsdcPrice(latestPriceusdc);
    
  };
  
  return (
  
    <>
     
    <h1>USDC AND DAI PRICE FEED</h1>
    {/* <button onClick={fetchDaiPrice}>
      Get data
     </button> */}
    <div>
      {daiPrice !== null ? (
        <p>Latest DAI price: {daiPrice.toString()}</p>
        ) : (
          <p>Loading...</p>
          )}
    </div>
    <div>
      {usdcPrice !== null ? (
        <p>Latest USDC price: {usdcPrice.toString()}</p>
        ) : (
          <p>Loading...</p>
          )}
    </div>
  </>
  );
}
