const Block = require("./Blockchain/block.js");
const BlockChain = require("./Blockchain/index.js");

// const block = new Block("foo", "bar", "baz", { name: "saad" });
// console.log(block.toString());
// console.log(Block.genesis().toString());

// console.log(Block.mineBlock(Block.genesis(), "test"));
// console.log(Block.mineBlock(Block.genesis(), "test"));
// console.log(Block.mineBlock(Block.genesis(), "test"));

const b = new BlockChain();
const b2 = new BlockChain();

// b.addBlock("hello");
b2.addBlock("Bye");
// console.log(b.chain);

b2.addBlock("data");
b2.addBlock("gunda");
b.replaceChain(b2.chain);
console.log(b.chain);

// console.log(b.isValidChain(b2.chain));
