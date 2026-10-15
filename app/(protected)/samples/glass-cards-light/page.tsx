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

// Forced-light variants — every wrapper uses ONLY the shade-50 + shade-100
// classes (no dark: pair) so the cards render as the white/blue glass design
// regardless of the active theme. Plus we wrap each card-and-its-text in a
// white bg + dark text block so the entire preview reads as light mode.

const W = {
  'sky-25':    '[&_div.rounded-xl.bg-card]:bg-sky-50/25! [&_div.rounded-xl.bg-card]:border-sky-100!',
  'sky-40':    '[&_div.rounded-xl.bg-card]:bg-sky-50/40! [&_div.rounded-xl.bg-card]:border-sky-100!',
  'sky-60':    '[&_div.rounded-xl.bg-card]:bg-sky-50/60! [&_div.rounded-xl.bg-card]:border-sky-100!',
  'sky-80':    '[&_div.rounded-xl.bg-card]:bg-sky-50/80! [&_div.rounded-xl.bg-card]:border-sky-100!',
  'blue-25':   '[&_div.rounded-xl.bg-card]:bg-blue-50/25! [&_div.rounded-xl.bg-card]:border-blue-100!',
  'blue-40':   '[&_div.rounded-xl.bg-card]:bg-blue-50/40! [&_div.rounded-xl.bg-card]:border-blue-100!',
  'blue-60':   '[&_div.rounded-xl.bg-card]:bg-blue-50/60! [&_div.rounded-xl.bg-card]:border-blue-100!',
  'blue-80':   '[&_div.rounded-xl.bg-card]:bg-blue-50/80! [&_div.rounded-xl.bg-card]:border-blue-100!',
  'cyan-25':   '[&_div.rounded-xl.bg-card]:bg-cyan-50/25! [&_div.rounded-xl.bg-card]:border-cyan-100!',
  'cyan-40':   '[&_div.rounded-xl.bg-card]:bg-cyan-50/40! [&_div.rounded-xl.bg-card]:border-cyan-100!',
  'cyan-60':   '[&_div.rounded-xl.bg-card]:bg-cyan-50/60! [&_div.rounded-xl.bg-card]:border-cyan-100!',
  'cyan-80':   '[&_div.rounded-xl.bg-card]:bg-cyan-50/80! [&_div.rounded-xl.bg-card]:border-cyan-100!',
  'indigo-25': '[&_div.rounded-xl.bg-card]:bg-indigo-50/25! [&_div.rounded-xl.bg-card]:border-indigo-100!',
  'indigo-40': '[&_div.rounded-xl.bg-card]:bg-indigo-50/40! [&_div.rounded-xl.bg-card]:border-indigo-100!',
  'indigo-60': '[&_div.rounded-xl.bg-card]:bg-indigo-50/60! [&_div.rounded-xl.bg-card]:border-indigo-100!',
  'indigo-80': '[&_div.rounded-xl.bg-card]:bg-indigo-50/80! [&_div.rounded-xl.bg-card]:border-indigo-100!',
  'teal-25':   '[&_div.rounded-xl.bg-card]:bg-teal-50/25! [&_div.rounded-xl.bg-card]:border-teal-100!',
  'teal-40':   '[&_div.rounded-xl.bg-card]:bg-teal-50/40! [&_div.rounded-xl.bg-card]:border-teal-100!',
  'teal-60':   '[&_div.rounded-xl.bg-card]:bg-teal-50/60! [&_div.rounded-xl.bg-card]:border-teal-100!',
  'teal-80':   '[&_div.rounded-xl.bg-card]:bg-teal-50/80! [&_div.rounded-xl.bg-card]:border-teal-100!',
  'slate-25':  '[&_div.rounded-xl.bg-card]:bg-slate-50/25! [&_div.rounded-xl.bg-card]:border-slate-100!',
  'slate-40':  '[&_div.rounded-xl.bg-card]:bg-slate-50/40! [&_div.rounded-xl.bg-card]:border-slate-100!',
  'slate-60':  '[&_div.rounded-xl.bg-card]:bg-slate-50/60! [&_div.rounded-xl.bg-card]:border-slate-100!',
  'slate-80':  '[&_div.rounded-xl.bg-card]:bg-slate-50/80! [&_div.rounded-xl.bg-card]:border-slate-100!',
} as const;

type WrapperTint = { hue: string; wrapper: string };

function palette(op: 25 | 40 | 60 | 80): WrapperTint[] {
  return [
    { hue: 'sky',    wrapper: W[`sky-${op}` as keyof typeof W] },
    { hue: 'blue',   wrapper: W[`blue-${op}` as keyof typeof W] },
    { hue: 'cyan',   wrapper: W[`cyan-${op}` as keyof typeof W] },
    { hue: 'indigo', wrapper: W[`indigo-${op}` as keyof typeof W] },
    { hue: 'teal',   wrapper: W[`teal-${op}` as keyof typeof W] },
    { hue: 'sky',    wrapper: W[`sky-${op}` as keyof typeof W] },
    { hue: 'slate',  wrapper: W[`slate-${op}` as keyof typeof W] },
    { hue: 'blue',   wrapper: W[`blue-${op}` as keyof typeof W] },
    { hue: 'indigo', wrapper: W[`indigo-${op}` as keyof typeof W] },
    { hue: 'sky',    wrapper: W[`sky-${op}` as keyof typeof W] },
  ];
}

const PALETTES = [
  { name: 'Palette A — opacity 25  (matches /person/edit light-mode)', description: 'Same softness as the live page in light theme.', tints: palette(25), opacity: 25 },
  { name: 'Palette B — opacity 40', description: 'Slightly more visible.', tints: palette(40), opacity: 40 },
  { name: 'Palette C — opacity 60', description: 'Hue clearly visible, still pastel.', tints: palette(60), opacity: 60 },
  { name: 'Palette D — opacity 80', description: 'Most saturated of the four.', tints: palette(80), opacity: 80 },
];

export default function GlassCardsLightSamplePage() {
  return (
    <Container>
      {/* Forced-light wrapper — explicit white bg + dark text overrides whatever
          the active theme is, so this preview always shows the light-mode look. */}
      <div className="bg-white text-gray-900 rounded-lg p-6 my-4 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Glass Background Palette — Light Mode</h1>
          <p className="text-gray-600 text-sm">
            Forced light preview — independent of system/site theme. Each card uses
            <code className="mx-1">bg-{'{hue}'}-50/{'{op}'}!</code> over a white page background.
            Pick a palette — say &quot;A / B / C / D&quot; — and I&apos;ll apply it to <code>/person/edit</code>.
          </p>
        </div>

        {/* Reference — exact wrapper from /person/edit (light variant only) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Reference: live tint on /person/edit (light mode)</h2>
            <p className="text-xs text-gray-500">
              <code>bg-blue-50/25 + border-blue-100</code>
            </p>
          </div>
          <div className={W['blue-25']}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SECTIONS.slice(0, 4).map((s) => (
                <Card key={s.num}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {s.num}
                      </span>
                      <span>{s.fa}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-gray-500">bg: blue-50/25 · border: blue-100</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {PALETTES.map((p) => (
          <section key={p.name} className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>
              <p className="text-xs text-gray-500">{p.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SECTIONS.map((s, idx) => {
                const t = p.tints[idx];
                return (
                  <div key={s.num} className={t.wrapper}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-900">
                          <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {s.num}
                          </span>
                          <span>{s.fa}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-gray-500">
                          {t.hue}-50/{p.opacity} · {t.hue}-100
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
