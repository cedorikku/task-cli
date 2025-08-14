/**
 * Formats a timestamp (number or string) into a human-readable date string
 * including the day of the week (e.g., "Tue, Aug 10, 2025, 12:00").
 *
 * @param {number|string} timestamp - The timestamp in milliseconds (UNIX). Can be a number or a string that can be converted to a number.
 * @returns {string} Formatted date string with weekday, date, and time in 12-hr format.
 */
export function formatTimestamp(timestamp) {
    const tsNumber =
        typeof timestamp === 'string' ? Number(timestamp) : timestamp;

    const date = new Date(tsNumber);

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayName = weekdays[date.getDay()];

    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return `${weekdayName}, ${date.toLocaleString('en-US', options)}`;
}
