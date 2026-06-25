# Translation Matrix

This document maps commonly used Bible editions and Qur'an translation IDs to friendly names and notes about their provenance or denominational usage. Use this matrix to understand which version corresponds to each code when configuring user preferences or rendering citations.

| Code | Friendly Name | Tradition/Denomination | Notes |
|------|---------------|------------------------|-------|
| **KJV** | King James Version | Protestant | Historic 1611 translation; widely used among evangelicals and Baptists. |
| **ESV** | English Standard Version | Protestant/Evangelical | Modern essentially literal translation; popular in evangelical circles. |
| **NIV** | New International Version | Protestant/Evangelical | Widely used dynamic-equivalence translation (1978/2011); popular across evangelical and non-denominational churches. Available via bible-api.com. |
| **NRSV** | New Revised Standard Version | Mainline Protestant/Ecumenical | Inclusive-language update to RSV; common in academic and ecumenical settings. |
| **NABRE** | New American Bible Revised Edition | Catholic | Official English translation for liturgy in the United States; includes Deuterocanonical books (73-book canon). |
| **Douay** | Douay-Rheims | Catholic | 16th-century translation from the Latin Vulgate; traditional Catholic usage. Includes Deuterocanonical books. |
| **20** | Sahih International | Islam | Modern English Qur'an translation (ID 20 on Quran.com); balanced literal/dynamic rendering. |
| **21** | Pickthall | Islam | Early 20th-century translation by Marmaduke Pickthall; archaic style. |
| **22** | Yusuf Ali | Islam | Translation with explanatory notes by Abdullah Yusuf Ali; widely circulated. |
| **23** | Arberry | Islam | A.J. Arberry's literary translation; titled *The Koran Interpreted*. |
| **24** | Shakir | Islam | A translation by M.H. Shakir; more literal rendering. |

Note: Qur'an translation IDs correspond to the `translations` parameter on Quran.com's API. Always cite the full name and ID when displaying passages to users.

---

## LDS / Restorationist -- Standard Works canon scope

The LDS canon (Standard Works) is four volumes. Only the Bible (KJV) is available via bible-api.com. The three additional volumes require a separate API.

| Volume | Contents | Books / Sections | Free API |
|--------|----------|-----------------|----------|
| Holy Bible (KJV) | Old and New Testament | 66 books | bible-api.com (`kjv`) |
| Book of Mormon | Narrative scripture attributed to ancient American prophets | 15 books (1 Nephi through Moroni) | scriptures.nephi.org |
| Doctrine and Covenants | Modern revelations given primarily through Joseph Smith | 138 sections + Official Declarations | scriptures.nephi.org |
| Pearl of Great Price | Selections: Moses, Abraham, Joseph Smith -- History, Articles of Faith | 5 texts | scriptures.nephi.org |

**LDS scripture API:** `scriptures.nephi.org` -- community-maintained, no authentication required.
- Base URL: `https://scriptures.nephi.org`
- Reference format: standard book abbreviation + chapter:verse (e.g. `1 Ne. 3:7`, `D&C 76:22`)
- Note: uptime is not guaranteed for this community API. Verify availability before relying on it in production.

The Church of Jesus Christ of Latter-day Saints publishes the full Standard Works online at `https://www.churchofjesuschrist.org/study/scriptures` but does not provide a public unauthenticated REST API for programmatic verse retrieval.

---

## Orthodox Christian -- canon scope

Orthodox Christians use the Septuagint (LXX) as the authoritative Old Testament text, resulting in a broader OT canon than the Protestant 66-book Bible.

| Canon layer | Contents | Books |
|-------------|----------|-------|
| Protestant OT core | Shared with Catholic and Protestant | 39 books |
| Catholic deuterocanonicals | Tobit, Judith, 1-2 Maccabees, Wisdom, Sirach, Baruch + Greek additions to Esther/Daniel | 7 books + additions |
| Orthodox additions | 3 Maccabees, Psalm 151 | 2 texts (present in Greek and most Eastern Orthodox canons) |
| Extended (some jurisdictions) | 4 Maccabees (appendix in Georgian and Slavonic traditions), 1 Esdras, Prayer of Manasseh | Varies |
| New Testament | Shared with all Christian traditions | 27 books |

**Typical Orthodox canon total:** 76-78 books, depending on jurisdiction.

**API coverage:** bible-api.com `web` (World English Bible) includes the seven Catholic deuterocanonicals but does not include 3 Maccabees, Psalm 151, or 4 Maccabees. No free public unauthenticated API covers the full Orthodox OT canon.
