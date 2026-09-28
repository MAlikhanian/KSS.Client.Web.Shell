'use client';

import { useSettings } from '@/providers/settings-provider';
import { Demo1LightSidebarPage } from './dashboard/components/demo1';
import { Demo2Page } from './dashboard/components/demo2';
import { Demo3Page } from './dashboard/components/demo3';
import { Demo4Page } from './dashboard/components/demo4';
import { Demo5Page } from './dashboard/components/demo5';

export default function Page() {
  const { settings } = useSettings();

  if (settings?.layout === 'demo1') return <Demo1LightSidebarPage />;
  if (settings?.layout === 'demo2') return <Demo2Page />;
  if (settings?.layout === 'demo3') return <Demo3Page />;
  if (settings?.layout === 'demo4') return <Demo4Page />;
  if (settings?.layout === 'demo5') return <Demo5Page />;
  if (settings?.layout === 'demo6') return <Demo4Page />;
  if (settings?.layout === 'demo7') return <Demo2Page />;
  if (settings?.layout === 'demo8') return <Demo4Page />;
  if (settings?.layout === 'demo9') return <Demo2Page />;
  if (settings?.layout === 'demo10') return <Demo3Page />;
  // Fallback when no layout is set yet (prevents blank screen).
  return <Demo1LightSidebarPage />;
}
