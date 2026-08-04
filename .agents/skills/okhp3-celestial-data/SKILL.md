---
name: okhp3-celestial-data
description: Calculates current moon phase, active astrological season, and Mercury retrograde status for a given date or date range. Used to contextualize religious observances against lunar and solar cycles.
license: MIT
metadata:
  author: Jamie Hill (OverKill Hill P³)
  version: "—"
  category: astronomical-data
  origin: okhp3/skillz
  homepage: https://overkillhill.com
  author-github: https://github.com/OKHP3
  in_scope: "Moon phase, solar season, Mercury retrograde windows, and proximity to significant celestial events."
  out_of_scope: "Natal astrology, horoscopes, predictive forecasting, or non-Abrahamic ritual timing guidance."
---

# okhp3-celestial-data

**OverKill Hill P³** · [overkillhill.com](https://overkillhill.com) · [github.com/OKHP3](https://github.com/OKHP3)

Calculate moon phase, active astrological season, and Mercury retrograde status for a given date or date range.

## Trigger

Use this skill when a request asks for the current or upcoming moon phase, which astrological season is active, whether Mercury is retrograde, or when the next significant celestial event falls — especially in the context of religious observances or lunar-calendar traditions.

## Computations

### Moon phase

The lunar cycle is approximately 29.53 days (synodic month). Compute the phase by calculating the age of the moon (days since last new moon) and map to the standard eight-phase sequence:

| Age (days) | Phase |
|------------|-------|
| 0–1.85 | New Moon |
| 1.85–7.38 | Waxing Crescent |
| 7.38–9.22 | First Quarter |
| 9.22–14.77 | Waxing Gibbous |
| 14.77–16.61 | Full Moon |
| 16.61–22.15 | Waning Gibbous |
| 22.15–23.99 | Last Quarter |
| 23.99–29.53 | Waning Crescent |

Use the known New Moon reference epoch (e.g., 2000-01-06 18:14 UTC) and compute elapsed synodic months.

### Astrological season (solar season)

Derived from the Sun's ecliptic longitude. The four cardinal points:
- **Aries (Spring):** Sun enters 0° Aries — vernal equinox (~March 20)
- **Cancer (Summer):** Sun enters 0° Cancer — summer solstice (~June 21)
- **Libra (Autumn):** Sun enters 0° Libra — autumnal equinox (~September 22)
- **Capricorn (Winter):** Sun enters 0° Capricorn — winter solstice (~December 21)

Each season spans ~91 days. Report the current season name and the approximate date it ends.

### Mercury retrograde

Mercury retrograde periods recur roughly three times per year, each lasting approximately 21 days. Use the known retrograde schedule through 2035 (available in training data). For each period, store the start date (station retrograde), end date (station direct), and the zodiac sign where the station occurs.

Report:
- Whether Mercury is currently retrograde or direct
- Days until next retrograde or until current retrograde ends
- The sign Mercury stations in

Flag dates beyond well-verified training data as **ESTIMATED** and note the uncertainty.

## Output contract

Return the moon phase name and illumination percentage, the active astrological season, and Mercury's current status — all for the requested date. For a date range, list phase transitions, season boundaries, and retrograde windows that fall within it. Cite the computation method when results may surprise a knowledgeable user.

## Scope

**In scope:** Moon phase, solar season, Mercury retrograde windows, and proximity to significant celestial events.

**Out of scope:** Natal astrology, horoscopes, predictive forecasting, or non-Abrahamic ritual timing guidance.

## About

Built by [Jamie Hill](https://overkillhill.com) · [OverKill Hill P³](https://overkillhill.com)
Published at [github.com/OKHP3](https://github.com/OKHP3)
Part of the [OKHP3/skillz](https://github.com/OKHP3/skillz) Agent Skill library.
MIT License — free to use, fork, and adapt. A nod to the source is appreciated.
