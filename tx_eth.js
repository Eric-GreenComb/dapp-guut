var Web3 = require("web3");
var Tx = require('ethereumjs-tx');

var web3 = new Web3();

// 连接测试网络
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8540"));

// 转账
var _from = "0x762009cd5dcabb5a125008d70f5efdbdff2aa782";
var _fromPk = "fc3d494d1a1c478e393cf2adf5eb72664b8be9a3ca335e751b504d0b2f429bc3";
var _to = "0xcb848cdb40b3728e3ec670157541d8a8f12d7f1f";

//转账数量
var _value = 5 * Math.pow(10, 18)

//单位转换示例
var balance = web3.eth.getBalance(_from);
console.info("balance of holder in wei is : " + balance.toString());
console.info("balance of holder in gwei is : " + web3.fromWei(balance, 'gwei'));
console.info("balance of holder in finney is : " + web3.fromWei(balance, 'finney'));
console.info("balance of holder in ether is : " + web3.fromWei(balance, 'ether'));

var balance = web3.eth.getBalance(_to);
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

//私钥
var _privKey = new Buffer(_fromPk, 'hex');

var _value = "1000";
var value = web3.toWei(_value, 'ether');
console.log("toWei", value); // "1000000000000000000"
//交易信息
var _rawTransaction = {
    "from": _from,
    "to": _to,
    "nonce": web3.toHex(count),
    "gasPrice": web3.toHex(gasPrice),
    "gasLimit": web3.toHex(gasLimit),
    "value": web3.toHex(value),
    "chainId": 0x31d7
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
