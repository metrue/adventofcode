export const decodeDiskMap = (lst: number[]): any[] => {
  const codes = [];
  lst.forEach((d, index) => {
    if (index % 2 === 0) {
      for (let i = 0; i < d; i++) {
        codes.push(index / 2);
      }
    } else {
      for (let i = 0; i < d; i++) {
        codes.push('.');
      }
    }
  });
  return codes;
};

export const freeDisk = (pointers: any[]) => {
  let i = 0;
  let j = pointers.length - 1;
  while (i < j) {
    if (pointers[i] === '.' && pointers[j] !== '.') {
      pointers[i] = pointers[j];
      pointers[j] = '.';
    } else {
      if (pointers[i] !== '.') {
        i++;
      }
      if (pointers[j] === '.') {
        j--;
      }
    }
  }
  return pointers;
};

export const checksum = (s: string): number => {
  const lst = s.split('').map(d => parseInt(d, 10));

  const decoded = decodeDiskMap(lst);
  console.warn('+++');
  console.warn(decoded.slice(0, 100));
  console.warn('+++');
  const rearranged = freeDisk(decoded);
  // console.warn(rearranged);
  return rearranged.reduce((acc, cur, index) => {
    if (cur >= 0) {
      return acc + parseInt(cur, 10) * index;
    }
    return acc;
  }, 0);
};

const moveFile = (fileStart: number, fileEnd: number, pointers: any[]) => {
  let start = 0;
  let end = 0;
  while (start < pointers.length) {
    if (pointers[start] !== '.') {
      start++;
      end++;
    } else {
      if (pointers[start] === '.' && pointers[end] === '.') {
        end++;
      }
      if (pointers[end] !== '.') {
        if (end - start >= fileStart - fileEnd && end <= fileEnd) {
          // [ 2, 5 ] [ 39, 41 ]
          // console.warn('move', [start, end], [fileEnd, fileStart], pointers);
          for (let i = 0; i < fileStart - fileEnd; i++) {
            console.warn(i, start + i);
            pointers[start + i] = pointers[fileStart - i];
            pointers[fileStart - i] = '.';
          }
          // console.warn('after move', pointers);
          break;
        } else {
          start = end;
        }
      }
    }
  }
};

export const freeDisk2 = (pointers: any[]) => {
  let fileStart = pointers.length - 1;
  let fileEnd = pointers.length - 1;

  while (fileStart > 0) {
    if (pointers[fileStart] === '.') {
      fileStart--;
      fileEnd--;
    } else {
      if (pointers[fileEnd] === pointers[fileStart]) {
        fileEnd--;
      } else {
        // console.warn('found', fileStart, fileEnd, pointers);
        moveFile(fileStart, fileEnd, pointers);
        fileStart = fileEnd;
      }
    }
  }
  return pointers;
};

export const checksum2 = (s: string): number => {
  const lst = s.split('').map(d => parseInt(d, 10));

  const decoded = decodeDiskMap(lst);
  const rearranged = freeDisk2(decoded);
  console.warn(rearranged);
  return rearranged.reduce((acc, cur, index) => {
    if (cur >= 0) {
      return acc + parseInt(cur, 10) * index;
    }
    return acc;
  }, 0);
};
