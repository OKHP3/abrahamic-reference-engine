---
name: okhp3-tradition-observance-calendar
description: Computes observance dates and descriptions for Jewish, Christian, and Islamic holidays for any requested year. Outputs structured event data or iCalendar (.ics) format for calendar import. Supports multi-tradition merging.
license: MIT
metadata:
  author: Jamie Hill (OverKill Hill P³)
  version: "—"
  category: calendar-data
  origin: okhp3/skillz
  homepage: https://overkillhill.com
  author-github: https://github.com/OKHP3
  in_scope: "Holiday dates, descriptions, iCal export, and multi-tradition calendar merging for any supported year."
  out_of_scope: "Liturgical planning software, clerical schedules, or observances outside the three Abrahamic traditions."
---

# okhp3-tradition-observance-calendar

**OverKill Hill P³** · [overkillhill.com](https://overkillhill.com) · [github.com/OKHP3](https://github.com/OKHP3)

Compute observance dates and descriptions for Jewish, Christian, and Islamic holidays for any requested year.

## Trigger

Use this skill when a request asks for religious holiday dates, an observance calendar, .ics output for calendar import, or a merged multi-tradition calendar for a specific year or date range.

## Supported traditions and calendar types

| Tradition | Calendar basis | Key observances |
|-----------|---------------|----------------|
| Judaism | Hebrew lunisolar calendar | Rosh Hashanah, Yom Kippur, Passover, Shavuot, Sukkot, Hanukkah, Purim |
| Christianity | Gregorian (with moveable feasts) | Christmas, Easter, Ash Wednesday, Pentecost, Advent; Catholic and Orthodox variants |
| Islam | Hijri lunar calendar | Ramadan, Eid al-Fitr, Eid al-Adha, Islamic New Year, Mawlid |

## Date computation

- Jewish dates: use the Hebrew calendar algorithm. Rosh Hashanah falls on 1 Tishrei; compute Gregorian equivalents for the requested year.
- Christian moveable feasts: Easter by the Gregorian computus (Western) or Julian computus (Eastern Orthodox). Ash Wednesday = Easter − 46 days; Pentecost = Easter + 49 days.
- Islamic dates: Hijri months are lunar (~354-day year). Ramadan begins on 1 Ramadan; Eid al-Fitr on 1 Shawwal. Note that precise start dates depend on moon sighting and may vary by one day regionally.

## Output formats

**Structured list** — name, date (ISO 8601), tradition, denomination (where applicable), brief description.

**iCalendar (.ics)** — `VEVENT` blocks with `DTSTART`, `SUMMARY`, `DESCRIPTION`, and `CATEGORIES` fields. Include a `CALSCALE:GREGORIAN` header. Use `VALUE=DATE` for all-day events.

**Multi-tradition merge** — combine events from all three traditions into a single chronological list or .ics file, with a `CATEGORIES` tag per tradition.

## Output contract

Return the requested format for the specified year. Flag Islamic dates as approximate (±1 day, moon-sighting dependent). Note when a Christian observance differs between Western and Eastern churches. Do not include non-observance civil holidays unless requested.

## Scope

**In scope:** Holiday dates, descriptions, iCal export, and multi-tradition calendar merging for any supported year.

**Out of scope:** Liturgical planning software, clerical schedules, or observances outside the three Abrahamic traditions.

## About

Built by [Jamie Hill](https://overkillhill.com) · [OverKill Hill P³](https://overkillhill.com)
Published at [github.com/OKHP3](https://github.com/OKHP3)
Part of the [OKHP3/skillz](https://github.com/OKHP3/skillz) Agent Skill library.
MIT License — free to use, fork, and adapt. A nod to the source is appreciated.
