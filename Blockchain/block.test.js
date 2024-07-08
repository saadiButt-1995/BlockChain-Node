const Block = require("./block");

describe("Block", () => {
    let data, lastBlock, block;

    beforeEach(() => {
        data = "bar";
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it("matching `data`", () => {
        expect(block.data).toEqual(data);
    });

    it("matching `prevHash` ", () => {
        expect(block.prevHash).toEqual(lastBlock.hash);
    });
});
