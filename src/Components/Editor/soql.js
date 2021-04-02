import clone from 'lodash/cloneDeep';
import { isQueryValid } from 'soql-parser-js';

export const combine = (text = '') => {
  const lines = text.split('\n').map((line, i) => [line, i]);
  const queries = [];
  for (let i = 0, j = 0; i < lines.length; i++) {
    const [line, index] = lines[i];
    if (!line.trim()) continue;

    if (isQueryValid(line)) {
      queries[j] = { text: line.trim(), start: index, end: index };
      j++;
      continue;
    }

    const previous = i > 0 ? queries[j - 1] : {};
    const previousText = previous ? previous.text : undefined;
    if (previousText) {
      const mixed = previousText + ' ' + line.trim();
      if (isQueryValid(mixed)) {
        queries[j - 1].text = mixed;
        queries[j - 1].end = index;
        continue;
      }
    }

    if (line) {
      queries[j] = { text: line.trim(), start: index, end: index };
      j++;
    }
  }

  return queries.map(q => [q, isQueryValid(q.text)]);
};

