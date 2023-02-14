import {TouchableOpacity} from 'react-native';
import Animated, {Layout} from 'react-native-reanimated';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Container = styled(AnimatedTouchable).attrs({
  layout: Layout,
})`
  padding: 12px 8px;
  background-color: #767676;
  border-radius: 4px;
  margin-top: 12px;

  overflow: hidden;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
`;

export const ContainerContent = styled.View``;

export const TextChatRoom = styled.Text`
  color: white;
`;

export const IconArrowRight = styled(Icon).attrs({
  name: 'arrowright',
  size: 18,
  color: 'white',
})``;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #dadada;

  margin-top: 12px;
  padding: 12px 8px;
  border-radius: 4px;
  color: white;
`;
