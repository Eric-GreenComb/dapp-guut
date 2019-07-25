//设置web3连接
var Web3 = require('web3');
//http://localhost:7545 为Ganache提供的节点链接
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8540'));
//读取合约
// var fs = require('fs');
// var contractCode = fs.readFileSync('Hello.sol').toString();
//编译合约代码
// var solc = require('solc');
// var compileCode = solc.compile(contractCode);
//获取合约abi和字节码
// var abi = JSON.parse(compileCode.contracts[':Hello'].interface);
// var byteCode = compileCode.contracts[':Hello'].bytecode;

var abi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_receivers","type":"address[]"},{"name":"_value","type":"uint256"}],"name":"batchTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

var contractAddress = "0xbf18f3937e733e284ce1348f71d94ffda71ba5cb";

var currentAccount = "0x762009cd5dcabb5a125008d70f5efdbdff2aa782"

//单位转换示例
var balance = web3.eth.getBalance(currentAccount);
console.info("balance of holder in ether is : " + web3.fromWei(balance, 'ether'));

var balance = web3.eth.getBalance("0x008b7b778ae54d339df2455a554be8ab46e7553c");
console.info("balance of holder in ether is : " + web3.fromWei(balance, 'ether'));

//创建合约对象
var GUUTContract = web3.eth.contract(abi);
// 0x18731376d0c12dba804f8e2182af2c596f3f8471 为 deploy 返回的 hash 合约部署地址
var contractInstance = GUUTContract.at(contractAddress);

var balance = contractInstance.balanceOf.call(currentAccount);
var value = web3.fromWei(balance.toString(10), 'ether');
console.log(value); // '50000000000'

let guut = web3.eth.contract(abi).at(contractAddress)
var balance = guut.balanceOf(currentAccount);
var value = web3.fromWei(balance.toString(10), 'ether');
console.log(value); // '50000000000'

var _to = "0x008b7b778ae54d339df2455a554be8ab46e7553c";
var balance = guut.balanceOf(_to);
var value = web3.fromWei(balance.toString(10), 'ether');
console.log(value); // '50000000000'

var _to = "0x571ac5c2fb70d8553b593b1efb4a2524e01bb3e6";
var balance = guut.balanceOf(_to);
var value = web3.fromWei(balance.toString(10), 'ether');
console.log(value); // '50000000000'
