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
	npx hardhat run scripts/deploy.js --network ropsten

help:
	npx hardhat help

verify:
	npx hardhat verify --network ropsten Address1 Address2