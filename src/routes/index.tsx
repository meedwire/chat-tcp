import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppRoutes, RootStackParamList} from './app.routes';
import {themeStore} from '../theme';
import {observer} from 'mobx-react';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const Routes = observer(() => {
  return (
    <NavigationContainer theme={themeStore.theme}>
      <AppRoutes />
    </NavigationContainer>
  );
});
