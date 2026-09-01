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
  scopeRows: {
    christianity: {
      label: 'Christianity',
      sourceCategory: 'Christians',
      displayValue: 62,
    },
    judaism: {
      label: 'Judaism',
      sourceCategory: 'Jewish',
      displayValue: 2,
    },
    islam: {
      label: 'Islam',
      sourceCategory: 'Muslim',
      displayValue: 1,
    },
    hinduism: {
      label: 'Hinduism',
      sourceCategory: 'Hindu',
      displayValue: 1,
    },
    buddhism: {
      label: 'Buddhism',
      sourceCategory: 'Buddhist',
      displayValue: 1,
    },
    bahai: {
      label: "Baha'i",
      sourceCategory: 'Not separately reported',
      displayValue: 'Not separately reported',
    },
  },
  christianComponents: {
    evangelical: {
      sourceCategory: 'Evangelical Protestant',
      displayValue: 23,
    },
    mainline: {
      sourceCategory: 'Mainline Protestant',
      displayValue: 11,
    },
    historicallyBlack: {
      sourceCategory: 'Historically Black Protestant',
      displayValue: 5,
    },
    catholic: {
      sourceCategory: 'Catholic',
      displayValue: 19,
    },
    lds: {
      sourceCategory: 'Latter-day Saint (Mormon)',
      displayValue: 2,
    },
    orthodox: {
      sourceCategory: 'Orthodox Christian',
      displayValue: 1,
    },
    jehovahsWitness: {
      sourceCategory: "Jehovah's Witness",
      displayValue: '<1',
    },
    otherChristian: {
      sourceCategory: 'Other Christian',
      displayValue: 1,
    },
  },
} as const