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
	node scripts/sample-script.js

help:
	npx hardhat help