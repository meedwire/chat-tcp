import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Room} from '@screens/app';

export type RootStackParamList = {
  home: undefined;
  room: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

export const AppRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="home" component={Home} options={{title: 'Salas de chat'}} />
      <Screen
        name="room"
        component={Room}
        options={{title: 'Sala de chat', headerBackTitleVisible: false}}
      />
    </Navigator>
  );
};
