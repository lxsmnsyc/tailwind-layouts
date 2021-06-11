import { useState, useEffect } from 'react';
import createModel, { createSelector } from 'react-scoped-model';
import { Project } from '../pages/types';
import { useEnvironmentState } from './Environment';

interface PlaygroundProps {
  id: string;
  code: Project;
  title: string;
}

export const Playground = createModel(({ title, code, id }: PlaygroundProps) => {
  const environment = useEnvironmentState();

  const [currentCode, setCurrentCode] = useState<Project>(code);
  const [error, setError] = useState<Error>();
  const [, setRenderError] = useState<boolean>(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  useEffect(() => {
    setError(undefined);
  }, [currentCode, environment]);

  const [debouncedCode, setDebouncedCode] = useState(currentCode);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedCode(currentCode);
      setRenderError((prev) => {
        if (prev) {
          setRetryKey((key) => key + 1);
        }
        return false;
      });
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentCode]);

  return {
    id,
    title,
    code,
    state: {
      error,
      currentCode,
      debouncedCode,
      retryKey,
    },
    dispatch: {
      setError,
      setCurrentCode,
      setDebouncedCode,
      setRenderError,
    },
  };
});

export const usePlaygroundId = createSelector(
  Playground,
  (state) => state.id,
);

export const usePlaygroundTitle = createSelector(
  Playground,
  (state) => state.title,
);

export const usePlaygroundCode = createSelector(
  Playground,
  (state) => state.code,
);

export const usePlaygroundRetryKey = createSelector(
  Playground,
  (state) => state.state.retryKey,
);

export const usePlaygroundRenderError = createSelector(
  Playground,
  (state) => state.dispatch.setRenderError,
);

export const usePlaygroundError = createSelector(
  Playground,
  ({ state, dispatch }) => ({
    value: state.error,
    dispatch: dispatch.setError,
  }),
  (prev, next) => (
    !Object.is(prev.value, next.value)
    || !Object.is(next.dispatch, prev.dispatch)
  ),
);

export const usePlaygroundCurrentCode = createSelector(
  Playground,
  ({ state, dispatch }) => ({
    value: state.currentCode,
    dispatch: dispatch.setCurrentCode,
  }),
  (prev, next) => (
    !Object.is(prev.value, next.value)
    || !Object.is(next.dispatch, prev.dispatch)
  ),
);

export const usePlaygroundDebouncedCode = createSelector(
  Playground,
  ({ state, dispatch }) => ({
    value: state.debouncedCode,
    dispatch: dispatch.setDebouncedCode,
  }),
  (prev, next) => (
    !Object.is(prev.value, next.value)
    || !Object.is(next.dispatch, prev.dispatch)
  ),
);
