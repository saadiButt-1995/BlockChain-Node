const Websocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2PServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on("connection", (socket) => this.connectSocket(socket));

        this.connectToPeers();

        console.log("Listening for peep-to-peer connections on: " + P2P_PORT);
    }

    connectToPeers() {
        console.log({ peers });
        peers.forEach((peer) => {
            const socket = new Websocket(peer);
            socket.on("open", () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log("Socket Connected");

        this.messageHandler(socket);
        this.sendChain(socket);
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    messageHandler(socket) {
        socket.on("message", (message) => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);
            console.log({ data });
        });
    }

    syncChains() {
        this.sockets.forEach((socket) => this.sendChain(socket));
    }
}

module.exports = P2PServer;
