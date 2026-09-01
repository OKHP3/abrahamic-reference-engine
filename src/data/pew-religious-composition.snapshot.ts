/**
 * Checked-in display snapshot for the cited Pew Religious composition table.
 *
 * Update this snapshot and the source-backed notes in traditions.ts together
 * when Pew publishes a new table or changes a displayed category value.
 */
export const PEW_RLS_SOURCE_SNAPSHOT = {
  source: 'Pew Research Center',
  year: 2025,
  url: 'https://www.pewresearch.org/religious-landscape-study/region/united-states/',
  reportTitle: '2023-24 U.S. Religious Landscape Study',
  table: 'Interactive database → U.S. adults → Religious composition → 2023-24',
  denominator: 'U.S. adults',
  fieldworkDate: 'July 17, 2023–March 4, 2024',
  publicationDate: 'February 26, 2025',
  retrievedDate: 'August 31, 2026',
  denominations: {
    'christianity-evangelical': {
      sourceCategory: 'Evangelical Protestant',
      displayValue: 23,
    },
    'christianity-catholic': {
      sourceCategory: 'Catholic',
      displayValue: 19,
    },
    'christianity-mainline': {
      sourceCategory: 'Mainline Protestant',
      displayValue: 11,
    },
    'christianity-lds': {
      sourceCategory: 'Latter-day Saint (Mormon)',
      displayValue: 2,
    },
    'christianity-orthodox': {
      sourceCategory: 'Orthodox Christian',
      displayValue: 1,
    },
    judaism: {
      sourceCategory: 'Jewish',
      displayValue: 2,
    },
    islam: {
      sourceCategory: 'Muslim',
      displayValue: 1,
    },
  },
  groups: {
    christianity: {
      sourceCategory: 'Christians',
      displayValue: 62,
    },
    judaism: {
      sourceCategory: 'Jewish',
      displayValue: 2,
    },
    islam: {
      sourceCategory: 'Muslim',
      displayValue: 1,
    },
  },
} as const