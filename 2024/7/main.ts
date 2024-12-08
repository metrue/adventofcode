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
    if (backtrace(c.digits, c.result, operators)) {
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

const backtrace = (
  digits: number[],
  result: number,
  operators: Operation[],
): boolean => {
  if (digits.length === 0) {
    return false;
  }
  if (digits.length === 1) {
    return digits[0] === result;
  }

  const last = digits[digits.length - 1];
  for (const op of operators) {
    if (Operation.add === op) {
      if (
        backtrace(digits.slice(0, digits.length - 1), result - last, operators)
      ) {
        return true;
      }
    } else if (Operation.mul === op) {
      if (
        backtrace(digits.slice(0, digits.length - 1), result / last, operators)
      ) {
        return true;
      }
    } else if (Operation.concatenation === op) {
      const resultNumber = result.toString().split('');
      const lastNumber = last.toString().split('');
      while (lastNumber.length > 0) {
        if (lastNumber.pop() !== resultNumber.pop()) {
          break;
        }
      }
      if (lastNumber.length > 0) {
        continue;
      } else {
        if (
          backtrace(
            digits.slice(0, digits.length - 1),
            parseInt(resultNumber.join(''), 10),
            operators,
          )
        ) {
          return true;
        }
      }
    }
  }
};
