import React, { lazy, Suspense } from 'react';
import { useRoute } from 'wouter';
import PageShell from './PageShell';
import ThemeAdapter from './components/ThemeAdapter';
import Home from './Home';
import PAGES from './pages';
import FullLoader from './components/FullLoader';

const DemoPageShell = lazy(() => import('./DemoPageShell'));
const PreviewPageShell = lazy(() => import('./PreviewPageShell'));

interface InternalParams extends Record<string, string> {
  id: string
}

function Pattern(): JSX.Element {
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

function Internal(): JSX.Element {
  const [match, params] = useRoute<InternalParams>('/preview/:id');

  if (match && params) {
    return (
      <Suspense fallback={<FullLoader />}>
        <PreviewPageShell
          title={PAGES[params.id].title}
          code={PAGES[params.id].code}
        />
      </Suspense>
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
