# OverKill Hill P³ Abrahamic Reference Engine – Installation Guide

This README describes how to assemble the Abrahamic Reference Engine GPT using the assets in this repository. Follow these steps within the GPT builder or equivalent tool to achieve a functional, neutral scripture reference assistant.

## Prerequisites

- Access to the GPT builder that supports custom knowledge files and OpenAPI actions.
- API keys for any protected providers (e.g., API.Bible). Replace placeholder strings in the provided OpenAPI stubs.
- Understanding of how to upload knowledge documents, configure system instructions, and add actions in the builder UI.

## Steps

1. **Prepare Knowledge Files**
   - Locate the `knowledge` directory inside this project (created when running the generator script). It contains 15 markdown files, each beginning with a YAML header. Upload each file as a separate knowledge article in the GPT builder.
   - Use the file names to label the knowledge documents (e.g., *Judaism – Tanakh Primer*, *Christianity – Catholic Canon*). Ensure the YAML header remains intact.

2. **Upload Auxiliary Documents**
   - Upload `translation_matrix.md` as a reference table so that the GPT can convert translation codes to friendly names when communicating with users.
   - Upload `ui_copy.md` and use its contents for the GPT’s welcome message, help text, and error message templates.
   - Upload `test_queries.md` to use as part of your internal testing or demonstration environment.
   - Upload `settings_schema.json` if the builder allows schema definitions for user preferences. Map these fields to the GPT’s settings interface.

3. **Configure System Instructions**
   - Use the instruction block provided in your design specification (not included here) as the base system prompt. Update placeholders for API keys and fallback logic.
   - Reference `translation_matrix.md` within the instructions as the source for translation codes.

4. **Add OpenAPI Actions**
   - Use the OpenAPI stubs defined in your design specification for: Bible passages via API.Bible, Tanakh via Sefaria, Qur’an via Quran.com and AlQuran.cloud, and optional Hadith or other sources.
   - For each action, supply the appropriate API key in the security scheme. Test each call to ensure it returns the expected structure.

5. **Set Up Default Preferences**
   - Initialize default values as described in `settings_schema.json`: tradition `Christianity`, Bible version `NRSV`, Qur’an translation IDs `[20]`, Sefaria language `en`, commentary level `brief`.

6. **Test the GPT**
   - Run through the queries in `test_queries.md` to validate retrieval, comparison, and error handling. Adjust system instructions or mappings based on results.

7. **Iterate and Deploy**
   - Once satisfied with performance and tone, publish or deploy the GPT. Use the provided `CHANGELOG.md` to document updates over time.

## Directory Structure

```
gpt_religion_project/
├── CHANGELOG.md          # Change log for the project
├── README.md             # This installation guide
├── generate_files.py     # Script used to generate knowledge articles
├── settings_schema.json  # JSON schema for user settings
├── translation_matrix.md # Table mapping translations to codes
├── ui_copy.md            # On‑boarding text and error messages
├── test_queries.md       # Suite of test prompts
├── judaism_tanakh_primer.md
├── christianity_catholic_canon.md
├── christianity_mainline_protestant.md
├── christianity_evangelical_baptist.md
├── christianity_orthodox_canon.md
├── christianity_restorationist_lds.md
├── christianity_ecumenical_concordance.md
├── islam_quran_primer.md
├── hinduism_bhagavad_gita_primer.md
├── buddhism_dhammapada_primer.md
├── comparative_methods.md
├── translation_metadata_and_licenses.md
├── glossary_neutral_terms.md
├── reserved_minor_traditions.md
├── reserved_nonaffiliated_perspectives.md
```

Use this structure as a reference when importing files into the GPT builder. The order of loading knowledge articles is not critical, but ensure all are included to maximize coverage.