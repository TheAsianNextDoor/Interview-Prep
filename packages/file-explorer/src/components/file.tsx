import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../hooks/useClickOutside';

import type { KeyboardEvent } from 'react';

interface props {
  label: string;
  inputVisible: boolean;
}

export const File = ({ label, inputVisible }: props) => {
  const [fileName, setFileName] = useState(label);
  const [inputValue, setInputValue] = useState(label);
  const [isInputVisible, setIsInputVisible] = useState(inputVisible);

  const containerRef = useRef(null);
  const clickedOutside = useClickOutside(containerRef);

  useEffect(() => {
    // handle click outside
    if (clickedOutside) {
      setIsInputVisible(false);
    }
  }, [clickedOutside]);

  const handleChange = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      setFileName(evt.target.value);
      setIsInputVisible(false);
    }
  };

  return (
    <div ref={containerRef} className="w-80 bg-green-700 p-1">
      {isInputVisible ? (
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
          <label onClick={() => setIsInputVisible(true)}>{fileName}</label>
        </div>
      )}
    </div>
  );
};
