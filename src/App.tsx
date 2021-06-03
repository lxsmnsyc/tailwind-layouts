import React from 'react';
import { useRoute } from 'wouter';
import PageShell from './PageShell';
import ThemeAdapter from './components/ThemeAdapter';
import DemoPageShell from './DemoPageShell';
import PreviewPageShell from './PreviewPageShell';
import Home from './Home';
import PAGES from './pages';

interface InternalParams extends Record<string, string> {
  id: string
}

function Pattern(): JSX.Element {
  const [match, params] = useRoute<InternalParams>('/patterns/:id');

  if (match && params) {
    return (
      <PageShell>
        <DemoPageShell
          title={PAGES[params.id].title}
          code={PAGES[params.id].code}
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Home />
    </PageShell>
  );
}

function Internal(): JSX.Element {
  const [match, params] = useRoute<InternalParams>('/preview/:id');

  if (match && params) {
    return (
      <PreviewPageShell
        title={PAGES[params.id].title}
        code={PAGES[params.id].code}
      />
    );
  }

  return (
    <Pattern />
  );
}

export default function App(): JSX.Element {
  return (
    <ThemeAdapter>
      <Internal />
    </ThemeAdapter>
  );
}
