export function matchesClassExpressionTS(string: string): boolean {
  return (
    !!/className\s*=\s*".*/.exec(string)
    || !!/class\s*=\s*".*/.exec(string)
    || !!/.*'.*/.exec(string)
    || !!/.*".*/.exec(string)
    || !!/.*`.*/.exec(string)
  );
}

export function matchesClassExpressionHTML(string: string): boolean {
  return (
    !!/class\s*=\s*".*/.exec(string)
    || !!/.*'.*/.exec(string)
    || !!/.*".*/.exec(string)
    || !!/.*`.*/.exec(string)
  );
}
