import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {FlatList, ListRenderItemInfo, StatusBar} from 'react-native';
import * as Styles from './styles';
import {client} from '@client';
import {server} from '@server';
import {chatStore} from '@store';
import {useCallback} from 'react';
import {Room} from '@entities';
import {ItemList} from './components/ItemList';

export const Home = observer(() => {
  useEffect(() => {
    return () => {
      server.closeServer();
    };
  }, []);

  const renderItem = useCallback(({item, index}: ListRenderItemInfo<Room>) => {
    return <ItemList item={item} index={index} />;
  }, []);

  return (
    <Styles.Container>
      <StatusBar barStyle="light-content" backgroundColor="#25262a" />
      <Styles.Title>Salas ativas {chatStore.totalRooms}</Styles.Title>
      <FlatList
        data={chatStore.chats}
        keyExtractor={item => item.roomID}
        renderItem={renderItem}
      />
      <Styles.ButtonCreateChatRoom onPress={chatStore.createRoom}>
        <Styles.TextButtonChatRoom>Criar sala</Styles.TextButtonChatRoom>
      </Styles.ButtonCreateChatRoom>

      {!chatStore.isServer && (
        <Styles.ButtonCreateChatRoom onPress={() => client.connectServer()}>
          <Styles.TextButtonChatRoom>Buscar salas</Styles.TextButtonChatRoom>
        </Styles.ButtonCreateChatRoom>
      )}
    </Styles.Container>
  );
});
