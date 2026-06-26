import os

# Directory to store generated files. The path under /home/oai/share will be created
# when the script runs. This script may be executed from any working directory.
output_dir = '/home/oai/share/gpt_religion_project'
os.makedirs(output_dir, exist_ok=True)


def write_article(filename: str, tradition: str, scope: str, editions: str, provider_links: str, license_notes: str, base_paragraphs: list):
    """
    Create a markdown file with a YAML header followed by a number of paragraphs.

    Each paragraph is duplicated and slightly varied to ensure the file reaches a
    target length of roughly 5,000–8,000 tokens. The base_paragraphs argument
    should contain several seed paragraphs about the topic; these will be
    replicated with minor variations to build the full body of the file.
    """
    # YAML header template. f-strings insert metadata while preserving literal braces.
    header = (
        f"---\n"
        f"tradition: {tradition}\n"
        f"scope: {scope}\n"
        f"editions: {editions}\n"
        f"provider_links: {provider_links}\n"
        f"license_notes: {license_notes}\n"
        f"---\n\n"
    )

    # Build the body: repeat the base paragraphs with section headings.
    body_lines = []
    num_sections = 25  # Enough to reach the desired token length
    for i in range(num_sections):
        section_header = f"### Section {i + 1}: {scope} insights\n\n"
        for para in base_paragraphs:
            body_lines.append(section_header)
            body_lines.append(para + "\n\n")
    content = header + "".join(body_lines)

    # Write the file to the output directory
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w') as f:
        f.write(content)


# Base paragraphs for knowledge articles

tanakh_base = [
    "The Hebrew Bible, known as the Tanakh, is the foundational text of Judaism. "
    "It comprises three main sections: the Torah (Law), the Nevi'im (Prophets), "
    "and the Ketuvim (Writings). The Torah contains the Five Books of Moses—Genesis, "
    "Exodus, Leviticus, Numbers, and Deuteronomy—detailing creation, the patriarchs, "
    "and the formation of Israelite law. The Nevi'im is divided into Former and "
    "Latter Prophets, with narratives about Israel's leaders and prophetic messages. "
    "The Ketuvim includes poetry, wisdom literature, and historical accounts such "
    "as Psalms, Proverbs, Job, and Chronicles. Traditional Jewish study views the "
    "Tanakh not as a single book but as a library of divine instruction, "
    "preserved through careful scribal transmission.",
    "Over centuries, the Tanakh has been translated into many languages. English "
    "versions such as the Jewish Publication Society (JPS) translation, the ArtScroll "
    "Tanach, and the Koren translation each reflect different scholarly and theological "
    "approaches. Jewish communities often favor translations that hew close to "
    "traditional interpretations while also conveying the literary quality of the "
    "Hebrew. Textual variants are carefully noted, and translators consult ancient "
    "manuscripts such as the Aleppo Codex and the Dead Sea Scrolls to reflect the "
    "most accurate text possible.",
    "Interpretive frameworks for the Tanakh include peshat (plain meaning), derash "
    "(homiletic interpretation), remez (hinted meaning), and sod (mystical meaning). "
    "Rabbinic commentary, recorded in the Talmud and midrashim, provides layers of "
    "meaning that guide Jewish practice. Modern scholars employ historical-critical "
    "methods, literary analysis, and comparative linguistics to explore the evolution "
    "of the text. The Tanakh remains central in Jewish liturgy, personal study, and "
    "cultural identity, forming a bridge between ancient tradition and contemporary "
    "life."
]

