const WebSocket = require("ws");
const url = require("url");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws, req) => {
    const parameters = url.parse(req.url, true).query;
    const schoolName = parameters.school_name;

    ws.schoolName = schoolName;

    ws.on("message", (message) => {
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (
                client !== ws &&
                client.schoolName === ws.schoolName &&
                client.readyState === WebSocket.OPEN
            ) {
                client.send(message);
            }
        });
    });

    ws.send("Welcome to the WebSocket server");
});

console.log("Server started");