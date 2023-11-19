import React, { useState } from "react";
import { getMetaMask } from "../helpers";

function home() {
  let isMetaMask = getMetaMask();

  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

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
      ? (<div>Wallet Accounts: {wallet.accounts[0]}</div>)
      : (<div><strong id="connection-status"></strong></div>)
      }
    </>
  );
}

export default home;
