// var assert = require('assert');
var Web3 = require("web3")
var path = require('path');
var solc = require("solc")
var fs = require("fs")
var Tx = require('ethereumjs-tx');

var testrpcHost = "http://localhost:8540"
var provider = new Web3.providers.HttpProvider(testrpcHost)
var web3 = new Web3(provider)
var an_adress = web3.eth.accounts[0]

var version = web3.version.api;
console.log("api:", version); // "0.20.7"

var version = web3.version.node;
console.log("node:", version); // "Geth/v1.8.22-omnibus-260f7fbd/linux-amd64/go1.11.1"

var version = web3.version.network;
console.log("network:", version); // 1

//加载需要发的智能合约，我这里用ERC20标准合约测试。代码看之前的博客
// var sourceToken = fs.readFileSync("GUUT.sol", "utf8");
// //编译合约源码
// var cacl = solc.compile(sourceToken, 1);
// var bytecode = cacl.contracts[':GUUToken'].bytecode;
var bytecode = "60806040526000600360146101000a81548160ff0219169083151502179055506000600560006101000a81548160ff02191690831515021790555034801561004657600080fd5b50601260ff16600a0a64746a5288000233600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000811115156100a657600080fd5b8060048190555050601260ff16600a0a640ba43b740002600181905550601260ff16600a0a640ba43b7400026000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef601260ff16600a0a640ba43b7400026040518082815260200191505060405180910390a36001600560006101000a81548160ff0219169083151502179055506120bd806101b26000396000f300608060405260043610610128576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305d2035b1461012d57806306fdde031461015c578063095ea7b3146101ec57806318160ddd1461025157806323b872dd1461027c578063313ce56714610301578063355274ea146103325780633f4ba83a1461035d57806340c10f191461037457806342966c68146103d95780635c975abb14610406578063661884631461043557806370a082311461049a5780637d64bcb4146104f157806383f12fec146105205780638456cb59146105a85780638da5cb5b146105bf57806395d89b4114610616578063a9059cbb146106a6578063d73dd6231461070b578063dd62ed3e14610770578063f2fde38b146107e7575b600080fd5b34801561013957600080fd5b5061014261082a565b604051808215151515815260200191505060405180910390f35b34801561016857600080fd5b5061017161083d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101b1578082015181840152602081019050610196565b50505050905090810190601f1680156101de5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101f857600080fd5b50610237600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610876565b604051808215151515815260200191505060405180910390f35b34801561025d57600080fd5b506102666108a6565b6040518082815260200191505060405180910390f35b34801561028857600080fd5b506102e7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108b0565b604051808215151515815260200191505060405180910390f35b34801561030d57600080fd5b506103166108e2565b604051808260ff1660ff16815260200191505060405180910390f35b34801561033e57600080fd5b506103476108e7565b6040518082815260200191505060405180910390f35b34801561036957600080fd5b506103726108ed565b005b34801561038057600080fd5b506103bf600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109ad565b604051808215151515815260200191505060405180910390f35b3480156103e557600080fd5b5061040460048036038101908080359060200190929190505050610a5e565b005b34801561041257600080fd5b5061041b610c16565b604051808215151515815260200191505060405180910390f35b34801561044157600080fd5b50610480600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c29565b604051808215151515815260200191505060405180910390f35b3480156104a657600080fd5b506104db600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c59565b6040518082815260200191505060405180910390f35b3480156104fd57600080fd5b50610506610ca1565b604051808215151515815260200191505060405180910390f35b34801561052c57600080fd5b5061058e6004803603810190808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919291929080359060200190929190505050610d69565b604051808215151515815260200191505060405180910390f35b3480156105b457600080fd5b506105bd611003565b005b3480156105cb57600080fd5b506105d46110c4565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561062257600080fd5b5061062b6110ea565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561066b578082015181840152602081019050610650565b50505050905090810190601f1680156106985780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156106b257600080fd5b506106f1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611123565b604051808215151515815260200191505060405180910390f35b34801561071757600080fd5b50610756600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611153565b604051808215151515815260200191505060405180910390f35b34801561077c57600080fd5b506107d1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611183565b6040518082815260200191505060405180910390f35b3480156107f357600080fd5b50610828600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061120a565b005b600360149054906101000a900460ff1681565b6040805190810160405280600481526020017f475555540000000000000000000000000000000000000000000000000000000081525081565b6000600560009054906101000a900460ff1615151561089457600080fd5b61089e83836112e1565b905092915050565b6000600154905090565b6000600560009054906101000a900460ff161515156108ce57600080fd5b6108d98484846113d3565b90509392505050565b601281565b60045481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561094957600080fd5b600560009054906101000a900460ff16151561096457600080fd5b6000600560006101000a81548160ff0219169083151502179055507f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3360405160405180910390a1565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a0b57600080fd5b600360149054906101000a900460ff16151515610a2757600080fd5b600454610a3f8360015461178d90919063ffffffff16565b11151515610a4c57600080fd5b610a5683836117ab565b905092915050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610aad57600080fd5b339050610b01826000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461199190919063ffffffff16565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610b588260015461199190919063ffffffff16565b6001819055508073ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a2600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a35050565b600560009054906101000a900460ff1681565b6000600560009054906101000a900460ff16151515610c4757600080fd5b610c5183836119aa565b905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610cff57600080fd5b600360149054906101000a900460ff16151515610d1b57600080fd5b6001600360146101000a81548160ff0219169083151502179055507fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0860405160405180910390a16001905090565b600080600080600560009054906101000a900460ff16151515610d8b57600080fd5b85519250610da28386611c3b90919063ffffffff16565b9150600083111515610db357600080fd5b600085118015610e015750816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b1515610e0c57600080fd5b610e5d826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461199190919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600090505b82811015610ff657610f14856000808985815181101515610ec157fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461178d90919063ffffffff16565b6000808884815181101515610f2557fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508581815181101515610f7b57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef876040518082815260200191505060405180910390a38080600101915050610ea4565b6001935050505092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561105f57600080fd5b600560009054906101000a900460ff1615151561107b57600080fd5b6001600560006101000a81548160ff0219169083151502179055507f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62560405160405180910390a1565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6040805190810160405280600481526020017f475555540000000000000000000000000000000000000000000000000000000081525081565b6000600560009054906101000a900460ff1615151561114157600080fd5b61114b8383611c76565b905092915050565b6000600560009054906101000a900460ff1615151561117157600080fd5b61117b8383611e95565b905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561126657600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156112de5780600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561141057600080fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561145d57600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156114e857600080fd5b611539826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461199190919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506115cc826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461178d90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061169d82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461199190919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b60008082840190508381101515156117a157fe5b8091505092915050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561180957600080fd5b600360149054906101000a900460ff1615151561182557600080fd5b61183a8260015461178d90919063ffffffff16565b600181905550611891826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461178d90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600082821115151561199f57fe5b818303905092915050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080831115611abb576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611b4f565b611ace838261199190919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b6000806000841415611c505760009150611c6f565b8284029050828482811515611c6157fe5b04141515611c6b57fe5b8091505b5092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515611cb357600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515611d0057600080fd5b611d51826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461199190919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611de4826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461178d90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b6000611f2682600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461178d90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582070c88e0a6ddab744ec06ed5b7e938d3a9eaf0673d795eb01e6c340ec1da4607b0029"

