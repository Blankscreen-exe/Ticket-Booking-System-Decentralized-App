import React, { useState, useEffect } from "react";
import { getMetaMask } from "../helpers";
import detectEthereumProvider from '@metamask/detect-provider';

function Home() {
  let isMetaMask = getMetaMask();

  const [hasProvider, setHasProvider] = useState(null)
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))
    }

    getProvider()
  }, [])
  console.log(wallet)
  const handleConnect = async () => {
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      updateWallet(accounts);
    } catch (e) {
      console.log(e);
      console.log("Connection failed")
      document.getElementById("connection-status").innerHTML = "Connection Failed";
    }
  };

  return (
    <>
      <div>home</div>
      {isMetaMask ? (
        <button onClick={handleConnect}>Connect MetaMask</button>
      ) : (
        <em class="text-warning">MetaMask Connected</em>
      )}

      {
      wallet.accounts.length > 0 
      ? (<div>Active Account: {wallet.accounts[0]}</div>)
      : (<div><strong id="connection-status"></strong></div>)
      }

      { wallet.accounts.length != 0 ?
      <div>
      <h2>Accounts In Your Wallet</h2>
      <ol>
        {
          wallet.accounts.map( (item, index) => {
            return <li id={`${index}`}>{item}</li>
          })
        }
      </ol>
      </div>
      : 
      <em class="text-light">Your accounts will be shown here</em>
      }

    </>
  );
}

export default Home;
