import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDarkPreference, useSetThemePreference } from './ThemeAdapter';

export default function DarkModeToggle(): JSX.Element {
  const isDarkMode = useDarkPreference();
  const setPreference = useSetThemePreference();

  return (
    <div className="py-4 px-2 flex">
      <button
        type="button"
        onClick={() => {
          setPreference(isDarkMode ? 'light' : 'dark');
        }}
        className="w-6 h-6"
      >
        <span className="sr-only">Toggle Dark Mode</span>
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
