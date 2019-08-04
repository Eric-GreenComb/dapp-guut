var Web3 = require("web3");
var Tx = require('ethereumjs-tx');

var web3 = new Web3();

// 连接测试网络
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8540"));

var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_receivers","type":"address[]"},{"name":"_value","type":"uint256"}],"name":"batchTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

// 转账
var _from = "0x762009cd5dcabb5a125008d70f5efdbdff2aa782";
var _fromPk = "fc3d494d1a1c478e393cf2adf5eb72664b8be9a3ca335e751b504d0b2f429bc3";
var _to = "0x008b7b778ae54d339df2455a554be8ab46e7553c";

//转账数量
var _value = 5 * Math.pow(10, 18)

//单位转换示例
var balance = web3.eth.getBalance(_from);
console.info("balance of holder in wei is : " + balance.toString());
console.info("balance of holder in gwei is : " + web3.fromWei(balance, 'gwei'));
console.info("balance of holder in finney is : " + web3.fromWei(balance, 'finney'));
console.info("balance of holder in ether is : " + web3.fromWei(balance, 'ether'));

//当前的gas价格。这个值由最近几个块的gas价格的中值决定
var gasPrice = web3.eth.gasPrice;
//console.log("gasPrice in wei is : " +gasPrice.toString(10)); // "10000000000000"
//console.log("gasPrice in gwei is : " + web3.fromWei(gasPrice.toString(10), 'gwei'));
var gasLimit = 100000;

//获取nonce
var count = web3.eth.getTransactionCount(_from);
console.log("transaction count of holder is : " + count); // 1

var _contractAddress = "0x43876ea3ae547e3bfd6d4a26cf1319dce68dad31";

var TokenContract = web3.eth.contract(abi).at(_contractAddress)
var _decimal = TokenContract.decimals();
var _balance = TokenContract.balanceOf(_from);
var _tokenName = TokenContract.name();
var _tokenSymbol = TokenContract.symbol();
console.info("tokenSymbol: " + _tokenSymbol);
console.info("tokenName: " + _tokenName);
console.info("balance in wei: " + _balance);
var _value = web3.fromWei(_balance, 'ether');
console.info("balance in eth: " + _value);
console.info("decimal: " + _decimal);

var _balance = TokenContract.balanceOf(_to);
console.info("balance in wei: " + _balance);
var _value = web3.fromWei(_balance, 'ether');
console.info("balance in eth: " + _value);
console.info("decimal: " + _decimal);

var _value = "100";
var value = web3.toWei(_value, 'ether');
console.log("toWei", value); // "1000000000000000000"

//私钥
var _privKey = new Buffer(_fromPk, 'hex');
//交易信息
var _rawTransaction = {
    "from": _from,
    "nonce": web3.toHex(count),
    "gasPrice": web3.toHex(gasPrice),
    "gasLimit": web3.toHex(gasLimit),
    "to": _contractAddress,
    "value": "0x0",
    "data": TokenContract.freezeAccount.getData(_to, false)
};

//实例交易
var tx = new Tx(_rawTransaction);
//私钥交易签名
tx.sign(_privKey);
//交易发送前实例化
var serializedTx = tx.serialize();
//发送交易，留下hash
web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
    if (!err) {
        console.log(hash);
    } else {
        console.log(err);
    }
});