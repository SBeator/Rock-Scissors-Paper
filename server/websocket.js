import { server as WebSocketServer } from 'websocket';
import http from 'http';
import GameConnectServer from './GameConnectServer.js';

import { port, protocal } from '../config/websocket.json';

function initializeWebSocketServer() {
  const server = http.createServer((request, response) => {
    console.log(`Websocket: ${(new Date())}  Received request for ${request.url}`);
    response.writeHead(404);
    response.end();
  });
  server.listen(port, () => {
    console.log(`Websocket: ${(new Date())} Web socket server is listening on port ${port}`);
  });

  const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });

  function originIsAllowed(origin) {
    // TODO: Add origin allow list.
    return true;
  }

  wsServer.on('request', (request) => {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log(`Websocket: ${(new Date())} Connection from origin ${request.origin} rejected.`);
      return;
    }

    const connection = request.accept(protocal, request.origin);

    const gameConnect = new GameConnectServer(connection);

    console.log(`Websocket: ${new Date()} Connection accepted. Origin: ${request.origin}`);
    connection.on('message', (message) => {
      if (message.type === 'utf8') {
        console.log(`Websocket: Received Message: ${message.utf8Data}`);
        gameConnect.recieveMessage(message.utf8Data);
      } else if (message.type === 'binary') {
        console.log(`Websocket: Received Binary Message of ${message.binaryData.length} bytes`);
        gameConnect.recieveMessage(message.binaryData);
      }
    });
    connection.on('close', (reasonCode, description) => {
      console.log(`Websocket: ${new Date()} Peer ${connection.remoteAddress} disconnected.`);

      gameConnect.disconnect();
    });
  });
}


export default initializeWebSocketServer;
