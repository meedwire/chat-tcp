export interface HandleNotify {
  show(message: string): void;
}

export interface CustomFC {
  (): JSX.Element | null;
  show(message: string): void;
}
