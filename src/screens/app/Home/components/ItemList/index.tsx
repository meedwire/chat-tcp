import React, {useId, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {client} from '@client';

import * as Styles from './styles';
import {IItemListProps} from './types';
import {chatStore} from '@store';
import {server} from '@server';

export const ItemList: React.FC<IItemListProps> = ({item, index}) => {
  const id = useId();
  const {navigate} = useNavigation();
  const [active, setActive] = useState(false);
  const isServer = chatStore.isServer;
  const userId = chatStore.userId;

  const text = (total: number) => ({
    [String(total === 0)]: 'Nenhum participante',
    [String(total === 1)]: `${total} participante`,
    [String(total > 1)]: `${total} participantes`,
  });

  function handlePress() {
    if (!chatStore.userName) {
      return setActive(true);
    }

    chatStore.setCurrentRoomId(item.roomID);

    if (isServer && chatStore.userName) {
      navigate('room');
      chatStore.addParticipant({
        roomID: item.roomID,
        userName: chatStore.userName,
        userId,
      });
      server.notifyAllSockets();
    }

    if (chatStore.userName && !isServer) {
      navigate('room');
      client.enterTheRoom(item.roomID);
    }
  }

  return (
    <Styles.Container key={id} onPress={handlePress}>
      <Styles.Row>
        <Styles.ContainerContent>
          <Styles.TextChatRoom>Sala {index + 1}</Styles.TextChatRoom>
          <Styles.TextChatRoom>
            {text(item.participants.length).true}
          </Styles.TextChatRoom>
        </Styles.ContainerContent>
        <Styles.IconArrowRight />
      </Styles.Row>
      {active && (
        <Styles.Input
          placeholder="Usuário"
          value={chatStore.userName}
          onChangeText={chatStore.setUserName}
          placeholderTextColor="#8f8f8f"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
      )}
    </Styles.Container>
  );
};
