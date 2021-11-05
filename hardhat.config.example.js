require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY = "abc";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: "url",
      accounts: [PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
      confirmations: 2,
      timeoutBlocks: 200000000,
      skipDryRun: true
    }
  },
  etherscan: {
    apiKey: "apikey"
  }
};
