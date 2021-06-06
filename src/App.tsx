import React, { lazy, Suspense } from 'react';
import { useRoute } from 'wouter';
import PageShell from './PageShell';
import ThemeAdapter from './components/ThemeAdapter';
import Home from './Home';
import PAGES from './pages';
import FullLoader from './components/FullLoader';
import { EnvironmentAdapter } from './components/Environment';

const DemoPageShell = lazy(() => import('./DemoPageShell'));

interface InternalParams extends Record<string, string> {
  id: string
}

function Internal(): JSX.Element {
  const [match, params] = useRoute<InternalParams>('/patterns/:id');

  if (match && params) {
    return (
      <PageShell>
        <Suspense fallback={<FullLoader />}>
          <DemoPageShell
            title={PAGES[params.id].title}
            code={PAGES[params.id].code}
          />
        </Suspense>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Home />
    </PageShell>
  );
}

export default function App(): JSX.Element {
  return (
    <EnvironmentAdapter>
      <ThemeAdapter>
        <Internal />
      </ThemeAdapter>
    </EnvironmentAdapter>
  );
}
