export type DailyChallenge = {
  prompt: string;
  hint: string;
  href: string;
};

const HOME_CHALLENGES: DailyChallenge[] = [
  { prompt: 'LISTEN', hint: 'Exact anagrams of a familiar 6-letter word', href: '/?q=LISTEN&mode=exact' },
  { prompt: 'REPLAY', hint: 'Find every exact anagram in the rack', href: '/?q=REPLAY&mode=exact' },
  { prompt: 'TEACHER', hint: 'Unscramble a 7-letter classroom word', href: '/?q=TEACHER&mode=exact' },
  { prompt: 'MEDICAL', hint: 'Exact anagrams from a 7-letter stem', href: '/?q=MEDICAL&mode=exact' },
  { prompt: 'SILENT', hint: 'The classic partner of LISTEN', href: '/?q=SILENT&mode=exact' },
];

const PHRASE_CHALLENGES: DailyChallenge[] = [
  { prompt: 'THE EYES', hint: 'A classic 2-word phrase anagram', href: '/tools/multiple-words?q=THE+EYES' },
  { prompt: 'SCHOOLMASTER', hint: 'Turns into a 2-word classroom phrase', href: '/tools/multiple-words?q=SCHOOLMASTER' },
  { prompt: 'DORMITORY', hint: 'A messy two-word bedroom anagram', href: '/tools/multiple-words?q=DORMITORY' },
  { prompt: 'ASTRONOMER', hint: 'A two-word sky-watcher anagram', href: '/tools/multiple-words?q=ASTRONOMER' },
  { prompt: 'A GENTLEMAN', hint: 'A polite two-word name anagram', href: '/tools/multiple-words?q=A+GENTLEMAN' },
];

function pickChallenge(list: DailyChallenge[], date: Date): DailyChallenge {
  const utcDay = Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86_400_000);
  return list[Math.abs(utcDay) % list.length];
}

export function getHomeDailyChallenge(date = new Date()): DailyChallenge {
  return pickChallenge(HOME_CHALLENGES, date);
}

export function getPhraseDailyChallenge(date = new Date()): DailyChallenge {
  return pickChallenge(PHRASE_CHALLENGES, date);
}
