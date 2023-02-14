import {client} from '@client';
import {server} from '@server';
import {chatStore} from '@store';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {useState} from 'react';
import {StatusBar} from 'react-native';
import {ItemList} from './components/ItemList';
import {Notify} from '@components';
import * as Styles from './styles';

export const Room: React.FC = observer(() => {
  const [text, setText] = useState('');

  const currentRoomId = chatStore.currentRoomId!;
  const currentRoom = chatStore.chats.find(
    room => room.roomID === currentRoomId,
  );
  const isServer = chatStore.isServer;
  const userId = chatStore.userId;

  function sendMessage() {
    if (!text) {
      return;
    }

    if (isServer) {
      server.sendMessage({
        content: text,
        roomID: currentRoomId,
        userId,
      });

      setText('');

      return;
    }

    client.sendMessage({
      content: text,
      roomID: currentRoomId,
      userId,
    });

    setText('');
  }

  return (
    <Styles.Container>
      <StatusBar barStyle="light-content" backgroundColor="#25262a" />
      <Styles.KeyBoardingAvoiding>
        <Styles.ListMessages
          data={currentRoom?.messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ItemList item={item} />}
        />
        <Styles.Row>
          <Styles.Input value={text} onChangeText={setText} />
          <Styles.SendButton onPress={sendMessage}>
            <Styles.IconSend />
          </Styles.SendButton>
        </Styles.Row>
      </Styles.KeyBoardingAvoiding>
      <Notify />
    </Styles.Container>
  );
});
