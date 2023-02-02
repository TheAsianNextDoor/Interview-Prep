import { useEffect, useState } from 'react';

import type { Ref } from 'react';

export const useClickOutside = (ref: Ref<HTMLElement>) => {
  const [clickedOutside, setClickedOutside] = useState(false);

  const handleClickOutside = (evt: MouseEvent) => {
    if (!ref?.current?.contains?.(evt.target)) {
      return setClickedOutside(true);
    }

    return setClickedOutside(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return clickedOutside;
};
