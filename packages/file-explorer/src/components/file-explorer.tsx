import { File } from './file';
import { Folder } from './folder';

export const FileExplorer = () => {
  return (
    <>
      <div>File Explorer</div>
      <div>
        <Folder />
      </div>
      <div>
        <File />
      </div>
    </>
  );
};