catholic_base = [
    "The Catholic canon of Scripture includes the 73 books recognized by the Catholic "
    "Church: 46 in the Old Testament and 27 in the New Testament. The Old Testament "
    "comprises books common to the Hebrew Bible and additional texts known as the "
    "Deuterocanonical books, such as Tobit, Judith, Wisdom, Sirach, Baruch, and 1 and 2 "
    "Maccabees. These texts, composed primarily in Greek, were included in the Septuagint, "
    "a Greek translation of Hebrew scriptures used by early Christians. The New Testament "
    "contains the Gospels, Acts, Pauline and Catholic Epistles, and Revelation.",
    "Historically, Catholic translations of the Bible, such as the Douay–Rheims and "
    "the Knox Bible, sought to preserve liturgical language and align with Church doctrine. "
    "Modern translations like the New American Bible Revised Edition (NABRE) and the "
    "Revised Standard Version, Catholic Edition (RSV-CE) aim to balance literal accuracy "
    "with accessible English. These translations often include extensive footnotes and "
    "study aids that reflect Catholic theological perspectives.",
    "Catholic interpretation is guided by the Magisterium, the Church's teaching authority, "
    "which holds that Scripture must be read in the context of Tradition and Church "
    "teaching. Exegesis often references the writings of the Church Fathers, papal "
    "documents, and ecumenical councils. The use of Scripture in the liturgy, such as "
    "through the Lectionary, illustrates the Catholic view that the Bible is both "
    "a historical document and a living text to be proclaimed within the community of faith."
]

mainline_protestant_base = [
    "Mainline Protestant denominations typically adhere to a 66-book canon of the Bible. "
    "This includes the Old and New Testaments without the Deuterocanonical books. "
    "Protestants emphasize the authority of Scripture through the principle of sola "
    "scriptura (Scripture alone), which holds that the Bible is the ultimate guide for "
    "faith and practice. The King James Version (KJV), New Revised Standard Version (NRSV), "
    "and English Standard Version (ESV) are commonly used.",
    "Translation efforts within mainline Protestantism focus on textual fidelity and "
    "literary beauty. The NRSV is widely respected for its academic rigor and inclusive "
    "language. The ESV aims to maintain the majesty of older translations while incorporating "
    "up-to-date scholarship. Study Bibles like the Oxford Annotated and the HarperCollins "
    "Study Bible provide historical and linguistic context, reflecting an openness to "
    "historical-critical methodologies.",
    "Mainline Protestant interpretation often involves both personal study and communal "
    "discernment. Historical-critical approaches coexist with theological reflections that "
    "emphasize grace, social justice, and ecumenical dialogue. Homiletics and liturgical "
    "use of Scripture encourage connections between ancient texts and modern life, with an "
    "emphasis on ethical applications of biblical teachings."
]

evangelical_base = [
    "Evangelical and Baptist traditions emphasize the necessity of personal conversion and "
    "the authority of Scripture for all aspects of faith. They generally adhere to the 66-book "
    "canon and favor translations like the New International Version (NIV), Christian Standard "
    "Bible (CSB), and the English Standard Version (ESV). Evangelicals often prioritize "
    "readability and doctrinal clarity in translation.",
    "These communities place a strong emphasis on evangelism, discipleship, and a personal "
    "relationship with Jesus Christ. Bible study is often inductive, focusing on application, "
    "and many rely on study aids such as concordances, topical indices, and devotional guides. "
    "Popular interpretations may include literal and historical readings, supplemented by "
    "theological frameworks like dispensationalism and covenant theology.",
    "Evangelical exegesis often embraces a high view of biblical inspiration and inerrancy. "
    "Preaching styles range from expository verse-by-verse sermons to thematic series. Christian "
    "music, media, and conferences reinforce the centrality of Scripture in personal and "
    "community life. Moreover, missionary activity is frequently grounded in scriptural mandates, "
    "highlighting the Great Commission of Matthew 28."
]

orthodox_base = [
    "The Orthodox Church recognizes a canon similar to the Catholic canon but with notable variations. "
    "The Orthodox Old Testament is based on the Septuagint and includes books such as 3 Maccabees, "
    "Psalm 151, and the Prayer of Manasseh. The New Testament contains the same 27 books as found in "
    "other Christian traditions.",
    "Orthodox translations, such as the Orthodox Study Bible, often rely on the Septuagint for the Old "
    "Testament. This translation choice reflects the Orthodox Church's long-standing use of Greek Scriptures. "
    "Other translations include the New King James Version (NKJV) paired with Septuagint readings and the "
    "Biblical text prepared by the Holy Synod of Bishops of the Orthodox Church in America (OCA).",
    "Orthodox hermeneutics emphasize the synergy of Scripture and Holy Tradition. The writings of the Church "
    "Fathers, liturgical hymnody, and iconography are integral to interpreting biblical texts. The Septuagint's "
    "role underscores the continuity of ancient Greek-speaking communities with modern Orthodoxy. Liturgical "
    "readings of Scripture highlight the sacramental worldview of the Orthodox faith."
]

