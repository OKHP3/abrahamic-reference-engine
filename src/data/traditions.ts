import type { PewCitation, Denomination, TraditionGroup } from '../types'

const PEW_RLS_URL = 'https://www.pewresearch.org/religious-landscape-study/region/united-states/'
const PEW_RLS_REPORT = '2023-24 U.S. Religious Landscape Study'
const PEW_RLS_TABLE = 'Interactive database → U.S. adults → Religious composition → 2023-24'
const PEW_RLS_DENOMINATOR = 'U.S. adults'
const PEW_RLS_FIELDWORK = 'July 17, 2023–March 4, 2024'
const PEW_RLS_PUBLICATION = 'February 26, 2025'
const PEW_RLS_RETRIEVED = 'August 31, 2026'

function pewCitation(
  sourceCategory: string,
  extractionNote: string,
  compatibilityNote: string,
  status: PewCitation['status'] = 'confirmed'
): PewCitation {
  return {
    source: 'Pew Research Center',
    year: 2025,
    url: PEW_RLS_URL,
    reportTitle: PEW_RLS_REPORT,
    table: PEW_RLS_TABLE,
    sourceCategory,
    denominator: PEW_RLS_DENOMINATOR,
    fieldworkDate: PEW_RLS_FIELDWORK,
    publicationDate: PEW_RLS_PUBLICATION,
    retrievedDate: PEW_RLS_RETRIEVED,
    extractionNote,
    compatibilityNote,
    status,
  }
}

