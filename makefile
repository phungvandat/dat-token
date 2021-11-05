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
	npx hardhat run scripts/1_deploy_dat_token.js --network ropsten

help:
	npx hardhat help

verify:
	npx hardhat verify --network ropsten Addr1