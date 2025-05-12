const WebSocket = require("ws");
const url = require("url");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws, req) => {
    const parameters = url.parse(req.url, true).query;
    const appId = parameters.app_id;

    ws.appId = appId;

    ws.on("message", (message) => {
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (
                client !== ws &&
                client.appId === ws.appId &&
                client.readyState === WebSocket.OPEN
            ) {
                client.send(message);
            }
        });
    });

    ws.send("Welcome to the WebSocket server");
});

console.log("Server started");