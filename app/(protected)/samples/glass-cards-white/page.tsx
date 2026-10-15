'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/common/container';

// Section labels in Persian — matches the /person/edit page sections.
const SECTIONS = [
  { num: 1,  fa: 'نام و نام خانوادگی' },
  { num: 2,  fa: 'اطلاعات هویتی' },
  { num: 3,  fa: 'تابعیت' },
  { num: 4,  fa: 'اطلاعات تماس' },
  { num: 5,  fa: 'وضعیت' },
  { num: 6,  fa: 'اطلاعات شغلی' },
  { num: 7,  fa: 'تحصیلات' },
  { num: 8,  fa: 'اسناد و مدارک' },
  { num: 9,  fa: 'بستگان' },
  { num: 10, fa: 'آدرس‌ها' },
];

// White / neutral glass palette — same descendant-selector pattern, but the
// hues are pure-white and the gray/neutral families instead of blue.
// In dark mode the same shade-50 over the dark backdrop reads as a bright glass
// pane (no dark-shade pair needed because we want a white look in both themes).

const W = {
  // pure white (no neutral cast)
  'white-25':    '[&_div.rounded-xl.bg-card]:bg-white/25! [&_div.rounded-xl.bg-card]:border-white/30!',
  'white-40':    '[&_div.rounded-xl.bg-card]:bg-white/40! [&_div.rounded-xl.bg-card]:border-white/50!',
  'white-60':    '[&_div.rounded-xl.bg-card]:bg-white/60! [&_div.rounded-xl.bg-card]:border-white/70!',
  'white-80':    '[&_div.rounded-xl.bg-card]:bg-white/80! [&_div.rounded-xl.bg-card]:border-white/90!',
  // slate (cool gray, slight blue tint)
  'slate-25':    '[&_div.rounded-xl.bg-card]:bg-slate-50/25! [&_div.rounded-xl.bg-card]:border-slate-100!',
  'slate-40':    '[&_div.rounded-xl.bg-card]:bg-slate-50/40! [&_div.rounded-xl.bg-card]:border-slate-100!',
  'slate-60':    '[&_div.rounded-xl.bg-card]:bg-slate-50/60! [&_div.rounded-xl.bg-card]:border-slate-100!',
  'slate-80':    '[&_div.rounded-xl.bg-card]:bg-slate-50/80! [&_div.rounded-xl.bg-card]:border-slate-100!',
  // zinc (neutral cool)
  'zinc-25':     '[&_div.rounded-xl.bg-card]:bg-zinc-50/25! [&_div.rounded-xl.bg-card]:border-zinc-100!',
  'zinc-40':     '[&_div.rounded-xl.bg-card]:bg-zinc-50/40! [&_div.rounded-xl.bg-card]:border-zinc-100!',
  'zinc-60':     '[&_div.rounded-xl.bg-card]:bg-zinc-50/60! [&_div.rounded-xl.bg-card]:border-zinc-100!',
  'zinc-80':     '[&_div.rounded-xl.bg-card]:bg-zinc-50/80! [&_div.rounded-xl.bg-card]:border-zinc-100!',
  // gray (true neutral)
  'gray-25':     '[&_div.rounded-xl.bg-card]:bg-gray-50/25! [&_div.rounded-xl.bg-card]:border-gray-100!',
  'gray-40':     '[&_div.rounded-xl.bg-card]:bg-gray-50/40! [&_div.rounded-xl.bg-card]:border-gray-100!',
  'gray-60':     '[&_div.rounded-xl.bg-card]:bg-gray-50/60! [&_div.rounded-xl.bg-card]:border-gray-100!',
  'gray-80':     '[&_div.rounded-xl.bg-card]:bg-gray-50/80! [&_div.rounded-xl.bg-card]:border-gray-100!',
  // neutral
  'neutral-25':  '[&_div.rounded-xl.bg-card]:bg-neutral-50/25! [&_div.rounded-xl.bg-card]:border-neutral-100!',
  'neutral-40':  '[&_div.rounded-xl.bg-card]:bg-neutral-50/40! [&_div.rounded-xl.bg-card]:border-neutral-100!',
  'neutral-60':  '[&_div.rounded-xl.bg-card]:bg-neutral-50/60! [&_div.rounded-xl.bg-card]:border-neutral-100!',
  'neutral-80':  '[&_div.rounded-xl.bg-card]:bg-neutral-50/80! [&_div.rounded-xl.bg-card]:border-neutral-100!',
  // stone (warm neutral)
  'stone-25':    '[&_div.rounded-xl.bg-card]:bg-stone-50/25! [&_div.rounded-xl.bg-card]:border-stone-100!',
  'stone-40':    '[&_div.rounded-xl.bg-card]:bg-stone-50/40! [&_div.rounded-xl.bg-card]:border-stone-100!',
  'stone-60':    '[&_div.rounded-xl.bg-card]:bg-stone-50/60! [&_div.rounded-xl.bg-card]:border-stone-100!',
  'stone-80':    '[&_div.rounded-xl.bg-card]:bg-stone-50/80! [&_div.rounded-xl.bg-card]:border-stone-100!',
} as const;

type WrapperTint = { hue: string; wrapper: string };

const HUE_ORDER: ('white' | 'slate' | 'zinc' | 'gray' | 'neutral' | 'stone')[] = [
  'white', 'slate', 'zinc', 'gray', 'neutral', 'stone',
  'white', 'slate', 'zinc', 'white',
];

function palette(op: 25 | 40 | 60 | 80): WrapperTint[] {
  return HUE_ORDER.map((h) => ({
    hue: h,
    wrapper: W[`${h}-${op}` as keyof typeof W],
  }));
}

const PALETTES = [
  { name: 'Palette A — opacity 25', description: 'Softest white/neutral glass.', tints: palette(25), opacity: 25 },
  { name: 'Palette B — opacity 40', description: 'Slightly more visible.', tints: palette(40), opacity: 40 },
  { name: 'Palette C — opacity 60', description: 'Clearly visible glass.', tints: palette(60), opacity: 60 },
  { name: 'Palette D — opacity 80', description: 'Most opaque — almost solid white.', tints: palette(80), opacity: 80 },
];

export default function GlassCardsWhiteSamplePage() {
  return (
    <Container>
      <div className="space-y-8 py-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Glass Background — White / Neutral palette</h1>
          <p className="text-muted-foreground text-sm">
            Same descendant-selector tinting pattern as <code>/person/edit</code>,
            but using pure <code>white</code> and the gray/neutral color families
            (<code>slate, zinc, gray, neutral, stone</code>) instead of blues.
            Pick a palette — say &quot;White A / B / C / D&quot; — and I&apos;ll apply it to the real page.
          </p>
        </div>

        {PALETTES.map((p) => (
          <section key={p.name} className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-xs text-muted-foreground">{p.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SECTIONS.map((s, idx) => {
                const t = p.tints[idx];
                return (
                  <div key={s.num} className={t.wrapper}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {s.num}
                          </span>
                          <span>{s.fa}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground">
                          {t.hue === 'white'
                            ? `white/${p.opacity}`
                            : `${t.hue}-50/${p.opacity} · ${t.hue}-100`}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
