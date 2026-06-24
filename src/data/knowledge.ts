import type { TraditionFamily, TraditionId } from '../types'

export interface ScriptureRef {
  display: string
  lookup: string
  note?: string
}

export interface TraditionKnowledge {
  family: TraditionFamily
  overview: string
  canonSummary: string
  interpretiveTraditions: string[]
  keyThemes: string[]
  liturgicalLife: string
  primaryScriptures: ScriptureRef[]
  secondaryTexts: string[]
  apiNotes: string
}

export interface DenominationKnowledge {
  id: TraditionId
  distinctives: string
  worship: string
  stanceOnScripture: string
  representativeVerses: ScriptureRef[]
}

export const TRADITION_KNOWLEDGE: Record<TraditionFamily, TraditionKnowledge> = {
  judaism: {
    family: 'judaism',
    overview:
      'Judaism is the oldest Abrahamic faith, rooted in the covenant between God and the Jewish people. It centers on study, practice, and community as modes of worship, with sacred texts functioning not merely as doctrine but as living conversation across generations.',
    canonSummary:
      'The Tanakh comprises 24 books in three divisions: Torah (5 books of Moses), Nevi\'im (8 prophetic books), and Ketuvim (11 writings including Psalms, Proverbs, Job). Rabbinic literature -- the Talmud (Babylonian and Jerusalem), Midrash, and later codes like the Shulchan Arukh -- forms a second layer of authoritative guidance.',
    interpretiveTraditions: [
      'PaRDeS: Peshat (plain meaning), Remez (allegorical), Derash (homiletic), Sod (mystical)',
      'Talmudic dialectic: argument and counter-argument preserved rather than resolved',
      'Maimonidean rationalism vs. Kabbalistic mysticism',
      'Modern movements: Orthodox, Conservative, Reform, Reconstructionist',
    ],
    keyThemes: [
      'Covenant (brit) between God and Israel',
      'Tikkun olam -- repair of the world',
      'Shabbat and sacred time',
      'Torah study as lifelong obligation',
      'Justice (tzedakah) and ethical monotheism',
    ],
    liturgicalLife:
      'Daily prayer services (Shacharit, Mincha, Ma\'ariv), weekly Shabbat, and a cycle of annual holidays (Rosh Hashanah, Yom Kippur, Passover, Shavuot, Sukkot) structure Jewish time. The Torah is read publicly on a weekly cycle completed each year.',
    primaryScriptures: [
      { display: 'Genesis 1:1', lookup: 'Genesis 1:1', note: 'Opening of the Torah' },
      { display: 'Exodus 20:1-17', lookup: 'Exodus 20:1-17', note: 'The Ten Commandments' },
      { display: 'Deuteronomy 6:4-9', lookup: 'Deuteronomy 6:4-9', note: 'The Shema -- central prayer' },
      { display: 'Isaiah 6:1-8', lookup: 'Isaiah 6:1-8', note: "Isaiah's call" },
      { display: 'Psalms 23', lookup: 'Psalms 23', note: 'The Lord is my Shepherd' },
      { display: 'Proverbs 31:10-31', lookup: 'Proverbs 31:10-31', note: 'Eshet Chayil' },
    ],
    secondaryTexts: ['Talmud Bavli', 'Talmud Yerushalmi', 'Midrash Rabbah', 'Mishneh Torah', 'Zohar', 'Shulchan Arukh'],
    apiNotes: 'Texts fetched from Sefaria.org (sefaria.org). Reference format: "Genesis 1:1" or "Genesis 1:1-3". Sefaria supports Hebrew, English, and bilingual display.',
  },

  christianity: {
    family: 'christianity',
    overview:
      'Christianity emerged from Second Temple Judaism in the 1st century CE, centered on the life, death, and resurrection of Jesus of Nazareth. It is the world\'s largest religion and the majority faith in the United States (~63% per Pew 2023). Five denominations with 1%+ US population are included here.',
    canonSummary:
      'Most Protestant traditions use a 66-book canon (39 OT + 27 NT). The Catholic canon adds 7 deuterocanonical books (73 total). Orthodox canons vary by jurisdiction, generally larger. The LDS tradition adds three additional scriptures to the KJV Bible.',
    interpretiveTraditions: [
      'Sola scriptura (Scripture alone) -- Protestant Reformation principle',
      'Scripture + Tradition + Magisterium -- Catholic and Orthodox approach',
      'Historical-critical scholarship: context, authorship, textual analysis',
      'Lectio divina: contemplative reading for spiritual formation',
      'Typology: Old Testament as type/shadow of New Testament fulfillment',
    ],
    keyThemes: [
      'Incarnation: God becoming human in Jesus Christ',
      'Atonement: reconciliation of humanity with God',
      'Resurrection and eternal life',
      'The Great Commission: making disciples of all nations',
      'Love of God and neighbor as the summary of the Law',
    ],
    liturgicalLife:
      'Worship practices range from highly liturgical (Orthodox, Catholic) to informal (evangelical). Sunday gathering is central. The liturgical calendar (Advent, Christmas, Lent, Easter, Pentecost) marks the life of Christ. Sacraments/ordinances vary by tradition.',
    primaryScriptures: [
      { display: 'John 3:16', lookup: 'john 3:16', note: 'Core gospel statement' },
      { display: 'Matthew 5:3-12', lookup: 'matthew 5:3-12', note: 'The Beatitudes' },
      { display: 'Romans 8:28-39', lookup: 'romans 8:28-39', note: "Nothing can separate us from God's love" },
      { display: '1 Corinthians 13', lookup: '1 corinthians 13', note: 'The Love Chapter' },
      { display: 'Psalm 23', lookup: 'psalm 23', note: 'The Lord is my Shepherd' },
      { display: 'Isaiah 53', lookup: 'isaiah 53', note: 'The Suffering Servant' },
    ],
    secondaryTexts: ['Nicene Creed', 'Westminster Confession of Faith', 'Catechism of the Catholic Church', 'Book of Common Prayer'],
    apiNotes: 'Texts fetched from bible-api.com (no API key required). KJV and WEB are public domain. ESV, NRSV, and NABRE require API keys not included in this free build.',
  },

  islam: {
    family: 'islam',
    overview:
      'Islam is the youngest of the Abrahamic faiths, founded in 7th century CE Arabia through the Prophet Muhammad. The Quran is considered the direct, verbatim word of God (Allah) as revealed in Arabic. The Hadith -- collections of the Prophet\'s sayings and actions -- serve as the second primary source for Islamic practice and law.',
    canonSummary:
      'The Quran contains 114 surahs (chapters) and 6,236 ayat (verses). It is organized roughly by descending length, not chronologically. The six major Hadith collections (Kutub al-Sittah) include Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami\' at-Tirmidhi, Sunan an-Nasa\'i, and Sunan Ibn Majah.',
    interpretiveTraditions: [
      'Tafsir: exegetical commentary on the Quran',
      'Fiqh: Islamic jurisprudence derived from Quran and Hadith',
      'Four major Sunni law schools: Hanafi, Maliki, Shafi\'i, Hanbali',
      'Shia tradition: authority of the Imams alongside scripture',
      'Sufi tradition: mystical and devotional interpretation',
    ],
    keyThemes: [
      'Tawhid: the absolute oneness of God',
      'Prophethood (Nubuwwah): Adam to Muhammad as final messenger',
      'The Five Pillars: Shahada, Salat, Zakat, Sawm, Hajj',
      'Akhirah: the afterlife and Day of Judgment',
      'Submission (Islam) and peace (Salam) as core meanings',
    ],
    liturgicalLife:
      'The five daily prayers (Salat) structure each day. Friday congregational prayer (Jumu\'ah) is obligatory for men. Ramadan involves fasting from dawn to sunset for one month. The Hajj pilgrimage to Mecca is required once in a lifetime for those able. The Islamic calendar is lunar.',
    primaryScriptures: [
      { display: 'Al-Fatiha (1:1-7)', lookup: '1:1', note: 'The Opening -- recited in every prayer' },
      { display: 'Ayat al-Kursi (2:255)', lookup: '2:255', note: 'The Throne Verse' },
      { display: 'Al-Ikhlas (112:1-4)', lookup: '112:1', note: 'The Sincerity -- on the oneness of God' },
      { display: 'Al-Baqarah (2:285-286)', lookup: '2:285', note: 'The Messenger believes' },
      { display: 'Maryam (19:1-15)', lookup: '19:1', note: 'The story of Zechariah and Mary' },
    ],
    secondaryTexts: ['Sahih al-Bukhari', 'Sahih Muslim', 'Sunan Abu Dawud', "Jami' at-Tirmidhi"],
    apiNotes: 'Quranic text from Quran.com API v4 (primary) with AlQuran.cloud fallback. Hadith from fawazahmed0/hadith-api via jsDelivr CDN (CC BY-4.0). Both are free, no API key required.',
  },
}

