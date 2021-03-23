import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-xcode";

export const Editor = () => {
  return (
    <AceEditor
      style={{ width: '100%' }}
      mode="sql"
      theme="xcode"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
};
