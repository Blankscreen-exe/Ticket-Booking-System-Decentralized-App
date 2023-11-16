import Web3 from 'web3';
import EventManagementContract from '../../build/contracts/EventManagement.json';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        resolve(web3);
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        reject('Non-Ethereum browser detected');
      }
    });
  });

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = EventManagementContract.networks[networkId];
  return new web3.eth.Contract(
    EventManagementContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
};

export { getWeb3, getContract };
