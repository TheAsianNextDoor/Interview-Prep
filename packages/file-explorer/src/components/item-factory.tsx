import { useState } from 'react';

import { File } from './file';
import { Folder } from './folder';

import type { folder } from '../data/baseDirectory';

interface props {
  root: folder;
  directory: folder;
  addItemToDirectory: (tree: folder, folderId: string, label: string, isFolder: boolean) => any;
}

export const ItemFactory = ({ root, directory, addItemToDirectory }: props) => {
  const { id, label, type, isExpanded, children, inputVisible } = directory;
  const [expanded, setExpanded] = useState(isExpanded);

  const handleNewFile = () => {
    addItemToDirectory(root, id, 'new file', false);
  };

  const handleNewFolder = () => {
    addItemToDirectory(root, id, 'new folder', true);
  };

  if (type === 'file') {
    return <File label={label} inputVisible={inputVisible} />;
  }

  return (
    <>
      <Folder
        label={label}
        inputVisible={inputVisible}
        handleExpand={() => setExpanded((prev) => !prev)}
        handleNewFile={handleNewFile}
        handleNewFolder={handleNewFolder}
      />
      <div className="pl-7" style={{ display: expanded ? 'block' : 'none' }}>
        {children?.map((item) => (
          <ItemFactory key={item.id} root={root} directory={item} addItemToDirectory={addItemToDirectory} />
        ))}
      </div>
    </>
  );
};
