export default function matchURLS(str: string): string[] {
  // Find all "from" expression
  const fromMatches = str.match(/from ((".*")|('.*'))/g) ?? [];
  // Find all "dynamic import" expression
  const importMatches = str.match(/import\(((".*")|('.*'))\)/g) ?? [];

  const matches = [
    ...fromMatches.map((item) => item.replace('from ', '')),
    ...importMatches
      .map((item) => item.replace('import', ''))
      .map((item) => item.substring(1, item.length - 1)),
  ].map((item) => item.substring(1, item.length - 1));

  return matches;
}
