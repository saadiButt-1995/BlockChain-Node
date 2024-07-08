const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(prevHash, hash, timestamp, data) {
        this.prevHash = prevHash;
        this.hash = hash;
        this.timestamp = timestamp;
        this.data = data;
    }

    toString() {
        return `Block -
        TimeStamp    : ${this.timestamp}
        PreviousHash : ${this.prevHash.substring(0, 10)}
        Hash         : ${this.hash.substring(0, 10)}
        Data         : ${this.data}`;
    }

    static genesis() {
        return new this("------", "f1r5t-ha5h", "genesis time", []);
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const prevHash = lastBlock.hash;
        const hash = Block.hash(timestamp, prevHash, data);

        return new this(prevHash, hash, timestamp, data);
    }

    static hash(timestamp, prevHash, data) {
        return SHA256(`${timestamp}${prevHash}${data}`).toString();
    }

    blockHash(block) {}
}

module.exports = Block;
