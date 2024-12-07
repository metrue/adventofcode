interface Calibration {
  result: number;
  digits: number[];
}

export enum Operation {
  mul = '*',
  add = '+',
  concatenation = '||',
}

export const getCalibrationResult = (s: string, operators: Operation[]) => {
  const calibrations: Calibration[] = s.split('\n').map(l => {
    const [a, b] = l.split(':');
    const result = parseInt(a, 10);
    const digits = b
      .trim()
      .split(' ')
      .map(d => parseInt(d, 10));
    return {
      result,
      digits,
    };
  });

  let sum = 0;
  for (const c of calibrations) {
    const resultSet = dp(c.digits, operators);
    //    console.warn(c.digits, resultSet);
    if (resultSet.indexOf(c.result) !== -1) {
      sum += c.result;
    }
  }

  return sum;
};

const dp = (list: number[], operators: Operation[]): number[] => {
  if (list.length === 0) {
    return [];
  }

  if (list.length === 1) {
    return [list[0]];
  }

  const results = [];
  for (const r of dp(list.slice(0, list.length - 1), operators)) {
    for (const op of operators) {
      if (Operation.add === op) {
        results.push(r + list[list.length - 1]);
      } else if (Operation.mul === op) {
        results.push(r * list[list.length - 1]);
      } else if (Operation.concatenation === op) {
        results.push(
          parseInt(r.toString() + list[list.length - 1].toString(), 10),
        );
      }
    }
  }
  return results;
};