export const DENOMINATIONS: Denomination[] = [
  {
    id: 'christianity-evangelical',
    name: 'Evangelical Protestant',
    shortName: 'Evangelical',
    family: 'christianity',
    pewPercent: 23,
    pewCitation: pewCitation(
      'Evangelical Protestant',
      'Read the top-level Evangelical Protestant category as published; this is a whole-percent display value, not a sum of the nested church-family rows.',
      'The survey category is a self-identification grouping, not a statement about a church’s canon, doctrine, or API coverage.'
    ),
    description:
      'The largest single Christian grouping in the US, emphasizing personal salvation, biblical authority, and evangelism. Includes Baptist, Pentecostal, non-denominational, and other evangelical churches.',
    keyTexts: ['Holy Bible (66 books)', 'Old Testament', 'New Testament'],
    canonScope: 'Protestant canon (66 books): 39 OT + 27 NT',
    slug: 'evangelical-protestant',
    availableTranslations: ['kjv', 'web', 'asv', 'bbe', 'darby'],
    defaultTranslationId: 'kjv',
    apiProvider: 'bible-api.com',
  },
  {
    id: 'christianity-catholic',
    name: 'Catholic',
    shortName: 'Catholic',
    family: 'christianity',
    pewPercent: 19,
    pewCitation: pewCitation(
      'Catholic',
      'Read the top-level Catholic category as published; this is a whole-percent display value.',
      'The population category is compatible with the app’s Catholic lens, but does not measure Catholic canon adherence or the completeness of the available translation set.'
    ),
    description:
      'The largest single Christian denomination worldwide, centered on apostolic succession, the Eucharist, and the Magisterium. The Catholic canon includes the deuterocanonical books not found in Protestant Bibles.',
    keyTexts: ['Holy Bible (73 books)', 'Catechism of the Catholic Church'],
    canonScope: 'Catholic canon (73 books): 46 OT (including deuterocanonicals) + 27 NT',
    slug: 'catholic',
    availableTranslations: ['web', 'kjv', 'douay'],
    defaultTranslationId: 'web',
    apiProvider: 'bible-api.com',
  },
  {
    id: 'christianity-mainline',
    name: 'Mainline Protestant',
    shortName: 'Mainline',
    family: 'christianity',
    pewPercent: 11,
    pewCitation: pewCitation(
      'Mainline Protestant',
      'Read the top-level Mainline Protestant category as published; this is a whole-percent display value, not a sum of the nested denomination rows.',
      'The survey category is a self-identification grouping, not a statement about a specific Protestant denomination, canon, or API coverage.'
    ),
    description:
      'Historic Protestant denominations including Methodist, Presbyterian, Lutheran, Episcopal/Anglican, and United Church of Christ. Generally characterized by ecumenical openness and critical biblical scholarship.',
    keyTexts: ['Holy Bible (66 books)', 'Westminster Confession', 'Book of Common Prayer'],
    canonScope: 'Protestant canon (66 books): 39 OT + 27 NT',
    slug: 'mainline-protestant',
    availableTranslations: ['kjv', 'web', 'asv', 'bbe'],
    defaultTranslationId: 'kjv',
    apiProvider: 'bible-api.com',
  },
  {
    id: 'christianity-lds',
    name: 'LDS / Restorationist',
    shortName: 'LDS',
    family: 'christianity',
    pewPercent: 2,
    pewCitation: pewCitation(
      'Latter-day Saint (Mormon)',
      'Read the top-level Latter-day Saint (Mormon) category as published; the app displays the source’s whole-percent value.',
      'This source category is used as a population-context match for the app’s LDS / Restorationist lens; it does not validate the completeness of Standard Works coverage.'
    ),
    description:
      'The Latter-day Saint movement, founded by Joseph Smith in the 19th century as a restoration of original Christianity. Uses the Bible alongside additional scriptures revealed through Joseph Smith.',
    keyTexts: ['Holy Bible (KJV)', 'Book of Mormon', 'Doctrine and Covenants', 'Pearl of Great Price'],
    canonScope: 'Standard Works (4 volumes): Bible (KJV, 66 books), Book of Mormon (15 books), Doctrine and Covenants (138 sections), Pearl of Great Price -- Bible via bible-api.com; Standard Works via scriptures.nephi.org (community API)',
    slug: 'lds-restorationist',
    availableTranslations: ['kjv'],
    defaultTranslationId: 'kjv',
    apiProvider: 'bible-api.com',
  },
  {
    id: 'christianity-orthodox',
    name: 'Orthodox Christian',
    shortName: 'Orthodox',
    family: 'christianity',
    pewPercent: 1,
    pewCitation: pewCitation(
      'Orthodox Christian',
      'Read the top-level Orthodox Christian category as published; the app displays the source’s whole-percent value.',
      'This source category combines the population label used by the survey; it does not resolve Eastern versus Oriental Orthodox distinctions or imply complete Orthodox text coverage.'
    ),
    description:
      'Eastern Orthodox and Oriental Orthodox churches tracing their lineage to the early church councils. Emphasizes Tradition, liturgy, theosis, and the Church Fathers alongside Scripture.',
    keyTexts: ['Holy Bible (expanded OT)', 'Church Fathers', 'Divine Liturgy'],
    canonScope: 'Orthodox canon (Septuagint-based): typically 76-78 books -- 49 OT + 27 NT; includes Catholic deuterocanonicals plus 3 Maccabees and Psalm 151; some jurisdictions add 4 Maccabees',
    slug: 'orthodox',
    availableTranslations: ['web', 'kjv'],
    defaultTranslationId: 'web',
    apiProvider: 'bible-api.com',
  },
  {
    id: 'judaism',
    name: 'Judaism',
    shortName: 'Judaism',
    family: 'judaism',
    pewPercent: 2,
    pewCitation: pewCitation(
      'Jewish',
      'Read the top-level Jewish category under Other religions as published; the app displays the source’s whole-percent value.',
      'The population category is compatible with the app’s Judaism lens, but does not represent a denomination, level of observance, or a claim about Jewish identity.'
    ),
    description:
      "The oldest Abrahamic faith, centered on the covenant between God and the Jewish people. The Tanakh (Hebrew Bible) forms the foundational scripture, supplemented by the Talmud, Midrash, and rabbinic literature.",
    keyTexts: ["Tanakh (Torah, Nevi'im, Ketuvim)", 'Talmud (Babylonian and Jerusalem)', 'Midrash'],
    canonScope: "Tanakh: 24 books (Torah 5 + Nevi'im 8 + Ketuvim 11)",
    slug: 'judaism',
    availableTranslations: ['sefaria-en', 'sefaria-he-en'],
    defaultTranslationId: 'sefaria-en',
    apiProvider: 'sefaria.org',
  },
  {
    id: 'islam',
    name: 'Islam',
    shortName: 'Islam',
    family: 'islam',
    pewPercent: 1,
    pewCitation: pewCitation(
      'Muslim',
      'Read the top-level Muslim category under Other religions as published; the app displays the source’s whole-percent value.',
      'The population category is compatible with the app’s Islam lens, but does not distinguish sect, school, ethnicity, or level of observance.'
    ),
    description:
      "The youngest of the Abrahamic faiths, founded in the 7th century CE by the Prophet Muhammad. The Quran is considered the direct word of God (Allah), supplemented by the Hadith (sayings and actions of the Prophet).",
    keyTexts: ['The Quran (114 surahs)', 'Hadith collections (Sahih Bukhari, Sahih Muslim, etc.)'],
    canonScope: 'Quran: 114 surahs, 6,236 ayat; Hadith: multiple authenticated collections',
    slug: 'islam',
    availableTranslations: ['quran-20', 'quran-21', 'quran-22', 'quran-23', 'quran-24'],
    defaultTranslationId: 'quran-20',
    apiProvider: 'quran.com',
  },
]

