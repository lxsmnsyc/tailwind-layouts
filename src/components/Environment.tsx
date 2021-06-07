import { useConstantCallback, usePageVisibility } from '@lyonph/react-hooks';
import React, { FC, useEffect, useState } from 'react';
import { createPropsSelectorModel, createSelector } from 'react-scoped-model';
import { useLocation } from 'wouter';
import { ENVIRONMENTS } from '../pages';
import { ProjectMode } from '../pages/types';

interface EnvironmentPreferenceContext {
  preference: ProjectMode;
  setPreference: (value: ProjectMode) => void;
}

const EnvironmentPreference = createPropsSelectorModel<EnvironmentPreferenceContext>({
  displayName: 'EnvironmentPreference',
});

export const useEnvironmentState = createSelector(
  EnvironmentPreference,
  (state) => state.preference,
);

export const useEnvironmentStateDispatch = createSelector(
  EnvironmentPreference,
  (state) => state.setPreference,
);

const STORAGE_KEY = 'environment-preference';

export const EnvironmentAdapter: FC = ({ children }) => {
  const visibility = usePageVisibility();

  const [local, setLocal] = useState<ProjectMode>('react');

  // Since storage events only work for other windows
  // we need to make the main window sync
  useEffect(() => {
    const onChange = () => {
      const value = localStorage.getItem(STORAGE_KEY);

      if (value) {
        setLocal(value as ProjectMode);
      } else {
        setLocal('react');
      }
    };
    window.addEventListener('storage', onChange, false);

    onChange();

    return () => {
      window.removeEventListener('storage', onChange, false);
    };
  }, [visibility]);

  const setPreference = useConstantCallback((value: ProjectMode) => {
    localStorage.setItem(STORAGE_KEY, value);
    setLocal(value);
  });

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    const param = url.get('environment');

    if (param) {
      setPreference(param as ProjectMode);
    }
  }, [setPreference]);

  return (
    <EnvironmentPreference.Provider
      preference={local}
      setPreference={setPreference}
    >
      { children }
    </EnvironmentPreference.Provider>
  );
};

export function EnvironmentSelector(): JSX.Element {
  const [location, setLocation] = useLocation();
  const state = useEnvironmentState();
  const dispatch = useEnvironmentStateDispatch();

  return (
    <div className="py-4 px-2 flex items-center justify-center">
      <select
        value={state}
        onChange={(event) => {
          const env: ProjectMode = event.currentTarget.value as ProjectMode;
          dispatch(env);
          setLocation(`${location}?environment=${env}`);
        }}
        className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-lg"
      >
        {Object.entries(ENVIRONMENTS).map(([key, value]) => (
          <option
            key={key}
            value={key}
            className="bg-gray-100 dark:bg-gray-900"
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
