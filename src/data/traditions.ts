import type { PewCitation, Denomination, TraditionGroup } from '../types'

const PEW_2023: PewCitation = {
  source: 'Pew Research Center, Religious Landscape Study',
  year: 2023,
  url: 'https://www.pewresearch.org/religion/religious-landscape-study/',
}

export const DENOMINATIONS: Denomination[] = [
  {
    id: 'christianity-evangelical',
    name: 'Evangelical Protestant',
    shortName: 'Evangelical',
    family: 'christianity',
    pewPercent: 25,
    pewCitation: PEW_2023,
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
    pewPercent: 20,
    pewCitation: PEW_2023,
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
    pewPercent: 16,
    pewCitation: PEW_2023,
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
    pewCitation: PEW_2023,
    description:
      'The Latter-day Saint movement, founded by Joseph Smith in the 19th century as a restoration of original Christianity. Uses the Bible alongside additional scriptures revealed through Joseph Smith.',
    keyTexts: ['Holy Bible (KJV)', 'Book of Mormon', 'Doctrine and Covenants', 'Pearl of Great Price'],
    canonScope: 'Standard Works: Bible (KJV) + three additional volumes of LDS scripture',
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
    pewCitation: PEW_2023,
    description:
      'Eastern Orthodox and Oriental Orthodox churches tracing their lineage to the early church councils. Emphasizes Tradition, liturgy, theosis, and the Church Fathers alongside Scripture.',
    keyTexts: ['Holy Bible (expanded OT)', 'Church Fathers', 'Divine Liturgy'],
    canonScope: 'Orthodox canon: varies by jurisdiction, includes additional OT books beyond Protestant canon',
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
    pewCitation: PEW_2023,
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
    pewCitation: PEW_2023,
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
    totalPewPercent: 63,
    denominations: DENOMINATIONS.filter(d => d.family === 'christianity'),
  },
  {
    family: 'judaism',
    label: 'Judaism',
    totalPewPercent: 2,
    denominations: DENOMINATIONS.filter(d => d.family === 'judaism'),
  },
  {
    family: 'islam',
    label: 'Islam',
    totalPewPercent: 1,
    denominations: DENOMINATIONS.filter(d => d.family === 'islam'),
  },
]

export const PEW_SCOPE_NOTE = {
  citation: PEW_2023,
  qualifyingCriteria: [
    'Traceable Abrahamic lineage (descended from the faith of Abraham)',
    '1% or more of the US population (Pew Research Center Religious Landscape Study)',
  ],
  excluded: [
    { name: 'Hinduism', reason: 'Not Abrahamic' },
    { name: 'Buddhism', reason: 'Not Abrahamic' },
    { name: "Baha'i", reason: 'Abrahamic, but below 1% US threshold' },
    { name: 'Sikhism', reason: 'Not Abrahamic' },
    { name: 'Druze', reason: 'Abrahamic, but below 1% US threshold' },
  ],
  note: 'Exclusions are methodological, not judgments of worth. Every tradition listed here is presented with equal respect.',
}
