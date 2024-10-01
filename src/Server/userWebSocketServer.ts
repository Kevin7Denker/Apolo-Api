import UserRepository from "src/Repository/User_Repository";
import WebSocket from "ws";

const server = new WebSocket.Server({ port: 8080 });
const userRepository = new UserRepository();

server.on("connection", (ws: WebSocket) => {
  ws.on("message", async (message: string) => {
    try {
      const data = JSON.parse(message);
      const { id } = data;

      if (!id) {
        ws.send(JSON.stringify({ error: "No ID provided" }));
        return;
      }

      const identity = await userRepository.findIdentity(id);
      ws.send(JSON.stringify(identity));
    } catch (error) {
      ws.send(
        JSON.stringify({
          error: "Error fetching identity",
          details: error.message,
        })
      );
    }
  });

  ws.send("Connected to WebSocket server");
});

console.log("WebSocket server is listening on ws://localhost:8080");