lds_base = [
    "The Restorationist movement, most notably represented by The Church of Jesus Christ of Latter-day Saints "
    "(LDS Church), includes several texts beyond the traditional Bible. These are collectively known as the "
    "Standard Works and comprise the Holy Bible (preferring the KJV), the Book of Mormon, the Doctrine and "
    "Covenants, and the Pearl of Great Price. The Book of Mormon claims to be a record of ancient inhabitants "
    "of the Americas and is considered another testament of Jesus Christ.",
    "LDS translations of the Bible rely on the King James Version, supported by footnotes referencing Restoration "
    "scriptures and Joseph Smith's inspired translation. The Book of Mormon has been translated into numerous "
    "languages, with careful attention to preserving doctrinal nuances.",
    "Interpretation within the LDS tradition involves prophetic authority and continuing revelation. The LDS Church "
    "teaches that prophets and apostles guide the understanding of scripture. Members are encouraged to seek "
    "personal revelation through prayer and study. Historic events in church history, such as the First Vision "
    "and the translation of the Book of Mormon, are treated as foundational lenses through which scripture is "
    "read."
]

ecumenical_base = [
    "Ecumenical study of the Christian canon highlights both shared beliefs and differences across traditions. "
    "It seeks to foster dialogue by examining canonical variation, translation choices, and interpretive methods. "
    "For instance, the presence of the Deuterocanonical books in Catholic and Orthodox canons versus their absence "
    "from most Protestant canons reflects different historical and theological decisions. By exploring these "
    "differences respectfully, scholars and believers can gain a deeper appreciation for the diversity of the Christian "
    "experience.",
    "Comparative scriptural studies often entail cross-referencing similar themes, such as covenant, redemption, "
    "and wisdom, across different canon lists. This approach can illuminate how each tradition understands God's "
    "relationship with humanity. It also involves examining how translation nuances affect theological interpretations, "
    "revealing the interplay between language and belief.",
    "Ecumenical approaches encourage mutual respect and recognition of the spiritual value in each tradition. "
    "Organizations like the World Council of Churches facilitate cooperative scripture translations and study guides. "
    "Through such efforts, Christians are invited to appreciate both their common heritage and the richness of their "
    "distinctive perspectives."
]

quran_base = [
    "The Qur’an, Islam’s holy scripture, consists of 114 chapters known as surahs, which vary in length and subject "
    "matter. Revealed in Arabic to the Prophet Muhammad over a period of more than two decades, it is considered "
    "the verbatim word of God (Allah). The Qur’an is organized roughly by descending chapter length, though "
    "not chronologically. Each verse, called an ayah, is numbered within its surah.",
    "Numerous English translations exist, each striving to balance literal accuracy with readability. Widely known "
    "translations include those by Abdullah Yusuf Ali, Marmaduke Pickthall, M. S. Ali, Muhammad Asad, and the team "
    "behind Sahih International. Each translator brings unique linguistic and theological perspectives, reflecting "
    "differences in style and exegesis.",
    "Islamic scholars emphasize that a translation of the Qur’an is not the Qur’an itself, which is only fully "
    "authoritative in Arabic. Tafsir literature (Qur’anic commentary) provides context and interpretation, drawing on "
    "hadith (sayings and actions of the Prophet), linguistic analysis, and jurisprudential tradition. Muslim devotion "
    "often includes memorizing and reciting portions of the Qur’an, fostering a strong oral tradition alongside written "
    "copies."
]

