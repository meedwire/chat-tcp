import TcpSocket from 'react-native-tcp-socket';
export type EventKeys = 'rooms' | 'message' | 'enter_the_room';

export interface NewParticipant {
  id: string;
  userName: string;
  socket?: TcpSocket.Socket;
}

export interface MessageItem {
  id: string;
  author: {
    id: string;
    userName: string;
  };
  timestamp: string;
  content: string;
  type: 'text' | 'audio' | 'image' | 'file';
}

export interface MessageData {
  roomID: string;
  content: string;
  userId: string;
}
