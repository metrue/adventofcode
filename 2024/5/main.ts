enum POS {
  BEFORE = 'before',
  AFTER = 'after',
}
type Rules = Record<string, Record<POS, string[]>>;

const check = (update: string[], rules: Rules): boolean => {
  for (let i = 0; i < update.length; i++) {
    const cur = update[i];
    const beforeSet = rules[cur][POS.BEFORE];
    const afterSet = rules[cur][POS.AFTER];

    // check if there's a before number in the afterSet
    for (let j = 0; j < i; j++) {
      if (afterSet.indexOf(update[j]) !== -1) {
        return false;
      }
    }
    // check if there's a after number in the beforeSet
    for (let j = i + 1; j < update.length; j++) {
      if (beforeSet.indexOf(update[j]) !== -1) {
        return false;
      }
    }
  }
  return true;
};

export const getMiddleSumOfOrderred = (s: string): string[] => {
  const rules: Rules = {};
  const updates = [];
  let ruleStarted = true;
  let updateStarted = false;
  s.split('\n').forEach(l => {
    if (l === '') {
      ruleStarted = false;
      updateStarted = true;
    } else if (ruleStarted) {
      const [left, right] = l.split('|');
      if (!rules[left]) {
        rules[left] = {
          [POS.BEFORE]: [],
          [POS.AFTER]: [],
        };
      }
      if (!rules[right]) {
        rules[right] = {
          [POS.BEFORE]: [],
          [POS.AFTER]: [],
        };
      }
      rules[left][POS.AFTER].push(right);
      rules[right][POS.BEFORE].push(left);
    } else if (updateStarted) {
      updates.push(l.split(','));
    }
  });

  const corrects = [];
  updates.filter(u => {
    if (check(u, rules)) {
      corrects.push(u);
    }
  });

  return corrects.reduce((acc, cur) => {
    return acc + parseInt(cur[Math.floor(cur.length / 2)], 10);
  }, 0);
};

const fix = (update: string[], rules: Rules): string[] => {
  update.sort((a, b) => {
    if (rules[a][POS.BEFORE].indexOf(b) !== -1) {
      return -1;
    }
    if (rules[a][POS.AFTER].indexOf(b) !== -1) {
      return 1;
    }

    if (rules[b][POS.BEFORE].indexOf(a) !== -1) {
      return 1;
    }
    if (rules[b][POS.AFTER].indexOf(a) !== -1) {
      return -1;
    }

    return 0;
  });
  return update;
};

export const getMiddleSumOfFixOrderred = (s: string): string[] => {
  const rules: Rules = {};
  const updates = [];
  let ruleStarted = true;
  let updateStarted = false;
  s.split('\n').forEach(l => {
    if (l === '') {
      ruleStarted = false;
      updateStarted = true;
    } else if (ruleStarted) {
      const [left, right] = l.split('|');
      if (!rules[left]) {
        rules[left] = {
          [POS.BEFORE]: [],
          [POS.AFTER]: [],
        };
      }
      if (!rules[right]) {
        rules[right] = {
          [POS.BEFORE]: [],
          [POS.AFTER]: [],
        };
      }
      rules[left][POS.AFTER].push(right);
      rules[right][POS.BEFORE].push(left);
    } else if (updateStarted) {
      updates.push(l.split(','));
    }
  });

  const corrects = [];
  updates.filter(u => {
    if (!check(u, rules)) {
      corrects.push(fix(u, rules));
    }
  });

  return corrects.reduce((acc, cur) => {
    return acc + parseInt(cur[Math.floor(cur.length / 2)], 10);
  }, 0);
};
