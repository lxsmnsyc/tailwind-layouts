export default function getRange(
  string: string,
  start: number,
  step: number,
): number {
  const match = /\s+/.exec(string[start]);
  if (match) {
    return start;
  }
  if (string[start] === "'") {
    return start;
  }
  if (string[start] === '"') {
    return start;
  }
  if (string[start] === '`') {
    return start;
  }
  if (step < 0 && start < 0) {
    return 0;
  }
  if (step > 0 && string.length < start) {
    return string.length;
  }
  return getRange(string, start + step, step);
}
