const Block = require("./Blockchain/block");
const BlockChain = require("./Blockchain/block_chain.test");

const b = new BlockChain();

b.addBlock("hello");
console.log(b.chain);
