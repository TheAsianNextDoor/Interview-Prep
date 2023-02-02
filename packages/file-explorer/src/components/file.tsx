import { useState } from 'react';

interface props {
  fileLabel: string;
}

export const File = ({ fileLabel }: props) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div className="bg-lime-300 p-5">
      {hasFocus ? (
        <input />
      ) : (
        <div>
          <label onClick={() => setHasFocus(true)}> hi</label>
        </div>
      )}
    </div>
  );
};
