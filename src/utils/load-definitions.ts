import { editor, languages, Uri } from 'monaco-editor';
import { SKYPACK, UNPKG } from './constants';
import matchURLS from './match-urls';

interface PackageJSON {
  types?: string;
  typings?: string;
}

const GLOBAL_CACHE = new Set();

class DefLoader {
  private addFile(
    content: string,
    uri: string,
    type: string,
  ) {
    languages.typescript.typescriptDefaults.addExtraLib(
      content,
      uri,
    );

    editor.createModel(
      content,
      type,
      Uri.parse(uri),
    );
  }

  private async parseTSFiles(
    cdn: string,
    alias = cdn,
  ): Promise<void> {
    await Promise.all([
      this.parseDTS(
        `${cdn}.ts`,
        `${alias}.ts`,
      ),
      this.parseDTS(
        `${cdn}.tsx`,
        `${alias}.tsx`,
      ),
      this.parseDTS(
        `${cdn}.d.ts`,
        `${alias}.d.ts`,
      ),
    ]);
  }

  private async parseIndexFiles(
    cdn: string,
    alias = cdn,
  ): Promise<void> {
    await this.parseTSFiles(
      `${cdn}index`,
      `${alias}index`,
    );
  }

  private async parseDTS(
    cdn: string,
    alias = cdn,
  ): Promise<void> {
    const response = await fetch(cdn);
    if (response.ok) {
      const dts = await response.text();
      // const redirectedCDN = response.url;

      this.addFile(dts, alias, 'typescript');

      const imports = matchURLS(dts) ?? [];

      // Always assume that the cdn got redirected
      const url = new URL(cdn);
      const aliasURL = new URL(alias);
      const splitPath = url.pathname.split('/');
      const directory = splitPath.slice(0, -1).join('/');

      await Promise.all(imports.map(async (path) => {
        if (path.endsWith('/')) {
          await this.parseIndexFiles(
            `${url.origin}${directory}/${path}`,
            `${aliasURL.origin}${directory}/${path}`,
          );
        } else if (path.endsWith('..')) {
          await this.parseIndexFiles(
            `${url.origin}${directory}/${path}/`,
            `${aliasURL.origin}${directory}/${path}/`,
          );
        } else if (path.startsWith('./') || path.startsWith('../')) {
          await this.parseTSFiles(
            `${url.origin}${directory}/${path}`,
            `${aliasURL.origin}${directory}/${path}`,
          );
        } else if (path.startsWith('http://') || path.startsWith('https://')) {
          await this.parseDTS(path);
        } else if (path.startsWith('/')) {
          await this.loadPath(
            `${url.origin}${path}`,
          );
        } else {
          await this.loadPath(
            `${url.origin}/${path}`,
          );
        }
      }));
    }
  }

  async loadPath(
    source: string,
    original = source,
  ): Promise<void> {
    if (GLOBAL_CACHE.has(source)) {
      return;
    }
    GLOBAL_CACHE.add(source);

    if (source.startsWith(SKYPACK) || source.startsWith(UNPKG)) {
      const response = await fetch(`${source}/package.json`);
      const pkg = await response.json() as PackageJSON;
      const typeDeclaration = pkg.types ?? pkg.typings;
      if (typeDeclaration) {
        this.addFile(JSON.stringify(pkg), `${original}/package.json`, 'json');
        await this.parseDTS(
          `${source}/${typeDeclaration}`,
          `${original}/${typeDeclaration}`,
        );
      } else {
        const cdnURL = new URL(source);
        await this.loadPath(
          `${cdnURL.origin}/@types${cdnURL.pathname}`,
          source,
        );
      }
    }
  }
}

export default async function loadDefinitions(
  source: string,
): Promise<void> {
  const imports = matchURLS(source) ?? [];

  const loader = new DefLoader();

  await Promise.all(imports.map(async (path) => {
    if (path) {
      await loader.loadPath(path);
    }
  }));
}
