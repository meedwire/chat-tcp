import {DefaultTheme, Theme} from '@react-navigation/native';
import {action, makeObservable, observable} from 'mobx';

export class StateTheme {
  darkTheme = {
    background: '#353535',
    border: '#1c1e22',
    card: '#25262a',
    notification: '#dadada',
    primary: '#333b4a',
    text: '#c7c7c7',
  };

  lightTheme = {
    ...DefaultTheme.colors,
  };

  @observable
  public theme: Theme = {
    ...DefaultTheme,
    dark: true,
    colors: this.darkTheme,
  };

  constructor() {
    makeObservable(this);
  }

  @action.bound
  toggleTheme() {
    if (this.theme.dark) {
      this.theme = {
        ...DefaultTheme,
        dark: false,
      };
    } else {
      this.theme = {
        ...DefaultTheme,
        dark: true,
        colors: this.darkTheme,
      };
    }
  }
}

export const themeStore = new StateTheme();
