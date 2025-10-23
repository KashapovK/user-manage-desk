import type { ReactNode } from 'react';
import Spinner from './spinner';

interface RequestSuspenseProps {
  pending: boolean;
  children: ReactNode;
}

export default function RequestSuspense({ pending, children }: RequestSuspenseProps) {
  return pending ? <Spinner /> : <>{children}</>;
}
