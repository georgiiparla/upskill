"use client";

import { useEffect } from 'react';
import { RouteErrorUI } from '@/components/shared/RouteErrorUI';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <RouteErrorUI error={error} reset={reset} />;
}