export const TRADITION_GROUPS: TraditionGroup[] = [
  {
    family: 'christianity',
    label: 'Christianity',
    totalPewPercent: 62,
    pewCitation: pewCitation(
      'Christians',
      'Read the top-level Christians category as published. This value is a direct source category, not a sum of the five Christian lenses displayed by this app.',
      'The source category is broader than the app’s five Christian lenses and includes Historically Black Protestant, Jehovah’s Witness, and other Christian categories.'
    ),
    pewRollupNote:
      'Pew’s 62% total combines Evangelical Protestant (23%), Mainline Protestant (11%), Historically Black Protestant (5%), Catholic (19%), Latter-day Saint (2%), Orthodox Christian (1%), Jehovah’s Witness (<1%), and Other Christian (1%). The app shows five lenses, so their badges must not be added to reproduce this total. Pew notes that published figures may not sum to 100% because of rounding.',
    denominations: DENOMINATIONS.filter(d => d.family === 'christianity'),
  },
  {
    family: 'islam',
    label: 'Islam',
    totalPewPercent: 1,
    pewCitation: pewCitation(
      'Muslim',
      'Read the top-level Muslim category under Other religions as published; the group total repeats that direct source category.',
      'This is a direct population category, not a rollup across Islamic schools, sects, or denominations.'
    ),
    pewRollupNote: 'Direct source category; no constituent denomination rollup is performed.',
    denominations: DENOMINATIONS.filter(d => d.family === 'islam'),
  },
  {
    family: 'judaism',
    label: 'Judaism',
    totalPewPercent: 2,
    pewCitation: pewCitation(
      'Jewish',
      'Read the top-level Jewish category under Other religions as published; the group total repeats that direct source category.',
      'This is a direct population category, not a rollup across Jewish denominations or movements.'
    ),
    pewRollupNote: 'Direct source category; no constituent denomination rollup is performed.',
    denominations: DENOMINATIONS.filter(d => d.family === 'judaism'),
  },
]

export const PEW_SCOPE_NOTE = {
  citation: pewCitation(
    'Religious composition — top-level categories',
    'The inclusion review uses the U.S. adults / Religious composition table and only treats categories published at or above the threshold as reproducible population evidence.',
    'The threshold is a population-scope rule for this prototype; it is not a theological, doctrinal, or textual ranking.'
  ),
  threshold: {
    minimumPercent: 1,
    denominator: PEW_RLS_DENOMINATOR,
    rule: 'Include an Abrahamic category when Pew publishes that separately reported top-level category at 1% or more of U.S. adults. Do not infer eligibility for groups that are not separately reported at that threshold.',
  },
  qualifyingCriteria: [
    'Traceable Abrahamic lineage (descended from the faith of Abraham)',
    'A separately reported top-level category at 1% or more of U.S. adults in the cited Pew table',
  ],
  excluded: [
    { name: 'Hinduism', reason: 'Not Abrahamic' },
    { name: 'Buddhism', reason: 'Not Abrahamic' },
    { name: "Baha'i", reason: 'Abrahamic, but not separately reported at the 1% threshold in the cited table' },
    { name: 'Sikhism', reason: 'Not Abrahamic' },
    { name: 'Druze', reason: 'Abrahamic, but not separately reported at the 1% threshold in the cited table' },
  ],
  note: 'The threshold is reproducible but conservative: absence of a separately reported category is not evidence that a community is below 1%. Exclusions are methodological, not judgments of worth. Every tradition listed here is presented with equal respect.',
}
