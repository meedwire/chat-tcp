import React from 'react';
import {chatStore} from '@store';
import * as Styles from './styles';
import {IItemListProps} from './types';

export const ItemList: React.FC<IItemListProps> = ({item}) => {
  const userName = item.author.userName;
  const initial = userName.charAt(0);
  const isOwner = item.author.id === chatStore.userId;
  const date = new Date(item.timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const renderInfo = () => {
    return (
      <Styles.ContainerInfo>
        <Styles.TextHour isOwner={isOwner}>{date}</Styles.TextHour>
        <Styles.TextUserName isOwner={isOwner}>{userName}</Styles.TextUserName>
      </Styles.ContainerInfo>
    );
  };

  return (
    <Styles.Container>
      <Styles.AvatarContainer isOwner={isOwner}>
        <Styles.TextAvatar>{initial}</Styles.TextAvatar>
      </Styles.AvatarContainer>

      <Styles.ContainerContent>
        <Styles.ContainerItem isOwner={isOwner}>
          {isOwner && renderInfo()}
          <Styles.Message isOwner={isOwner}>
            <Styles.TextMessage>{item.content}</Styles.TextMessage>
          </Styles.Message>
          {!isOwner && renderInfo()}
        </Styles.ContainerItem>
      </Styles.ContainerContent>
    </Styles.Container>
  );
};
