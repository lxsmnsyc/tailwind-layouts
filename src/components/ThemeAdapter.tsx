import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import {
  usePrefersDarkTheme,
  useConstantCallback,
  usePageVisibility,
} from '@lyonph/react-hooks';
import {
  createPropsSelectorModel,
  createSelector,
} from 'react-scoped-model';

export type ThemePreference = 'dark' | 'light' | 'system';

interface ThemePreferenceContext {
  preference: ThemePreference;
  setPreference: (value: ThemePreference) => void;
}

const ThemePreference = createPropsSelectorModel<ThemePreferenceContext>({
  displayName: 'ThemePreference',
});

export const useThemePreference = createSelector(
  ThemePreference,
  (state) => state.preference,
);
export const useSetThemePreference = createSelector(
  ThemePreference,
  (state) => state.setPreference,
);

export function useDarkPreference(initial = false): boolean {
  const preference = useThemePreference();
  const isDarkTheme = usePrefersDarkTheme();

  const [state, setState] = useState(initial);

  const initialRender = useRef(true);

  const darkMode = (preference === 'dark') || (preference === 'system' && isDarkTheme);

  if (!initialRender.current && state !== darkMode) {
    setState(darkMode);
  }

  useEffect(() => {
    if (initialRender.current) {
      setState(darkMode);
    }
    initialRender.current = false;
  }, [darkMode]);

  return darkMode;
}

const STORAGE_KEY = 'theme-preference';

const ThemeAdapter: FC = ({ children }) => {
  const preference = usePrefersDarkTheme();

  const visibility = usePageVisibility();

  const [local, setLocal] = useState<ThemePreference>('system');

  // Since storage events only work for other windows
  // we need to make the main window sync
  useEffect(() => {
    const value = localStorage.getItem(STORAGE_KEY);

    if (value) {
      setLocal(value as ThemePreference);
    } else {
      setLocal('system');
    }
  }, [visibility]);

  const setPreference = useConstantCallback((value: ThemePreference) => {
    localStorage.setItem(STORAGE_KEY, value);
    setLocal(value);
  });

  useEffect(() => {
    const { classList } = document.documentElement;
    if ((local === 'system' && preference) || (local === 'dark')) {
      if (!classList.contains('dark')) {
        classList.add('dark');
      }
    } else {
      classList.remove('dark');
    }
  }, [preference, local]);

  return (
    <ThemePreference.Provider preference={local} setPreference={setPreference}>
      { children }
    </ThemePreference.Provider>
  );
};

export default ThemeAdapter;
