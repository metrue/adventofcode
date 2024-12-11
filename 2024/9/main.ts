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
  const rearranged = freeDisk(decoded);
  // console.warn(rearranged);
  return rearranged.reduce((acc, cur, index) => {
    if (cur >= 0) {
      return acc + parseInt(cur, 10) * index;
    }
    return acc;
  }, 0);
};

const findFree = (pointers: any[], len: number): number[] => {
  let start = 0;
  let end = 0;
  while (start < pointers.length - 1) {
    if (pointers[start] !== '.' && pointers[end] !== '.') {
      start++;
      end++;
    } else {
      if (pointers[end] === '.') {
        end++;
      } else {
        if (end - start >= len) {
          return [start, end - 1];
        } else {
          start = end;
        }
      }
    }
  }
  return [];
};

const move = (files: number[], frees: number[], pointers: any[]) => {
  if (files[1] - files[0] >= frees[1] - frees[0]) {
    return;
  }

  for (let i = 0; i <= files[1] - files[0]; i++) {
    console.warn('-->', i);
    pointers[frees[0] + i] = pointers[files[0] + i];
    pointers[files[0] + i] = '.';
  }
};

const moveFile = (fileStart: number, fileEnd: number, pointers: any[]) => {
  let start = 0;
  let end = 0;
  while (end <= fileEnd) {
    if (pointers[start] !== '.') {
      start++;
      end++;
    } else {
      if (pointers[start] === '.' && pointers[end] === '.') {
        end++;
      }
      if (pointers[end] !== '.') {
        if (end - start >= fileStart - fileEnd && end <= fileEnd) {
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

  const moved: Record<string, boolean> = {};

  while (fileStart > 0) {
    if (pointers[fileStart] === '.') {
      fileStart--;
      fileEnd--;
    } else {
      if (pointers[fileEnd] === pointers[fileStart]) {
        fileEnd--;
      } else {
        console.warn('found files', [fileStart, fileEnd + 1]);
        const frees = findFree(pointers, fileStart - fileEnd);
        console.warn('found frees', frees);
        if (
          !moved[pointers[fileStart]] &&
          frees.length > 0 &&
          frees[1] < fileEnd + 1
        ) {
          console.warn('before ->', pointers);
          move([fileEnd + 1, fileStart], frees, pointers);
          moved[pointers[fileStart]] = true;
          console.warn('after ->', pointers);
        } else {
          console.warn('skip', pointers[fileStart]);
        }
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