export const DENOMINATION_KNOWLEDGE: Partial<Record<TraditionId, DenominationKnowledge>> = {
  'christianity-evangelical': {
    id: 'christianity-evangelical',
    distinctives:
      'Evangelical Protestantism emphasizes the necessity of personal conversion (being "born again"), the supreme authority of the Bible, the centrality of Christ\'s atoning death and resurrection, and the imperative to share the gospel. Includes Baptist, Pentecostal, non-denominational, and other evangelical bodies.',
    worship:
      'Worship tends toward contemporary styles with praise music, though traditional forms persist. Preaching is central. Most churches practice believer\'s baptism by immersion.',
    stanceOnScripture:
      'Scripture is the inerrant or infallible Word of God; the Protestant 66-book canon is authoritative. Sola scriptura is foundational. The KJV remains culturally significant; ESV and NIV are widely used in modern congregations.',
    representativeVerses: [
      { display: 'John 3:16', lookup: 'john 3:16' },
      { display: 'Romans 10:9-10', lookup: 'romans 10:9-10' },
      { display: '2 Timothy 3:16-17', lookup: '2 timothy 3:16-17' },
    ],
  },
  'christianity-catholic': {
    id: 'christianity-catholic',
    distinctives:
      'The Catholic Church claims apostolic succession through the Bishop of Rome (Pope) and holds that Scripture and Sacred Tradition together constitute the fullness of revelation. The Magisterium (teaching authority) interprets both. Seven sacraments are essential to the faith life.',
    worship:
      'The Mass (Eucharist) is the central act of worship, celebrated daily in many parishes. The liturgical calendar governs feast days and seasons. The rosary and devotion to saints, especially Mary, are prominent in popular piety.',
    stanceOnScripture:
      'The Catholic canon includes 73 books (adding 7 deuterocanonicals to the Protestant 66). The NABRE is the official US liturgical translation. Scripture is not self-interpreting; the Magisterium provides authoritative interpretation.',
    representativeVerses: [
      { display: 'Matthew 16:18-19', lookup: 'matthew 16:18-19' },
      { display: 'John 6:51-58', lookup: 'john 6:51-58' },
      { display: 'Luke 1:46-55', lookup: 'luke 1:46-55' },
    ],
  },
  'christianity-mainline': {
    id: 'christianity-mainline',
    distinctives:
      'Mainline Protestantism encompasses historically established denominations -- Methodist, Presbyterian, Lutheran, Episcopal/Anglican, United Church of Christ -- characterized by ecumenical openness, critical scholarship, and social-justice engagement. Theological diversity is embraced.',
    worship:
      'Liturgical forms are common (Book of Common Prayer in Episcopal; hymnody in Methodist and Lutheran). Ordained ministry is central. Many denominations ordain women and LGBTQ+ clergy.',
    stanceOnScripture:
      'Scripture is authoritative but interpreted through reason, tradition, and experience (the Wesleyan Quadrilateral in Methodist practice). Historical-critical methods are standard in seminaries. The NRSV is the most common academic and ecumenical translation.',
    representativeVerses: [
      { display: 'Micah 6:8', lookup: 'micah 6:8' },
      { display: 'Matthew 25:31-46', lookup: 'matthew 25:31-46' },
      { display: 'Romans 12:1-2', lookup: 'romans 12:1-2' },
    ],
  },
  'christianity-lds': {
    id: 'christianity-lds',
    distinctives:
      'The Latter-day Saint movement understands itself as a restoration of original Christianity through the prophet Joseph Smith. Distinctive doctrines include modern prophetic revelation, the pre-mortal existence of souls, and the eternal nature of family relationships sealed in temples.',
    worship:
      'Sunday sacrament meeting (communion) is the central service. Temples are used for ordinances such as baptism for the dead, endowment, and sealings. Home-centered study is emphasized alongside Sunday worship.',
    stanceOnScripture:
      'The "Standard Works" comprise four volumes: the Bible (KJV), Book of Mormon, Doctrine and Covenants, and Pearl of Great Price. Continuing prophetic revelation supplements written scripture. The KJV is the official English Bible translation.',
    representativeVerses: [
      { display: 'James 1:5', lookup: 'james 1:5' },
      { display: 'John 17:3', lookup: 'john 17:3' },
      { display: '3 Nephi 11:29', lookup: '3 nephi 11:29', note: 'Book of Mormon -- not available via bible-api.com' },
    ],
  },
  'christianity-orthodox': {
    id: 'christianity-orthodox',
    distinctives:
      'Eastern Orthodoxy traces its continuity to the apostolic church through seven Ecumenical Councils. Theosis -- participation in the divine nature -- is the goal of Christian life. The Church Fathers, liturgy, and iconography are integral to theology.',
    worship:
      'The Divine Liturgy (attributed to St. John Chrysostom or St. Basil) is celebrated in full on Sundays and feast days. Fasting is central to Orthodox spiritual life. Veneration of icons is a distinctive practice.',
    stanceOnScripture:
      'Scripture exists within and is interpreted by the Tradition of the Church. The Orthodox canon is broader than the Protestant 66; it includes additional books such as 3 Maccabees, 4 Maccabees (in some traditions), and the Prayer of Manasseh. The Septuagint (LXX) is the authoritative OT text.',
    representativeVerses: [
      { display: 'John 1:1-14', lookup: 'john 1:1-14' },
      { display: '2 Peter 1:4', lookup: '2 peter 1:4' },
      { display: 'Matthew 3:13-17', lookup: 'matthew 3:13-17' },
    ],
  },
}
