/**
 * celestial.ts
 * Abrahamic Reference Engine
 *
 * Client-side lunar phase and celestial calculations.
 * Pure math -- no API, no network, no dependencies.
 * Adapted from okhp3-celestial-data skill (MIT License).
 *
 * Moon phase accuracy: +-12 hours of exact phase transition.
 * Sufficient for calendar display purposes.
 */

// ---------------------------------------------------------------------------
// Julian Date conversion
// ---------------------------------------------------------------------------

function toJulianDate(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return 367 * y
    - Math.floor(7 * (y + Math.floor((m + 9) / 12)) / 4)
    + Math.floor(275 * m / 9)
    + d + 1721013.5;
}

// ---------------------------------------------------------------------------
// Moon Phase
// ---------------------------------------------------------------------------

const KNOWN_NEW_MOON = 2451550.1;    // Jan 6, 2000 new moon (Julian date)
const SYNODIC_MONTH  = 29.53058867;  // average lunar cycle in days

const MOON_PHASES = [
  { name: 'New Moon',        emoji: '🌑', min: 0,      max: 0.0625 },
  { name: 'Waxing Crescent', emoji: '🌒', min: 0.0625, max: 0.25   },
  { name: 'First Quarter',   emoji: '🌓', min: 0.25,   max: 0.375  },
  { name: 'Waxing Gibbous',  emoji: '🌔', min: 0.375,  max: 0.5    },
  { name: 'Full Moon',       emoji: '🌕', min: 0.5,    max: 0.625  },
  { name: 'Waning Gibbous',  emoji: '🌖', min: 0.625,  max: 0.75   },
  { name: 'Last Quarter',    emoji: '🌗', min: 0.75,   max: 0.875  },
  { name: 'Waning Crescent', emoji: '🌘', min: 0.875,  max: 1.0    },
] as const;

export type MoonPhaseName =
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent';

export type MoonPhase = {
  name: MoonPhaseName;
  emoji: string;
  illumination: number;
  daysUntilNext: number;
};

export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const jd = toJulianDate(date);
  const raw = ((jd - KNOWN_NEW_MOON) % SYNODIC_MONTH) / SYNODIC_MONTH;
  const phase = ((raw % 1) + 1) % 1;
  const current = MOON_PHASES.find(p => phase >= p.min && phase < p.max) ?? MOON_PHASES[0];
  const illumination = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
  const daysUntilNext = Math.ceil((current.max - phase) * SYNODIC_MONTH);
  return { name: current.name as MoonPhaseName, emoji: current.emoji, illumination, daysUntilNext };
}

export function getNextLunarEvents(count = 3) {
  const events: { type: 'New Moon' | 'Full Moon'; date: Date; emoji: string }[] = [];
  let d = new Date();
  while (events.length < count * 2) {
    d = new Date(d.getTime() + 86400000);
    const phase = getMoonPhase(d);
    if (phase.daysUntilNext <= 1) {
      if (phase.name === 'New Moon')  events.push({ type: 'New Moon',  date: new Date(d), emoji: '🌑' });
      if (phase.name === 'Full Moon') events.push({ type: 'Full Moon', date: new Date(d), emoji: '🌕' });
    }
    if (events.length >= count * 2) break;
  }
  return events.slice(0, count * 2);
}

// ---------------------------------------------------------------------------
// Astrological Season
// ---------------------------------------------------------------------------

const ASTRO_SEASONS = [
  { sign: 'Capricorn',   emoji: '♑', element: 'Earth' as const, dates: 'Dec 22 - Jan 19', startMD: 1222, endMD: 119  },
  { sign: 'Aquarius',    emoji: '♒', element: 'Air'   as const, dates: 'Jan 20 - Feb 18', startMD: 120,  endMD: 218  },
  { sign: 'Pisces',      emoji: '♓', element: 'Water' as const, dates: 'Feb 19 - Mar 20', startMD: 219,  endMD: 320  },
  { sign: 'Aries',       emoji: '♈', element: 'Fire'  as const, dates: 'Mar 21 - Apr 19', startMD: 321,  endMD: 419  },
  { sign: 'Taurus',      emoji: '♉', element: 'Earth' as const, dates: 'Apr 20 - May 20', startMD: 420,  endMD: 520  },
  { sign: 'Gemini',      emoji: '♊', element: 'Air'   as const, dates: 'May 21 - Jun 20', startMD: 521,  endMD: 620  },
  { sign: 'Cancer',      emoji: '♋', element: 'Water' as const, dates: 'Jun 21 - Jul 22', startMD: 621,  endMD: 722  },
  { sign: 'Leo',         emoji: '♌', element: 'Fire'  as const, dates: 'Jul 23 - Aug 22', startMD: 723,  endMD: 822  },
  { sign: 'Virgo',       emoji: '♍', element: 'Earth' as const, dates: 'Aug 23 - Sep 22', startMD: 823,  endMD: 922  },
  { sign: 'Libra',       emoji: '♎', element: 'Air'   as const, dates: 'Sep 23 - Oct 22', startMD: 923,  endMD: 1022 },
  { sign: 'Scorpio',     emoji: '♏', element: 'Water' as const, dates: 'Oct 23 - Nov 21', startMD: 1023, endMD: 1121 },
  { sign: 'Sagittarius', emoji: '♐', element: 'Fire'  as const, dates: 'Nov 22 - Dec 21', startMD: 1122, endMD: 1221 },
];

export function getAstroSeason(date: Date = new Date()) {
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  const found = ASTRO_SEASONS.find(s =>
    s.startMD > s.endMD
      ? md >= s.startMD || md <= s.endMD
      : md >= s.startMD && md <= s.endMD
  );
  return found ?? ASTRO_SEASONS[0];
}

// ---------------------------------------------------------------------------
// Mercury Retrograde (hardcoded through 2028 -- update annually)
// ---------------------------------------------------------------------------

const MERCURY_RETROGRADE = [
  { start: '2026-03-15', end: '2026-04-07' },
  { start: '2026-07-17', end: '2026-08-11' },
  { start: '2026-11-11', end: '2026-12-01' },
  { start: '2027-03-03', end: '2027-03-25' },
  { start: '2027-07-03', end: '2027-07-28' },
  { start: '2027-10-27', end: '2027-11-16' },
  { start: '2028-02-15', end: '2028-03-09' },
  { start: '2028-06-16', end: '2028-07-11' },
  { start: '2028-10-09', end: '2028-10-30' },
];

export function getMercuryStatus(date: Date = new Date()) {
  const iso = date.toISOString().split('T')[0];
  const period = MERCURY_RETROGRADE.find(r => iso >= r.start && iso <= r.end);
  return { retrograde: !!period, endDate: period?.end ?? null };
}
