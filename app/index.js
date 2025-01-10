const express = require("express");
const BodyParser = require("body-parser");

const BlockChain = require("../Blockchain");
const P2PServer = require("./p2p-server");

console.log(process.env.HTTP_PORT, "process.env.HTTP_PORT");
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new BlockChain();
const p2pServer = new P2PServer(bc);

app.use(BodyParser.json());

app.get("/blocks", (req, res) => {
    res.json(bc.chain);
});

app.post("/mine", (req, res) => {
    const block = bc.addBlock(req.body.data);
    // console.log("new block has been added " + block.toString());
    p2pServer.syncChains();
    res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => console.log("Listening on port " + HTTP_PORT));
p2pServer.listen();
