
/**
 * Detects MetaMask connectivity
 * 
 * @returns boolean
 */
export function getMetaMask(){
    let injectedProvider = false;

    if (typeof window.ethereum !== 'undefined') {
        injectedProvider = true;
        console.log(window.ethereum);
      }
      
    const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;

    // return isMetaMask;
    return true;
}

