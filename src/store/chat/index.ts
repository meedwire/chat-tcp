import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import {Room} from '@entities';
import {server} from '@server';
import {MessageData} from '@types';
import TcpSockets from 'react-native-tcp-socket';
import {Notify} from '@components';

interface NewChatRoom {
  userName: string;
  roomID: string;
  userId: string;
  socket?: TcpSockets.Socket;
}

export class ChatStore {
  @observable
  public chats: Room[] = [];

  @observable
  public isServer = false;

  @observable
  public userName: string | undefined;

  @observable
  public userId: string = Math.random().toString(16);

  @observable
  public currentRoomId: string | undefined;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async createRoom() {
    this.isServer = true;

    const room = new Room();
    await server.createServer();

    runInAction(() => {
      this.chats.push(room);
    });
  }

  @action.bound
  loadRooms(rooms: Room[]) {
    this.chats = rooms;
  }

  @action.bound
  addParticipant({roomID, userName, userId, socket}: NewChatRoom) {
    const prevChats = [...this.chats];
    const findedRoom = prevChats.find(room => room.roomID === roomID);

    findedRoom?.participants.push({userName, id: userId, socket});

    this.chats = prevChats;

    Notify.show(`${userName} entrou na sala`);
  }

  @action.bound
  setUserName(text: string) {
    this.userName = text;
  }

  @action.bound
  setCurrentRoomId(id?: string) {
    this.currentRoomId = id;
  }

  @action.bound
  setNewMessage(data: MessageData) {
    const roomID = data.roomID;
    const userId = data.userId;
    const content = data.content;

    const prevChats = [...this.chats];

    const findedRoom = prevChats.find(room => room.roomID === roomID);
    const participant = findedRoom?.participants.find(
      user => user.id === userId,
    );

    if (!findedRoom || !participant) {
      return;
    }

    findedRoom.messages.push({
      author: participant,
      content,
      id: Math.random().toString(16),
      type: 'text',
      timestamp: new Date().toISOString(),
    });

    this.chats = prevChats;
  }

  @action.bound
  removeRooms() {
    this.chats = [];
  }

  @computed
  get totalRooms() {
    return this.chats.length;
  }
}

export const chatStore = new ChatStore();
