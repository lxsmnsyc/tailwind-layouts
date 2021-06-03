import React, { Component, ErrorInfo, ReactNode } from 'react';

export type ErrorBoundaryOnError = (error: Error, info: ErrorInfo) => void;

export interface ErrorBoundaryState {
  error?: Error;
}

export interface ErrorBoundaryProps {
  onError?: ErrorBoundaryOnError;
  fallback?: ReactNode;
  children?: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return {
      error,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;
    onError?.(error, info);
  }

  render(): JSX.Element {
    const { state: { error }, props: { fallback, children } } = this;

    if (error) {
      return <>{fallback}</>;
    }

    return <>{children}</>;
  }
}
