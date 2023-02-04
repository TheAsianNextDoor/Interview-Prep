import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../hooks/useClickOutside';

import type { KeyboardEvent } from 'react';

interface folderProps {
  label: string;
  inputVisible: boolean;
  handleExpand: () => void;
  handleNewFile: () => void;
  handleNewFolder: () => void;
}

export const Folder = ({ label, inputVisible, handleExpand, handleNewFolder, handleNewFile }: folderProps) => {
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
    <div ref={containerRef} className="flex w-80 items-center justify-between bg-amber-300  p-1">
      {isInputVisible ? (
        <div className="flex items-center">
          <FontAwesomeIcon className="pr-3" icon={faFolder} />
          <input
            className="w-28"
            value={inputValue}
            onKeyDown={handleChange}
            onChange={(evt) => setInputValue(evt.target.value)}
          />
        </div>
      ) : (
        <>
          <div>
            <FontAwesomeIcon className="pr-3" icon={faFolder} />
            <span className="cursor-pointer" onClick={handleExpand}>
              {fileName}
            </span>
          </div>
          <div>
            <button className="m-1 border-2 border-slate-900" onClick={handleNewFolder}>
              Folder +
            </button>
            <button className="m-1 border-2 border-slate-900" onClick={handleNewFile}>
              File +
            </button>
          </div>
        </>
      )}
    </div>
  );
};
