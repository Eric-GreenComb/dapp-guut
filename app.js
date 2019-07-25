var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8540"));

var version = web3.version.api;
console.log("api:", version); // "0.20.7"

var version = web3.version.node;
console.log("node:", version); // "Geth/v1.8.22-omnibus-260f7fbd/linux-amd64/go1.11.1"

var version = web3.version.network;
console.log("network:", version); // 1

// var _ethereum = web3.version.ethereum;
// console.log(_ethereum); // 60

if (!web3.isConnected()) {
    console.log("isNotConnected");
} else {
    console.log("isConnected");
}

// var hash = web3.sha3("Some string to be hashed");
// console.log(hash); // "0xed973b234cf2238052c9ac87072c71bcf33abc1bbd721018e0cca448ef79b379"

// var hashOfHash = web3.sha3(hash, { encoding: 'hex' });
// console.log(hashOfHash); // "0x85dd39c91a64167ba20732b228251e67caed1462d4bcf036af88dc6856d0fdcc"

// var str = web3.toHex({ test: 'test' });
// console.log(str); // '0x7b2274657374223a2274657374227d'

// var str = web3.toAscii("0x657468657265756d000000000000000000000000000000000000000000000000");
// console.log(str); // "ethereum"

// var str = web3.fromAscii('ethereum');
// console.log(str); // "0x657468657265756d"

// var str2 = web3.fromAscii('ethereum', 32);
// console.log(str2); // "0x657468657265756d000000000000000000000000000000000000000000000000"

// var number = web3.toDecimal('0x15');
// console.log(number); // 21

// var value = web3.fromDecimal('21');
// console.log(value); // "0x15"

var value = web3.fromWei('21000000000000', 'finney');
console.log("from finney", value); // "0.021"

var value = web3.toWei('1', 'ether');
console.log("toWei", value); // "1000000000000000000"

var value = web3.toWei('100000000000', 'ether');
console.log("toWei", value); // "1000000000000000000"

// var value = web3.toBigNumber('200000000000000000000001');
// console.log(value); // instanceOf BigNumber
// console.log(value.toNumber()); // 2.0000000000000002e+23
// console.log(value.toString(10)); // '200000000000000000000001'

var isAddress = web3.isAddress("0x8888f1f195afa192cfee860698584c030f4c9db1");
console.log("isAddress", isAddress); // true

// var listening = web3.net.listening;
// console.log("listening", listening); // true of false

// var peerCount = web3.net.peerCount;
// console.log("peerCount", peerCount); // 4

// var defaultAccount = web3.eth.defaultAccount;
// console.log("defaultAccount", defaultAccount); // ''

// var defaultBlock = web3.eth.defaultBlock;
// console.log(defaultBlock); // 'latest'

// var sync = web3.eth.syncing;
// console.log(sync);

// var coinbase = web3.eth.coinbase;
// console.log(coinbase); // "0x407d73d8a49eeb85d32cf465507dd71d507100c1"

// var mining = web3.eth.mining;
// console.log(mining); // true or false

// var hashrate = web3.eth.hashrate;
// console.log(hashrate); // 493736

// var gasPrice = web3.eth.gasPrice;
// console.log(gasPrice.toString(10)); // "10000000000000"

// var accounts = web3.eth.accounts;
// console.log("accounts", accounts); // ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"] 

var number = web3.eth.blockNumber;
console.log("blockNumber", number); // 2744

var balance = web3.eth.getBalance("0x762009cd5dcabb5a125008d70f5efdbdff2aa782");
console.log(balance); // instanceof BigNumber
console.log(balance.toString(10)); // '49857606706372300'
console.log(balance.toNumber()); // 49857606706372300

// var state = web3.eth.getStorageAt("0xee93d9beeec1a52c23da84b38156197e0cca7c87", 0);
// console.log(state); // "0x03"

// var code = web3.eth.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8");
// console.log(code); // "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"

// var info = web3.eth.getBlock(0);
// console.log(info);

// compiled solidity source code using https://chriseth.github.io/cpp-ethereum/
// var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

// web3.eth.sendTransaction({data: code}, function(err, transactionHash) {
//   if (!err)
//     console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
// });

// var number = web3.eth.getCompilers();
// console.log(number); // ["lll", "solidity", "serpent"]

// web3.db.putString('testDB', 'key', 'myString') // true

// var value = web3.db.getString('testDB', 'key');
// console.log(value); // "myString"