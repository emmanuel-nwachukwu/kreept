import { useContext } from "react";

// import { AiFillAlipayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";
import { shortenAddress } from "../utils/shortenAddress";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full !rounded-sm p-2 outline-none bg-transparent  text-sm white-glassmorphism !border-none"
  />
);

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    isLoading,
  } = useContext(TransactionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;

    if (!addressTo || !amount || !keyword || !message) return;

    await sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="sm:text-5xl text-3xl text-gradient py-1">
            Send Crypto
            <br />
            across the world
          </h1>
          <p className="text-left mt-5 font-light font md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies.
          </p>

          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-blue-700">
              <p className="text-base font-semibold">Connect Wallet</p>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={commonStyles}>Etherum</div>
            <div className={commonStyles}>Web 3.0</div>
            <div className={commonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} />
                </div>
                <BsInfoCircle fontSize={17} />
              </div>
              <div>
                <p className="font-light text-sm">
                  {!currentAccount ? "Account" : shortenAddress(currentAccount)}
                </p>
                <p className="font-semibold text-lg">Ethereum</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:w-96 w-full flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (GIF)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-blue-700 ">
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
