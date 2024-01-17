'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Template({ children }: { children: React.ReactNode }) {
  useAuth();
  return <div>{children}</div>;
}
