const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

async function main() {
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await upgrades.deployProxy(NFTMarket);
    await nftMarket.deployed();
    console.log("nftMarket deployed address:", nftMarket.address);

    const NFT = await hre.ethers.getContractFactory("NFT");
    const nft = await upgrades.deployProxy(NFT, [nftMarket.address]);
    await nft.deployed();
    console.log("nft deployed address:", nft.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