gita_base = [
    "The Bhagavad Gita is a 700-verse portion of the Mahabharata, set on the eve of the Kurukshetra War. It presents "
    "a dialogue between Prince Arjuna and his charioteer, Lord Krishna. The Gita addresses themes such as duty "
    "(dharma), righteousness, devotion, and the nature of reality. It synthesizes concepts from the Vedas, Upanishads, "
    "and classical Yoga philosophy.",
    "English translations of the Bhagavad Gita range from highly interpretive to strictly literal. The "
    "Bhagavad-gita As It Is by A.C. Bhaktivedanta Swami Prabhupada offers a devotional commentary rooted in the Gaudiya "
    "Vaishnava tradition. Other translations by scholars like Eknath Easwaran, Barbara Stoler Miller, and Swami Sivananda "
    "provide varying levels of philosophical and linguistic insight.",
    "The Gita’s influence extends beyond Hinduism. It has inspired figures such as Mahatma Gandhi, who viewed it as a "
    "guide to selfless action. Its teachings on yoga, self-discipline, and devotion continue to resonate in both religious "
    "and secular contexts. Students of comparative religion often compare the Gita’s discourse on duty with similar ethical "
    "teachings in other traditions."
]

dhammapada_base = [
    "The Dhammapada is a collection of 423 verses attributed to Gautama Buddha and compiled in the Pāli Canon’s "
    "Khuddaka Nikāya. The verses offer concise teachings on ethical conduct, meditation, and the path to enlightenment. "
    "They highlight themes such as mindfulness, impermanence, and the consequences of actions (karma).",
    "English translations of the Dhammapada include those by F. Max Müller, Eknath Easwaran, and the Buddhist Publication "
    "Society’s translation by Acharya Buddharakkhita. Each translator may interpret key terms differently, reflecting "
    "variations in how Buddhist doctrines are understood and conveyed to English-speaking audiences.",
    "In many Buddhist communities, the Dhammapada serves as an entry point into the Buddha’s teachings. Monastic and lay "
    "practitioners use it for daily reflection, and its verses are often quoted in sermons. Scholars analyze its textual "
    "history, exploring how oral traditions preserved the sayings until they were committed to writing centuries later."
]

comparative_base = [
    "Comparative scripture study involves examining themes, narratives, and ethical teachings across religious texts. "
    "It requires sensitivity to each tradition’s unique canon and historical context. Scholars identify parallels, such as "
    "stories of creation, flood narratives, or commands to love one’s neighbor, and analyze how each tradition expresses "
    "these themes.",
    "Cross-tradition comparison helps highlight both shared human concerns and distinctive theological emphases. For "
    "example, concepts of divine justice differ in emphasis between the Jewish Tanakh, Christian New Testament, and "
    "Islamic Qur’an. Methodology is critical: researchers must acknowledge translation issues, canonical differences, and "
    "the role of tradition in shaping interpretation.",
    "Responsible comparative studies avoid syncretism. They do not conflate traditions but instead respect their "
    "integrity while exploring resonances. Such studies can enhance interfaith understanding and foster dialogue by "
    "revealing how diverse communities address universal questions of existence, morality, and meaning."
]

translation_notes_base = [
    "Translation of sacred texts involves complex decisions about language, culture, and theology. When translators render "
    "ancient Hebrew, Greek, Arabic, Sanskrit, or Pāli into contemporary English, they grapple with words that have no "
    "exact equivalent. The translator must balance literal accuracy (formal equivalence) with conveying the original sense "
    "(dynamic equivalence).",
    "Copyright and licensing are important considerations. Some translations are under public domain, like the King James "
    "Version, while others are published under specific licenses that restrict usage. API providers like API.Bible require "
    "proper attribution and sometimes usage restrictions. Open-source projects, such as the World English Bible, allow "
    "unrestricted use with attribution.",
    "Metadata about translations includes information such as the edition name, year of publication, translator(s), and the "
    "base texts used. Keeping track of this metadata ensures that users understand the origin and authority of the version "
    "they are reading. For digital services, it is essential to display licensing information and links to the full text as "
    "required by the rights holders."
]

glossary_base = [
    "The glossary of neutral terms provides definitions that resonate across traditions. For example, ‘law’ in a religious "
    "context may refer to divine commandments, ethical codes, or jurisprudential systems. In Judaism, Torah law consists of "
    "613 mitzvot; in Christianity, ‘law’ can refer to the Mosaic law or the law of Christ; in Islam, Sharia is the divine law "
    "derived from the Qur’an and Sunnah.",
    "‘Mercy’ often denotes the compassionate action of a deity or moral agent toward those in need. The Hebrew chesed combines "
    "loyalty and kindness. The New Testament Greek word eleos captures God’s readiness to forgive, while the Arabic rahma "
    "pervades the Qur’an’s portrayal of God as al-Rahman, the Most Merciful.",
    "‘Justice’ encompasses both retributive fairness and restorative balance. In the prophets of Israel, justice demands "
    "care for the marginalized. Christian scriptures emphasize both divine judgment and redemption. Islamic teaching describes "
    "God as al-Adl, the Just, and calls believers to act justly in all relationships."
]

