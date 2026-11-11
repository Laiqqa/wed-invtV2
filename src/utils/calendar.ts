import type { EventDetail } from '../types/wedding';

/**
 * Generate Google Calendar direct URL
 */
export function getGoogleCalendarUrl(event: EventDetail): string {
  const { title, description, startDate, endDate } = event.calendarEvent;
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const params = new URLSearchParams({
    text: title,
    dates: `${startDate}/${endDate}`,
    details: `${description}\n\nInfo lokasi: ${event.address}`,
    location: `${event.locationName}, ${event.address}`,
  });
  return `${baseUrl}&${params.toString()}`;
}

/**
 * Generate standard iCalendar (.ics) content and trigger instant download
 */
export function downloadIcsFile(event: EventDetail): void {
  const { title, description, location, startDate, endDate } = event.calendarEvent;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arya & Nayla Wedding//ID',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-arya-nayla.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
