export const getSafeReportNumber = (s: string): number => {
  const safeReports = s.split('\n').filter(line => {
    const digits = line
      .trim()
      .split(/\s+/)
      .map(n => parseInt(n, 10));
    return isValidReport(digits);
  });
  return safeReports.length;
};

export const getSafeReportNumberWithTolerate = (s: string): number => {
  const safeReports = s.split('\n').filter(line => {
    const digits = line
      .trim()
      .split(/\s+/)
      .map(n => parseInt(n, 10));

    if (isValidReport(digits)) {
      return true;
    } else {
      for (let i = 0; i < digits.length; i++) {
        if (isValidReportByRemoving(digits.slice(), i)) {
          return true;
        }
      }
    }
    return false;
  });
  return safeReports.length;
};

const isValidReport = (digits: number[]): boolean => {
  let direction = undefined;
  for (let i = 1; i < digits.length; i++) {
    const cur = digits[i];
    const pre = digits[i - 1];

    const diff = cur - pre;
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
    if (i === 1) {
      direction = cur - pre;
    } else {
      if (direction * diff <= 0) {
        return false;
      }
    }
  }
  return true;
};

const isValidReportByRemoving = (digits: number[], index: number): boolean => {
  digits.splice(index, 1);
  return isValidReport(digits);
};
