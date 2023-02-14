import TcpSockets from 'react-native-tcp-socket';
import {Buffer} from 'buffer';
import {chatStore} from '@store';
import {Message} from '@entities';
import {MessageData} from '@types';

class Server {
  public server: TcpSockets.Server | undefined;
  private connectedClients: TcpSockets.Socket[] = [];

  sendRoomsToClient(socket: TcpSockets.Socket) {
    const rooms = chatStore.chats;

    const event = {
      key: 'rooms',
      data: rooms,
    };

    const buffer = Buffer.from(JSON.stringify(event));

    socket.write(buffer);
  }

  sendMessage(data: MessageData) {
    const currentChatRoom = chatStore.currentRoomId;

    const currentRoom = chatStore.chats.find(
      room => room.roomID === currentChatRoom,
    );

    const message = {
      key: 'message',
      data,
    };

    const buffer = Buffer.from(JSON.stringify(message));

    currentRoom?.participants.forEach(participant => {
      if (participant.socket) {
        participant.socket.write(buffer);
      }
    });

    chatStore.setNewMessage(data);
  }

  subscribeConnections(server: TcpSockets.Server) {
    server.on('connection', socket => {
      console.log('[SERVER]: client connection sucess', socket.address());
      this.connectedClients.push(socket);

      socket.on('data', data => {
        console.log('[SERVER]: server received message');
        this.parseReceivedMessage(data, socket);
      });

      this.sendRoomsToClient(socket);
    });

    server.on('close', () => {
      console.log('[SERVER]: connection closed');
    });
  }

  async createServer() {
    return new Promise<boolean>((resolve, reject) => {
      if (this.server) {
        return resolve(true);
      }

      const server = TcpSockets.createServer(() => {}).listen({
        port: 20254,
        host: '0.0.0.0',
      });

      server.on('listening', () => {
        this.server = server;
        console.log('[SERVER]: connection created success');
        this.subscribeConnections(server);

        resolve(true);
      });

      server.on('error', err => {
        reject(err);
      });
    });
  }

  async closeServer() {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close(reject);

        this.server = undefined;

        return resolve(true);
      }

      return resolve(true);
    });
  }

  parseReceivedMessage(data: any, socket: TcpSockets.Socket) {
    const message = new Message(data);

    if (message.key === 'enter_the_room') {
      const roomID = message.data.roomID;
      const userName = message.data.userName;
      const userId = message.data.userId;

      chatStore.addParticipant({roomID, userName, userId, socket});
    }

    if (message.key === 'message') {
      const roomID = message.data.roomID;
      const userId = message.data.userId;
      const content = message.data.content;

      chatStore.setNewMessage({roomID, userId, content});
    }
  }

  notifyAllSockets() {
    this.connectedClients.forEach(socket => {
      this.sendRoomsToClient(socket);
    });
  }
}

export const server = new Server();
