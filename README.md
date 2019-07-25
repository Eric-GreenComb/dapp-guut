# web3.js 0.20.x

## npm install

## solc 

solc --bin --abi --overwrite GUUT.sol -o ./

## 发布 ERC20

1. node deploy_new.js

使用编译,new的方法

根据返回值，eth_getTransactionReceipt查出 contract address

0x18731376d0c12dba804f8e2182af2c596f3f8471

2. node deploy.js

使用 sendRawTransaction

根据返回值，eth_getTransactionReceipt查出 contract address

0xbf18f3937e733e284ce1348f71d94ffda71ba5cb

## 获取 balance

node balance.js

## unparse erc20

node unpause.js

## 转以太

node tx_eth.js

## 转20

node tx.js