import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({
  url,
  message,
  timestamp,
  addressFrom,
  amount,
  addressTo,
  keyword,
}) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      flex-col p-3 rounded-md hover:shadow-2xl
    ">
      <div className="flex flex-col items-center w-full mt-3">
        <div className=" w-full mb-6 p-2">
          <a
            href={`https:sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer">
            <p className="text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a
            href={`https:sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer">
            <p className="text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-base">Amount: {amount}</p>
          {message && (
            <>
              <br />
              <p className="text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />

        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37C7DA] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-3xl text-center my-2">Latest Transactions</h3>
        ) : (
          <h3 className="text-3xl text-center my-2">
            Connect your account to see latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions
            .slice()
            .reverse()
            .map((transaction, index) => (
              // using prarenthesis instantantly returns the content, curly braces would require explicit "return"
              // return <TransactionCard key={index} {...transaction} />
              <TransactionCard key={index} {...transaction} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
