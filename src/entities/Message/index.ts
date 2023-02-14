import {Buffer} from 'buffer';
import {EventKeys} from '@types';

export class Message {
  public key!: EventKeys;
  public data!: any;

  constructor(buffer: any) {
    const stringContent = Buffer.from(buffer).toString();

    const data = JSON.parse(stringContent);

    this.key = data.key;
    this.data = data.data;
  }
}
