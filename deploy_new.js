//设置web3连接
var Web3 = require('web3');
//http://localhost:7545 为Ganache提供的节点链接
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8540'));
//读取合约
var fs = require('fs');
var contractCode = fs.readFileSync('GUUT.sol').toString();
//编译合约代码
var solc = require('solc');
var compileCode = solc.compile(contractCode);

console.log(compileCode);

//获取合约abi和字节码
var abi = JSON.parse(compileCode.contracts[':GUUT'].interface);
var byteCode = compileCode.contracts[':GUUT'].bytecode;

console.log(web3.eth.getBlock("pending").gasLimit)
console.log(web3.eth.estimateGas({
    data: "0x" + byteCode
}))

// 4712388
// 2422419
// 2000000

//创建合约对象
var GUUTContract = web3.eth.contract(abi);
//部署合约，并返回部署对象
var deployedContract = GUUTContract.new({
    data: "0x" + byteCode,
    from: web3.eth.accounts[0], //部署合约的外部账户地址
    gas: 4000000 //部署合约的矿工费
});
console.log(deployedContract);