import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../hooks/useClickOutside';

import type { KeyboardEvent } from 'react';

interface props {
  fileLabel: string;
}

export const File = ({ fileLabel }: props) => {
  const [fileName, setFileName] = useState(fileLabel);
  const [inputValue, setInputValue] = useState(fileLabel);
  const [hasFocus, setHasFocus] = useState(false);

  const containerRef = useRef(null);
  const clickedOutside = useClickOutside(containerRef);

  useEffect(() => {
    // reset values and hide input
    setInputValue(fileName);
    setHasFocus(false);
  }, [clickedOutside]);

  const handleChange = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      setFileName(evt.target.value);
      setHasFocus(false);
    }
  };

  return (
    <div ref={containerRef} className="w-60 bg-lime-300 p-1">
      {hasFocus ? (
        <div className="flex items-center">
          <FontAwesomeIcon className="pr-3" icon={faFile} />
          <input
            className="w-28"
            value={inputValue}
            onKeyDown={handleChange}
            onChange={(evt) => setInputValue(evt.target.value)}
          />
        </div>
      ) : (
        <div className="flex items-center">
          <FontAwesomeIcon className="pr-3" icon={faFile} />
          <label onClick={() => setHasFocus(true)}>{fileName}</label>
        </div>
      )}
    </div>
  );
};
