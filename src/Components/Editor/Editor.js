import first from 'lodash/first';
import React, { useState, useCallback, useEffect } from 'react';
import AceEditor from "react-ace";
import { useRecoilState } from "recoil";
import { combine } from './soql';
import { Queries } from '../../State/Queries';

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-xcode";

export const Editor = () => {
  const [text, setText] = useState('');
  const [selection, setSelection] = useState(undefined);
  const [markers, setMarkers] = useState([]);
  const [queries, setQueries] = useRecoilState(Queries);

  useEffect(() => {
    if (!selection || !text) return;
    const lines = text.split('\n');
    const _queries = combine(text);
    const [currentQueryCursor, isValid] = first(_queries.filter(([query]) => {
      const { start, end } = query;
      return start <= selection.row && end >= selection.row;
    })) || [];

    if (!currentQueryCursor) {
      setQueries([]);
      return;
    }

    const { start, end } = currentQueryCursor;
    const _markers = [];
    for (let i = start; i < end + 1; i++) {
      const line = lines[i];
      _markers.push({
        startRow: i,
        startCol: 0,
        endRow: i,
        endCol: line.trim().length || 10,
        className: isValid ? 'valid-marker' : 'error-marker',
        type: 'background'
      });
    }

    setMarkers(_markers);

    const currentQuery = lines.slice(start, end + 1).join('\n');
    setQueries([currentQuery]);
  }, [text, selection, setQueries]);

  const onChange = useCallback((value) => {
    setText(value);
  }, [setText]);

  const onCursorChange = useCallback((_selection) => {
    setSelection({
      row: (_selection ? _selection.cursor.row : undefined)
    });
  }, []);

  return (
    <AceEditor
      style={{ width: '100%' }}
      showGutter={true}
      mode="sql"
      theme="xcode"
      name="MAIN_EDITOR"
      value={text}
      onChange={onChange}
      onCursorChange={onCursorChange}
      editorProps={{ $blockScrolling: true }}
      markers={markers}
    />
  );
};
