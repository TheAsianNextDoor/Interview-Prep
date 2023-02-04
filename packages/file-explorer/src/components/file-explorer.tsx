import produce from 'immer';
import { useState } from 'react';

import { ItemFactory } from './item-factory';
import { baseDirectory } from '../data/baseDirectory';

import type { folder } from '../data/baseDirectory';

export const FileExplorer = () => {
  const [directory, setDirectory] = useState(baseDirectory);

  const addItem = (tree: folder, folderId: string, label: string, isFolder: boolean) => {
    if (tree.id === folderId && tree.type === 'folder') {
      tree.children.unshift({
        id: crypto.randomUUID(),
        type: isFolder ? 'folder' : 'file',
        label,
        inputVisible: true,
        ...(isFolder && { isExpanded: true }),
        ...(isFolder && { children: [] }),
      });

      return;
    }

    tree?.children?.forEach((item) => {
      return addItem(item, folderId, label, isFolder);
    });
  };

  const addItemToDirectory = (rootDir: folder, folderId: string, label: string, isFolder: boolean) => {
    const state = produce(rootDir, (draft) => {
      addItem(draft, folderId, label, isFolder);
    });

    setDirectory(state);
  };

  return (
    <>
      <div>File Explorer</div>
      <div>
        <ItemFactory root={directory} directory={directory} addItemToDirectory={addItemToDirectory} />
      </div>
    </>
  );
};
