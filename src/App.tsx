import React from 'react';
import PageShell from './PageShell';
import CardPattern from './pages/card';
import FeedbackPattern from './pages/feedback';
import ImagePattern from './pages/image';
import LightboxPattern from './pages/lightbox';
import SnippetPattern from './pages/snippet';
import WindowPattern from './pages/window';
import ThemeAdapter from './components/ThemeAdapter';

export default function App(): JSX.Element {
  return (
    <ThemeAdapter>
      <PageShell>
        <WindowPattern />
        <FeedbackPattern />
        <SnippetPattern />
        <CardPattern />
        <ImagePattern />
        <LightboxPattern />
      </PageShell>
    </ThemeAdapter>
  );
}
