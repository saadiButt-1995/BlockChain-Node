const Block = require("./block");
const BlockChain = require(".");

describe("BlockChain", () => {
    let bc;

    beforeEach(() => {
        bc = new BlockChain();
        bc2 = new BlockChain();
    });

    it("starts with genesis block", () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it("add a new block to the chain", () => {
        const data = "foo";
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it("validates a valid chain", () => {
        const data = "bar";
        bc2.addBlock(data);
        // console.log(bc2.chain, "bc2.chain");
        expect(bc.isValidChain(bc2.chain)).toBe(true);
        // expect(bc2.prevHash).toEqual(bc.hash);
    });

    it("Validates a chain with a corrupt genisis block", () => {
        bc2.chain[0].data = "Bad data";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it("Validates a corrupt chain", () => {
        bc2.addBlock("foo");
        bc2.chain[0].data = "Bad foo";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it("replaces a chain with a valid chain!", () => {
        bc2.addBlock("data");
        bc.replaceChain(bc2.chain);
        // console.log("21232w");
        expect(bc.chain).toEqual(bc2.chain);
    });

    it("does not replace the chain with one or less than or equal to length of a chain!", () => {
        bc.addBlock("data");
        bc2.addBlock("gang");

        console.log(bc.chain.length, bc2.chain.length);
        bc.replaceChain(bc2.chain);

        console.log(bc.chain[bc.chain.length - 1]);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
});
