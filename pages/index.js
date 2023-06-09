import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MarketAddress, MarketAddressABI } from '../content/constant';
import Web3 from 'web3';
export default function Home() {
  const [daiPrice, setDaiPrice] = useState(null);
  const [usdcPrice, setUsdcPrice] = useState(null);
  const [currentAccount, setCurrentAccount] = useState([]);

  useEffect(() => {
    fetchDaiandUsdcPrice();
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const web3p = new Web3(window.ethereum)
    const accounts = await web3p.eth.getAccounts();
    console.log("total acc",accounts)
    setCurrentAccount(accounts[0]);
  };

  const fetchDaiandUsdcPrice = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = MarketAddress;
    const contractABI = MarketAddressABI;
    const myContract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const latestPricedai = await myContract.getLatestDaiPrice(
      '0x14866185B1962B63C3Ea9E03Bc1da838bab34C19'
    );
    setDaiPrice(latestPricedai);
    const latestPriceusdc = await myContract.getLatestUsdcPrice(
      '0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E'
    );
    setUsdcPrice(latestPriceusdc);
  };

  return (
    <>
      <h1>USDC AND DAI PRICE FEED</h1>
      <div>
        {currentAccount !== null && (
          <p>Current account: {currentAccount}</p>
        )}
      </div>
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