//发布合约所需的大致费用
var price = 900000000000;
var limit = 4000000;

//查询钱包地址的nonce
web3.eth.getTransactionCount("0x762009cd5dcabb5a125008d70f5efdbdff2aa782", function (error, result) {

  console.log("nonce:", result);

  //封装交易
  var rawTx = {
    nonce: result,
    gasPrice: web3.toHex(price),
    gasLimit: web3.toHex(limit),
    from: "0x762009cd5dcabb5a125008d70f5efdbdff2aa782",
    data: "0x" + bytecode,
  }

  //私钥签名交易
  var pk = new Buffer("fc3d494d1a1c478e393cf2adf5eb72664b8be9a3ca335e751b504d0b2f429bc3", 'hex')
  var tx = new Tx(rawTx);
  tx.sign(pk);
  var serializedTx = tx.serialize();
  //广播签名的交易
  web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
    if (!err) {

      // 发行成功 用返回的 hash 值去区块链上查询 成功状态
      console.log("hash:", hash);

    } else {

      console.log("deploy error:", err);

    }
  })

})

//查询钱包地址的nonce
web3.eth.getBalance("0x762009cd5dcabb5a125008d70f5efdbdff2aa782", function (error, result) {

  var _balance = web3.fromWei(result.toString(10), 'ether');

  console.log("balance:", _balance);

})