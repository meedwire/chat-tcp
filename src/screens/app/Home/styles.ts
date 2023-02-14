import type {FlatList} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 22px;
`;

export const Title = styled.Text`
  color: white;
`;

export const ButtonCreateChatRoom = styled.TouchableOpacity`
  padding: 12px;
  align-items: center;
  justify-content: center;
  background-color: #777777;
  border-radius: 4px;

  margin-top: auto;

  margin-top: 12px;
`;

export const TextButtonChatRoom = styled.Text`
  color: white;
`;

export const List = styled.FlatList`` as unknown as typeof FlatList;
