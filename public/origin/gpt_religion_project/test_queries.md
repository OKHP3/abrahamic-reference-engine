# Test Queries for OverKill Hill P³ Abrahamic Reference Engine

This suite of prompts exercises a range of retrieval, comparison, ambiguity, and refusal scenarios. Use these queries to validate that the GPT correctly parses references, handles translation preferences, and responds safely to problematic requests.

1. **Basic retrieval:** `Fetch Genesis 1:1 from the Tanakh.`
2. **Multiple verses:** `Return John 3:16–18 in my default Bible translation.`
3. **Cross‑translation comparison:** `Show Psalm 23 in KJV, NABRE, and NRSV.`
4. **Set preference and retrieve:** `Set my default Bible to ESV and get Romans 8:28.`
5. **Qur’an single ayah:** `Give me Surah 2 Ayah 255 with two English translations.`
6. **Ambiguous paraphrase:** `I'm looking for the verse about “love your neighbor as yourself.” Where is that across traditions?`
7. **Unknown reference:** `Find "He helps those who help themselves" in the Bible.` (Should respond with a graceful negative result.)
8. **Cross‑tradition theme:** `Compare passages on forgiveness in the Tanakh, New Testament, and Qur’an (two each).`
9. **Interpretation request:** `Explain different Christian views on Deuterocanonical books.`
10. **Change Qur’an translation:** `Change my Qur’an translation to Pickthall and fetch Surah 1.`
11. **Non‑Abrahamic request:** `Show a verse from the Bhagavad Gita about duty (dharma).`
12. **Buddhism request:** `Retrieve a teaching on mindfulness from the Dhammapada.`
13. **Invalid book:** `Get Book of Hezekiah 1:1.` (Should refuse politely.)
14. **Large range:** `Provide the Sermon on the Mount (Matthew 5–7) in NRSV.` (Test retrieval of multiple chapters.)
15. **Parallel stories:** `Find flood narratives in the Tanakh and Qur’an and show citations.`
16. **Preferences summary:** `What are my current settings?`
17. **Settings change:** `Switch default tradition to Islam and default translation ID to 20, then retrieve Surah 112.`
18. **Hadith request (optional extension):** `Cite a hadith about intention.`
19. **Deuterocanonical retrieval:** `Give me Wisdom 6:12–15.`
20. **Translation metadata:** `What is the license and edition for NABRE?`
21. **Comparative ethics:** `Compare teachings on charity in the Bible, Qur’an, and Gita.`
22. **Ask for context:** `Get Exodus 20:12 with brief context.`
23. **Ambiguity check:** `Where does it say “cleanliness is next to godliness” in scripture?`
24. **Alternate language:** `Retrieve Genesis 1:1 in Hebrew and English.`
25. **Theme search across Buddhism and Christianity:** `Find verses about compassion in Dhammapada and New Testament.`
26. **Error handling:** `Fetch a verse from the Tao Te Ching.` (Currently unsupported; should indicate absence or reserved slot.)
27. **Settings reset:** `Reset all my preferences to default.`
28. **Long cross‑tradition comparison:** `List three passages about justice across the Tanakh, Bible, Qur’an, Gita, and Dhammapada.`
29. **User desires no commentary:** `Set commentary level to none and fetch Matthew 7:12.`
30. **Synoptic differences:** `What are the differences among the synoptic Gospels in describing the Last Supper?`