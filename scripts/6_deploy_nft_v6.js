const { ethers, upgrades } = require("hardhat");

async function main() {
    const nftMarketV3Address = 'xyz';
    const NFTMarket6 = await ethers.getContractFactory("NFTMarket6");
    const nftMarket6  = await upgrades.upgradeProxy(nftMarketV3Address, NFTMarket6, {
        unsafeAllow: ['delegatecall']
    })
    console.log("nftMarket upgraded to v6 address:", nftMarket6.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
