const contractName = artifacts.require("contractName");
//contractName comes from the name of the json file in the abis folder.
//replace contractName with the names of your contracts

module.exports = async function(deployer) {
	//deploy contract
	await deployer.deploy(contractName)

	//assign contract into variable if needed
  const contractName = await contractName.deployed()

	//call functions needed to set up dapp using the variable created above
  //make sure to use the await keyword
};