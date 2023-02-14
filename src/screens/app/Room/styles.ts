import {FlatList, Platform} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

export const Container = styled.View`
  flex: 1;
  padding: 22px;
`;

export const KeyBoardingAvoiding = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
  keyboardVerticalOffset: 98,
})`
  flex-grow: 1;
`;

export const ListMessages = styled.FlatList.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`` as unknown as typeof FlatList;

export const Input = styled.TextInput`
  padding: 12px 8px;
  border-width: 1px;
  border-color: #dadada;
  border-radius: 4px;
  flex: 1;
  color: white;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const SendButton = styled.TouchableOpacity`
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

export const IconSend = styled(Icon).attrs({
  name: 'arrowright',
  size: 18,
  color: 'white',
})``;
