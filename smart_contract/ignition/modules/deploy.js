// const hre = require("hardhat");
const { ethers } = require("hardhat");

const main = async () => {
  console.log("Deploying contract...");
  const transactionsFactory = await ethers.getContractFactory("Transactions");

  // console.log("factory", transactionsFactory);
  const transactionsContract = await transactionsFactory.deploy();

  console.log("Waiting for contract to deploy...");
  // await transactionsContract.deployed();
  // await transactionsContract.deployTransaction.wait();

  // console.log(transactionsContract);
  console.log(
    "Transactions contract deployed to:",
    transactionsContract.target
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error("Error in deployment:", error);
    process.exit(1);
  }
};

runMain();
