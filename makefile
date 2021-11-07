.PHONY: test

test:
	npx hardhat test

accounts:
	npx hardhat accounts

compile:
	npx hardhat compile

clean:
	npx hardhat clean

node:
	npx hardhat node

local-deploy:
	npx hardhat run --network localhost scripts/deploy.js

deploy:
	npx hardhat run scripts/6_deploy_nft_v6.js --network rinkeby

help:
	npx hardhat help

verify:
	npx hardhat verify --show-stack-traces --network ropsten Addr1