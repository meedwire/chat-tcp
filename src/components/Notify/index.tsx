import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  createRef,
} from 'react';

import * as Styles from './styles';
import {CustomFC, HandleNotify} from './types';

const ref = createRef<HandleNotify>();

export const Notify: CustomFC = () => {
  const [visible, setVisible] = useState(false);
  const messageRef = useRef('');

  const show = (message: string) => {
    messageRef.current = message;
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Styles.Container>
      <Styles.IconInfo />
      <Styles.Text>{messageRef.current}</Styles.Text>
    </Styles.Container>
  );
};

Notify.show = (message: string) => {
  ref.current?.show?.(message);
};
