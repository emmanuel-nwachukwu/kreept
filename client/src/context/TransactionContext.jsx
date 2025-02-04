// import React, from "react";
import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import PropTypes from "prop-types";

import { contractABI, contractAddress } from "../utils/constants";

const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum); // for ethers v5
  // const provider = new ethers.BrowserProvider(ethereum); // for ethers v6
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  // console.log(transactionContract);

  return transactionContract;
};

const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    // console.log(formData);
  };

  const isMetaMaskInstalled = () => {
    if (!ethereum) {
      alert("Please install MetaMask");
      return false;
    }
    return true;
  };

  const getAllTransactions = async () => {
    try {
      if (!isMetaMaskInstalled()) return;

      const transactionContract = await getEthereumContract();

      const availableTransactions =
        await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      console.log(structuredTransactions);

      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);

      // throw new Error("No ethereum Object.");
    }
  };

  const checkWalletConnected = async () => {
    try {
      if (!isMetaMaskInstalled()) return;

      const accounts = await ethereum.request({ method: "eth_accounts" });

      // console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No Accounts Found.");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum Object.");
    }
  };

  const checkTransactionExist = async () => {
    try {
      const transactionContract = await getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum Object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!isMetaMaskInstalled()) return;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum Object.");
    }
  };

  const sendTransaction = async () => {
    // entire logic for sending and storing transaction

    try {
      if (!isMetaMaskInstalled()) return;

      // get the data from the form
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = await getEthereumContract();
      console.log(transactionContract);
      // const parsedAmount = ethers.parseEther(amount); //ethers v6
      const parsedAmount = ethers.utils.parseEther(amount); //ethers v5

      // send eth from one address to the other
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //21000 Gwei
            value: parsedAmount._hex,
          },
        ],
      });

      console.log("debugging");
      // To store transactions on thr blockchain
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(`loading - ${transactionHash.hash}`);
      await transactionHash.wait();

      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      window.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum Object.");
    }
  };

  useEffect(() => {
    checkWalletConnected();
    checkTransactionExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        handleChange,
        sendTransaction,
        isLoading,
        transactions,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};

// Props validation
TransactionProvider.propTypes = {
  children: PropTypes.node,
};

export { TransactionContext };
export default TransactionProvider;
