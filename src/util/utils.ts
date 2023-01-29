export function isTheSameDay(
  timestamp_1: number,
  timestamp_2: number,
): boolean {
  const date_1 = new Date(timestamp_1);
  const date_2 = new Date(timestamp_2);

  return (
    date_1.getFullYear() === date_2.getFullYear() &&
    date_1.getMonth() === date_2.getMonth() &&
    date_1.getDate() === date_2.getDate()
  );
}

export function addLeadingZero(target: string, targetLength: number): string {
  return target.padStart(targetLength, '0'); /* 1 => 01 */
}

export function toHoursAndMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${addLeadingZero(String(hours), 2)}:${addLeadingZero(
    String(minutes),
    2,
  )}`; /* 540 => '09:00' */
}
