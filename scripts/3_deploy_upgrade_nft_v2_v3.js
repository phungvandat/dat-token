const { ethers, upgrades } = require("hardhat");

async function main() {
    const nftMarketV1Address = '0x000';
    const NFTMarketV2 = await ethers.getContractFactory("NFTMarket2");
    const nftMarket2 = await upgrades.upgradeProxy(nftMarketV1Address, NFTMarketV2);
    console.log("nftMarket upgraded to v2 address:", nftMarket2.address);

    const NFTMarket3 = await ethers.getContractFactory("NFTMarket3");
    const nftMarket3  = await upgrades.upgradeProxy(nftMarket2.address, NFTMarket3)
    console.log("nftMarket upgraded to v3 address:", nftMarket3.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
