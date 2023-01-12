import React,{useState, createContext} from "react";
import { ethers } from "ethers";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


const providerOptions = {
	binancechainwallet: {
		package: true
	  },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "765d4237ce7e4d999f706854d5b66fdc" // required
      }
    },
	  coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "BlockVoice", // Required
        infuraId: "765d4237ce7e4d999f706854d5b66fdc", // Required
        chainId: 80001, // Optional. It defaults to 1 if not provided
        darkMode: true // Optional. Use dark theme, defaults to false
      }
    },
};

const web3Modal = new Web3Modal({
  network: "mumbai",
  theme: "dark",
  cacheProvider: true,
  providerOptions 
});

export const Connect = createContext();

export const ConnectProvider = (props)=>{
    
    const [account, setAccount] = useState(null)
    const [contract, setContract] = useState({})
    const [provider, setProvider] = useState(null)
    const abi =  [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "hash",
            "type": "string"
          }
        ],
        "name": "PostAnswer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "hash",
            "type": "string"
          }
        ],
        "name": "PostComment",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "hash",
            "type": "string"
          }
        ],
        "name": "PostCreated",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_postId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_answer",
            "type": "string"
          }
        ],
        "name": "addanswer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_postId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_comment",
            "type": "string"
          }
        ],
        "name": "addcomment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          }
        ],
        "name": "createPost",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    
    const disconnect = async () => {
      await web3Modal.clearCachedProvider();
      setAccount(null);
      setContract({})
    };

    const connectWallet = async () => {
      try{
    const providerSelected = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(providerSelected)
    // const {chainid} = await provider.getNetwork();
    // if(chainid !== 80001){
    //   alert("Switch to Mumbai testnetwork")
    // }
    setProvider(provider)
    const accounts = await provider.listAccounts();
    if (accounts) setAccount(accounts[0]);
    // Get signer
    const signer = provider.getSigner()
    loadContract(signer)
    }catch(error){
      console.log(error)
    }}

    const loadContract = async (signer) => {
    const contract = new ethers.Contract("0xA8D09FDE15D8910e7f3e921778eB86a6DEde33a8", abi, signer)
    setContract(contract)
    
    };
    return(
        <Connect.Provider value={{account,connectWallet,contract,provider,disconnect,web3Modal}}>
            {props.children}
        </Connect.Provider>
    )
}