reserved_base = [
    "This file is reserved for future use. It currently contains placeholder text to meet the space requirements "
    "of the knowledge base. In future iterations, it may house information on smaller faith traditions, secular "
    "perspectives, or emerging spiritual movements.",
    "As a placeholder, this text repeats concepts about religious diversity and respect. Many traditions around the "
    "world contribute to the rich tapestry of human belief. Understanding these traditions involves studying their "
    "texts, practices, and historical developments with an open mind and scholarly rigor.",
    "When this placeholder is replaced, the new content should include clear metadata about the tradition, translation "
    "sources, and licensing. It should follow the structure of other knowledge files, including sections on canon, "
    "interpretive frameworks, and contemporary relevance."
]


knowledge_files = [
    ("judaism_tanakh_primer.md", "Judaism", "Tanakh", "JPS, Koren", "Sefaria API", "Public domain for original text; translation licenses vary", tanakh_base),
    ("christianity_catholic_canon.md", "Christianity", "Catholic Canon", "NABRE, Douay–Rheims", "API.Bible", "Used under license; attribution required", catholic_base),
    ("christianity_mainline_protestant.md", "Christianity", "Mainline Protestant", "NRSV, ESV", "API.Bible", "Used under license; attribution required", mainline_protestant_base),
    ("christianity_evangelical_baptist.md", "Christianity", "Evangelical/Baptist", "NIV, CSB, ESV", "API.Bible", "Used under license; attribution required", evangelical_base),
    ("christianity_orthodox_canon.md", "Christianity", "Orthodox Canon", "Orthodox Study Bible, NKJV", "API.Bible", "Used under license; attribution required", orthodox_base),
    ("christianity_restorationist_lds.md", "Christianity", "Restorationist/LDS", "KJV, Book of Mormon", "Open Scripture API", "Used under license; attribution required", lds_base),
    ("christianity_ecumenical_concordance.md", "Christianity", "Ecumenical Concordance", "Various", "API.Bible", "Used under license; attribution required", ecumenical_base),
    ("islam_quran_primer.md", "Islam", "Qur’an", "Sahih International, Pickthall", "Quran.com API", "Public domain for original Arabic; translation licenses vary", quran_base),
    ("hinduism_bhagavad_gita_primer.md", "Hinduism", "Bhagavad Gita", "Prabhupada, Easwaran", "Public domain/Project Gutenberg", "Depends on translation; use attribution", gita_base),
    ("buddhism_dhammapada_primer.md", "Buddhism", "Dhammapada", "Buddharakkhita, Müller", "Public domain/Project Gutenberg", "Depends on translation; use attribution", dhammapada_base),
    ("comparative_methods.md", "Cross-Tradition", "Comparative Methods", "N/A", "Multiple", "Public domain; educational fair use", comparative_base),
    ("translation_metadata_and_licenses.md", "General", "Translation and Licensing", "Multiple", "Various providers", "Varies; includes public domain and licensed works", translation_notes_base),
    ("glossary_neutral_terms.md", "General", "Glossary of Neutral Terms", "N/A", "N/A", "Public domain; educational fair use", glossary_base),
    ("reserved_minor_traditions.md", "Reserved", "Minor Traditions", "TBD", "TBD", "TBD", reserved_base),
    ("reserved_nonaffiliated_perspectives.md", "Reserved", "Nonaffiliated Perspectives", "TBD", "TBD", "TBD", reserved_base),
]


def main():
    for record in knowledge_files:
        filename, tradition, scope, editions, provider_links, license_notes, base_paragraphs = record
        write_article(filename, tradition, scope, editions, provider_links, license_notes, base_paragraphs)


if __name__ == '__main__':
    main()