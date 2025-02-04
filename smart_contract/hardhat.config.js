require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/6CHy2pWbD1dYDF7GRYtnqOqQ6mL5MKqP", // sepolia test net https key from alchemy
      accounts: [
        "91122304bfc37a796040c6c203c4a04ea40015cbcbd2d6bfc6026524529dc6ee", // sepolia network private key frokm metamask
      ],
    },
  },
};
