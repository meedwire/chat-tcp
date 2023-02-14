import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  margin: 12px 10px;
`;

export const AvatarContainer = styled.View<{isOwner: boolean}>`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: #dadada;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: white;
  position: absolute;
  z-index: 99;
  top: -10px;
  ${({isOwner}) =>
    isOwner
      ? css`
          right: -10px;
        `
      : css`
          left: -10px;
        `}
`;

export const TextAvatar = styled.Text`
  color: #555555;
`;

export const ContainerContent = styled.View``;

export const ContainerItem = styled.View<{isOwner?: boolean}>`
  flex-direction: row;
  align-items: flex-end;
  ${({isOwner}) =>
    isOwner
      ? css`
          margin-left: auto;
        `
      : css`
          margin-right: auto;
        `}
`;

export const Message = styled.View<{isOwner: boolean}>`
  padding: 8px 12px;
  background-color: #636363;
  border-radius: 22px;
  max-width: 90%;
  ${({isOwner}) =>
    isOwner
      ? css`
          margin-left: 22px;
        `
      : css`
          margin-right: 22px;
        `}
`;

export const TextMessage = styled.Text`
  color: white;
`;

export const ContainerInfo = styled.View``;

export const TextUserName = styled.Text<{isOwner?: boolean}>`
  font-size: 11px;
  color: #696969;
  text-align: ${({isOwner}) => (isOwner ? 'right' : 'left')};
`;

export const TextHour = styled.Text<{isOwner?: boolean}>`
  font-size: 10px;
  color: #696969;
  text-align: ${({isOwner}) => (isOwner ? 'right' : 'left')};
`;
