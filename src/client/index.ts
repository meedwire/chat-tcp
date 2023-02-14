import {Buffer} from 'buffer';
import TcpSockets from 'react-native-tcp-socket';
import {ConnectionOptions} from 'react-native-tcp-socket/lib/types/Socket';
import {Message} from '@entities';
import {chatStore} from '@store';
import {MessageData} from '@types';

class Client {
  public socket: TcpSockets.Socket | undefined;

  getClientConnection() {
    return new Promise<TcpSockets.Socket>(resolve => {
      const options: ConnectionOptions = {
        port: 20254,
        host: '10.0.0.127',
        reuseAddress: true,
      };

      const client = TcpSockets.createConnection(options, () => {
        console.log('[CLIENT]: connected in server');
        return resolve(client);
      });
    });
  }

  enterTheRoom(roomID: string) {
    const userId = chatStore.userId;
    const userName = chatStore.userName!;

    const message = {
      key: 'enter_the_room',
      data: {roomID, userName, userId},
    };

    const buffer = Buffer.from(JSON.stringify(message));

    this.socket?.write(buffer);

    chatStore.addParticipant({roomID, userId, userName});
  }

  sendMessage(data: MessageData) {
    const message = {
      key: 'message',
      data,
    };

    const buffer = Buffer.from(JSON.stringify(message));

    this.socket?.write(buffer);

    chatStore.setNewMessage(data);
  }

  serverClosed() {
    chatStore.removeRooms();
  }

  async connectServer() {
    try {
      const client = await this.getClientConnection();

      this.subscribeConnections(client);
    } catch (error) {
      console.log(error);
    }
  }

  subscribeConnections(socket: TcpSockets.Socket) {
    socket.on('data', data => {
      console.log('[CLIENT]: received message sucess');
      this.parseReceivedData(data);
    });

    socket.on('error', e => {
      console.log('[CLIENT]: error connection', e.message);
    });

    socket.on('close', () => {
      console.log('[CLIENT]: connecton closed');
      this.serverClosed();
    });

    this.socket = socket;
  }

  parseReceivedData(data: any) {
    const message = new Message(data);

    if (message.key === 'rooms') {
      chatStore.loadRooms(message.data);
    }

    if (message.key === 'message') {
      chatStore.setNewMessage(message.data);
    }
  }
}

export const client = new Client();
