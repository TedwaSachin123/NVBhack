require("@nomiclabs/hardhat-waffle");
const metamask_private_key="paste_your_private_key_here";
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    // hardhat: {
    //   chainId: 1337
    // },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/paste_your_infura_id",
      accounts: [metamask_private_key]
    },
    polygon: {
      url: "https://polygon-mainnet.infura.io/v3/paste_your_infra_id",
      accounts: [metamask_private_key]
    }
  }
};