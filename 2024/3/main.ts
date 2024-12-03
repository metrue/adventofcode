export const multiplications = (s: string): number => {
  let sum = 0;

  let start = false;
  let leftStart = false;
  let rightStart = false;
  let left = '';
  let right = '';
  for (let i = 0; i < s.length; i++) {
    if (start) {
      if (leftStart) {
        if (s[i] === ',') {
          leftStart = false;
          rightStart = true;
        } else if (s[i] >= '0' && s[i] <= '9') {
          left += s[i];
        } else {
          start = false;
          leftStart = false;
          rightStart = false;
          left = '';
          right = '';
        }
      } else if (rightStart) {
        if (s[i] === ')') {
          sum += parseInt(left, 10) * parseInt(right, 10);

          left = '';
          right = '';

          start = false;
          leftStart = false;
          rightStart = false;
        } else if (s[i] >= '0' && s[i] <= '9') {
          right += s[i];
        } else {
          start = false;
          leftStart = false;
          rightStart = false;

          left = '';
          right = '';
        }
      }
    } else {
      if (s[i] + s[i + 1] + s[i + 2] + s[i + 3] === 'mul(') {
        start = true;
        leftStart = true;
        i += 3;
      }
    }
  }
  return sum;
};

export const multiplicationsWithInstruction = (s: string): number => {
  const DO = 'do()';
  const DONT = "don't()";

  s = `${DO}${s}`;

  let sum = 0;

  let instructionStart = false;

  let start = false;

  let leftStart = false;
  let rightStart = false;
  let left = '';
  let right = '';
  for (let i = 0; i < s.length; i++) {
    if (instructionStart) {
      if (
        s[i] +
          s[i + 1] +
          s[i + 2] +
          s[i + 3] +
          s[i + 4] +
          s[i + 5] +
          s[i + 6] ===
        DONT
      ) {
        instructionStart = false;
        i += 6;
      } else {
        if (start) {
          if (leftStart) {
            if (s[i] === ',') {
              leftStart = false;
              rightStart = true;
            } else if (s[i] >= '0' && s[i] <= '9') {
              left += s[i];
            } else {
              start = false;
              leftStart = false;
              rightStart = false;
              left = '';
              right = '';
            }
          } else if (rightStart) {
            if (s[i] === ')') {
              sum += parseInt(left, 10) * parseInt(right, 10);

              left = '';
              right = '';

              start = false;
              leftStart = false;
              rightStart = false;
            } else if (s[i] >= '0' && s[i] <= '9') {
              right += s[i];
            } else {
              start = false;
              leftStart = false;
              rightStart = false;

              left = '';
              right = '';
            }
          }
        } else {
          if (s[i] + s[i + 1] + s[i + 2] + s[i + 3] === 'mul(') {
            start = true;
            leftStart = true;
            i += 3;
          }
        }
      }
    } else {
      if (s[i] + s[i + 1] + s[i + 2] + s[i + 3] === DO) {
        instructionStart = true;
        i += 3;
      }
    }
  }
  return sum;
};
