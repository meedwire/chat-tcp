import Animated, {
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

export const Container = styled(Animated.View).attrs({
  layout: Layout,
  entering: FadeInDown,
  exiting: FadeOutDown,
})`
  padding: 8px 22px 8px 8px;
  border-radius: 32px;
  position: absolute;
  background-color: #30303064;
  flex-direction: row;
  align-items: center;

  align-self: center;

  bottom: 82px;

  box-shadow: 1px 1px 4px #dadada;
  elevation: 10;
`;

export const Text = styled.Text`
  color: white;
`;

export const IconInfo = styled(Icon).attrs({
  name: 'infocirlceo',
  color: 'white',
  size: 16,
})`
  margin-right: 12px;
`;
