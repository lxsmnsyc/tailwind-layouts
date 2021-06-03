import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDarkPreference, useSetThemePreference } from './ThemeAdapter';

export default function DarkModeToggle(): JSX.Element {
  const isDarkMode = useDarkPreference();
  const setPreference = useSetThemePreference();

  return (
    <div className="py-4 px-2">
      <button
        type="button"
        onClick={() => {
          setPreference(isDarkMode ? 'light' : 'dark');
        }}
        className="w-6 h-6"
      >
        {isDarkMode
          ? (
            <MoonIcon />
          )
          : (
            <SunIcon />
          )}
      </button>
    </div>
  );
}
