'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/common/container';

const SAMPLES = [
  {
    title: 'Glass cards — full palette (light + dark side-by-side)',
    description: 'Generic preview cards with every hue family at every opacity, each shown in BOTH themes simultaneously. Use this to pick a tint without toggling the site theme.',
    href: '/samples/glass-cards',
  },
  {
    title: 'Glass cards — blue palette (forced light, legacy)',
    description: 'Older single-theme view of blue tints. Kept for reference.',
    href: '/samples/glass-cards-light',
  },
  {
    title: 'Glass cards — white / neutral palette (legacy)',
    description: 'Pure white + gray families on a dark backdrop. Older single-theme view.',
    href: '/samples/glass-cards-white',
  },
];

export default function SamplesIndexPage() {
  return (
    <Container>
      <div className="space-y-6 py-6">
        <div>
          <h1 className="text-2xl font-bold">UI Samples</h1>
          <p className="text-muted-foreground text-sm">
            Internal preview pages for design decisions. Not linked from the
            sidebar — accessible by direct URL.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLES.map((s) => (
            <Link key={s.href} href={s.href} className="block">
              <Card className="hover:bg-accent/40 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                  <code className="text-xs text-blue-500 mt-2 inline-block">{s.href}</code>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
