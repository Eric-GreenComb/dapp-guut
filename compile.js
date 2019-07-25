//compile.js 赋值编译智能合约

//require('库名/路径')
const solc = require('solc');
//fs: file system
const fs = require('fs');

const path = require('path');


//1.读取智能合约
//readFileSync 同步读取文件

//__dirname =>返回当前路径
console.log(__dirname);
//resolve路径拼接的方法
const filepath = path.resolve(__dirname, 'contracts', 'guut.sol');
const contractFile = fs.readFileSync(filepath, 'utf8');

// console.log(contractFile);

//通过solc库来编译智能合约

var output = solc.compile(contractFile, 1);
// console.log(output);
//output = {contracts:'',errors:'',sourceLiser:''}
const contracts = output.contracts;
// console.log(contracts);
//for in 操作: contract = 对象 中的 属性名
for (let contract in contracts) {
    // console.log(contract)
    //contracts[contract]
    //写文件 fs
    // console.log(contract);
    let newfilepath = path.resolve(__dirname, 'build', contract.replace(':', '') + '.json');
    // console.log(newfilepath);
    //fs.writeFileSync(目标路径, 写入内容)
    //对象, tostring()方法, 返回是一个[object object] 字符串
    //JSON.stringify => 将对象装换为字符串
    fs.writeFileSync(newfilepath, JSON.stringify(contracts[contract]));
}
//console.log(contracts);