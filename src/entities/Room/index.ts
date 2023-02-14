import {MessageItem, NewParticipant} from '@types';

export class Room {
  roomID: string;
  participants: NewParticipant[] = [];
  messages: MessageItem[] = [];

  constructor() {
    this.roomID = Math.random().toString(16);
  }
}
