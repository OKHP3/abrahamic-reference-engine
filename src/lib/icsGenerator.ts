/**
 * icsGenerator.ts
 * Abrahamic Reference Engine -- Observances Tab
 *
 * Client-side iCalendar (.ics) generation and browser download trigger.
 * No external library required. Pure string assembly per RFC 5545.
 *
 * Produces valid .ics files openable by:
 *   Google Calendar (import or subscription)
 *   Apple Calendar
 *   Microsoft Outlook
 *   Any RFC 5545-compliant calendar application
 *
 * Zero dependencies. Zero cost. MIT license.
 * OverKill Hill P3 / FoundRy -- okhp3.github.io/abrahamic-reference-engine
 */

import { type ObservanceEvent } from './observanceHelpers';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PRODID = '-//OKHP3//Abrahamic Reference Engine//EN';
const APP_URL = 'https://okhp3.github.io/abrahamic-reference-engine';
const MOON_SIGHTING_NOTICE =
  'Actual observance may vary by one day based on local moon sighting. ';

// ---------------------------------------------------------------------------
// Internal utilities
// ---------------------------------------------------------------------------

function formatDateOnly(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

function nowStamp(): string {
  return new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
}

function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  chunks.push(line.slice(0, 75));
  let i = 75;
  while (i < line.length) {
    chunks.push(' ' + line.slice(i, i + 74));
    i += 74;
  }
  return chunks.join('\r\n');
}

function icalEndDate(endDate: Date): string {
  const d = new Date(endDate);
  d.setDate(d.getDate() + 1);
  return formatDateOnly(d);
}

function buildDescription(event: ObservanceEvent): string {
  const prefix = event.tradition === 'islam' ? MOON_SIGHTING_NOTICE : '';
  return `${prefix}More information: ${APP_URL}`;
}

// ---------------------------------------------------------------------------
// VEVENT builder
// ---------------------------------------------------------------------------

function buildVEVENT(event: ObservanceEvent): string {
  const uid = `${escapeText(event.id)}@abrahamic-reference-engine.okhp3`;
  const summary = escapeText(event.title);
  const description = escapeText(buildDescription(event));
  const dtstart = formatDateOnly(event.startDate);
  const dtend = icalEndDate(event.endDate);
  const stamp = nowStamp();
  const category = event.tradition.toUpperCase();

  const lines = [
    'BEGIN:VEVENT',
    foldLine(`UID:${uid}`),
    foldLine(`SUMMARY:${summary}`),
    `DTSTART;VALUE=DATE:${dtstart}`,
    `DTEND;VALUE=DATE:${dtend}`,
    foldLine(`DESCRIPTION:${description}`),
    `CATEGORIES:${category}`,
    `DTSTAMP:${stamp}`,
  ];

  if (event.sourceUrl) {
    lines.push(foldLine(`URL:${event.sourceUrl}`));
  }

  lines.push('END:VEVENT');
  return lines.join('\r\n');
}

// ---------------------------------------------------------------------------
// Calendar wrapper
// ---------------------------------------------------------------------------

function buildVCALENDAR(calName: string, calDesc: string, vevents: string[]): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${PRODID}`,
    foldLine(`X-WR-CALNAME:${escapeText(calName)}`),
    foldLine(`X-WR-CALDESC:${escapeText(calDesc)}`),
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...vevents,
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function generateICS(events: ObservanceEvent[], calendarTitle: string): string {
  const calDesc =
    'Religious observances for Judaism, Christianity, and Islam. ' +
    'Source: Abrahamic Reference Engine by OverKill Hill P3. ' +
    APP_URL;

  const vevents = events.map(buildVEVENT);
  return buildVCALENDAR(calendarTitle, calDesc, vevents);
}

export function generateSingleEventICS(event: ObservanceEvent): string {
  const calTitle = `${event.rawName} -- ARE Observances`;
  const calDesc = `${event.rawName} -- Abrahamic Reference Engine. ${APP_URL}`;
  return buildVCALENDAR(calTitle, calDesc, [buildVEVENT(event)]);
}

export function downloadICS(icsContent: string, filename: string): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 100);
}

export function downloadYearICS(events: ObservanceEvent[], year: number): void {
  const ics = generateICS(events, `ARE Observances ${year}`);
  downloadICS(ics, `ARE-Observances-${year}.ics`);
}

export function downloadEventICS(event: ObservanceEvent): void {
  const ics = generateSingleEventICS(event);
  const slug = event.rawName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const year = event.startDate.getFullYear();
  downloadICS(ics, `${slug}-${year}.ics`);
}
