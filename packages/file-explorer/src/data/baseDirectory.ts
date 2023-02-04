type file = {
  id: string;
  type: string;
  label: string;
  inputVisible: boolean;
};

export type folder = {
  id: string;
  type: string;
  label: string;
  inputVisible: boolean;
  isExpanded: boolean;
  children: (file | folder)[];
};

export const baseDirectory: folder = {
  id: '1',
  type: 'folder',
  label: 'documents',
  inputVisible: false,
  isExpanded: true,
  children: [
    {
      id: '2',
      type: 'file',
      label: 'inner.txt',
      inputVisible: false,
    },
    {
      id: '3',
      type: 'file',
      label: 'not visible inner.txt',
      inputVisible: false,
    },
    {
      id: '4',
      type: 'folder',
      label: 'inner folder',
      inputVisible: false,
      isExpanded: true,
      children: [{ id: '5', type: 'file', label: 'wow.jpg', inputVisible: false }],
    },
  ],
};
