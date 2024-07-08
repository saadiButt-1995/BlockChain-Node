const Block = require("./block");

class BlockChain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];
            if (
                block.prevHash !== lastBlock.hash
                // ||
                // block.hash !== Block.blockHash(block)
            ) {
                return false;
            }
        }
        return true;
    }

    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log("received chain is not longer than previous chain!");
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log("This is an invalid chain!");
            return;
        }

        console.log("Replacing the blockchain with a new chain!");
        this.chain = newChain;
    }
}

module.exports = BlockChain;
