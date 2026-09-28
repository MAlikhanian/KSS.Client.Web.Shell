'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/common/container';
import { ThemeSplitFrame } from '../_components/theme-split-frame';

// ─────────────────────────────────────────────────────────────────────────────
// Generic, content-free preview cards. NOT tied to /person/* — this sample
// page is for design decisions only. Just numbered placeholders.
// ─────────────────────────────────────────────────────────────────────────────

const NUMBERED_SAMPLES = Array.from({ length: 6 }, (_, i) => i + 1);

// All wrapper class strings as literals so Tailwind 4 JIT picks them up.
// Pattern: light = `bg-{hue}-50/{op}` + `border-{hue}-100`,
//          dark  = `bg-{hue}-950/{op}` + `border-{hue}-900`.
const W = {
  // ── cool ─────────────────────────────────────────────────────────────────
  'sky-25':    '[&_div.rounded-xl.bg-card]:bg-sky-50/25! [&_div.rounded-xl.bg-card]:border-sky-100! dark:[&_div.rounded-xl.bg-card]:bg-sky-950/25! dark:[&_div.rounded-xl.bg-card]:border-sky-900!',
  'sky-40':    '[&_div.rounded-xl.bg-card]:bg-sky-50/40! [&_div.rounded-xl.bg-card]:border-sky-100! dark:[&_div.rounded-xl.bg-card]:bg-sky-950/40! dark:[&_div.rounded-xl.bg-card]:border-sky-900!',
  'sky-60':    '[&_div.rounded-xl.bg-card]:bg-sky-50/60! [&_div.rounded-xl.bg-card]:border-sky-100! dark:[&_div.rounded-xl.bg-card]:bg-sky-950/60! dark:[&_div.rounded-xl.bg-card]:border-sky-900!',
  'sky-80':    '[&_div.rounded-xl.bg-card]:bg-sky-50/80! [&_div.rounded-xl.bg-card]:border-sky-100! dark:[&_div.rounded-xl.bg-card]:bg-sky-950/80! dark:[&_div.rounded-xl.bg-card]:border-sky-900!',
  'blue-25':   '[&_div.rounded-xl.bg-card]:bg-blue-50/25! [&_div.rounded-xl.bg-card]:border-blue-100! dark:[&_div.rounded-xl.bg-card]:bg-blue-950/25! dark:[&_div.rounded-xl.bg-card]:border-blue-900!',
  'blue-40':   '[&_div.rounded-xl.bg-card]:bg-blue-50/40! [&_div.rounded-xl.bg-card]:border-blue-100! dark:[&_div.rounded-xl.bg-card]:bg-blue-950/40! dark:[&_div.rounded-xl.bg-card]:border-blue-900!',
  'blue-60':   '[&_div.rounded-xl.bg-card]:bg-blue-50/60! [&_div.rounded-xl.bg-card]:border-blue-100! dark:[&_div.rounded-xl.bg-card]:bg-blue-950/60! dark:[&_div.rounded-xl.bg-card]:border-blue-900!',
  'blue-80':   '[&_div.rounded-xl.bg-card]:bg-blue-50/80! [&_div.rounded-xl.bg-card]:border-blue-100! dark:[&_div.rounded-xl.bg-card]:bg-blue-950/80! dark:[&_div.rounded-xl.bg-card]:border-blue-900!',
  'cyan-25':   '[&_div.rounded-xl.bg-card]:bg-cyan-50/25! [&_div.rounded-xl.bg-card]:border-cyan-100! dark:[&_div.rounded-xl.bg-card]:bg-cyan-950/25! dark:[&_div.rounded-xl.bg-card]:border-cyan-900!',
  'cyan-40':   '[&_div.rounded-xl.bg-card]:bg-cyan-50/40! [&_div.rounded-xl.bg-card]:border-cyan-100! dark:[&_div.rounded-xl.bg-card]:bg-cyan-950/40! dark:[&_div.rounded-xl.bg-card]:border-cyan-900!',
  'cyan-60':   '[&_div.rounded-xl.bg-card]:bg-cyan-50/60! [&_div.rounded-xl.bg-card]:border-cyan-100! dark:[&_div.rounded-xl.bg-card]:bg-cyan-950/60! dark:[&_div.rounded-xl.bg-card]:border-cyan-900!',
  'cyan-80':   '[&_div.rounded-xl.bg-card]:bg-cyan-50/80! [&_div.rounded-xl.bg-card]:border-cyan-100! dark:[&_div.rounded-xl.bg-card]:bg-cyan-950/80! dark:[&_div.rounded-xl.bg-card]:border-cyan-900!',
  'indigo-25': '[&_div.rounded-xl.bg-card]:bg-indigo-50/25! [&_div.rounded-xl.bg-card]:border-indigo-100! dark:[&_div.rounded-xl.bg-card]:bg-indigo-950/25! dark:[&_div.rounded-xl.bg-card]:border-indigo-900!',
  'indigo-40': '[&_div.rounded-xl.bg-card]:bg-indigo-50/40! [&_div.rounded-xl.bg-card]:border-indigo-100! dark:[&_div.rounded-xl.bg-card]:bg-indigo-950/40! dark:[&_div.rounded-xl.bg-card]:border-indigo-900!',
  'indigo-60': '[&_div.rounded-xl.bg-card]:bg-indigo-50/60! [&_div.rounded-xl.bg-card]:border-indigo-100! dark:[&_div.rounded-xl.bg-card]:bg-indigo-950/60! dark:[&_div.rounded-xl.bg-card]:border-indigo-900!',
  'indigo-80': '[&_div.rounded-xl.bg-card]:bg-indigo-50/80! [&_div.rounded-xl.bg-card]:border-indigo-100! dark:[&_div.rounded-xl.bg-card]:bg-indigo-950/80! dark:[&_div.rounded-xl.bg-card]:border-indigo-900!',
  'teal-25':   '[&_div.rounded-xl.bg-card]:bg-teal-50/25! [&_div.rounded-xl.bg-card]:border-teal-100! dark:[&_div.rounded-xl.bg-card]:bg-teal-950/25! dark:[&_div.rounded-xl.bg-card]:border-teal-900!',
  'teal-40':   '[&_div.rounded-xl.bg-card]:bg-teal-50/40! [&_div.rounded-xl.bg-card]:border-teal-100! dark:[&_div.rounded-xl.bg-card]:bg-teal-950/40! dark:[&_div.rounded-xl.bg-card]:border-teal-900!',
  'teal-60':   '[&_div.rounded-xl.bg-card]:bg-teal-50/60! [&_div.rounded-xl.bg-card]:border-teal-100! dark:[&_div.rounded-xl.bg-card]:bg-teal-950/60! dark:[&_div.rounded-xl.bg-card]:border-teal-900!',
  'teal-80':   '[&_div.rounded-xl.bg-card]:bg-teal-50/80! [&_div.rounded-xl.bg-card]:border-teal-100! dark:[&_div.rounded-xl.bg-card]:bg-teal-950/80! dark:[&_div.rounded-xl.bg-card]:border-teal-900!',
  // ── warm / red family ────────────────────────────────────────────────────
  'red-25':    '[&_div.rounded-xl.bg-card]:bg-red-50/25! [&_div.rounded-xl.bg-card]:border-red-100! dark:[&_div.rounded-xl.bg-card]:bg-red-950/25! dark:[&_div.rounded-xl.bg-card]:border-red-900!',
  'red-40':    '[&_div.rounded-xl.bg-card]:bg-red-50/40! [&_div.rounded-xl.bg-card]:border-red-100! dark:[&_div.rounded-xl.bg-card]:bg-red-950/40! dark:[&_div.rounded-xl.bg-card]:border-red-900!',
  'red-60':    '[&_div.rounded-xl.bg-card]:bg-red-50/60! [&_div.rounded-xl.bg-card]:border-red-100! dark:[&_div.rounded-xl.bg-card]:bg-red-950/60! dark:[&_div.rounded-xl.bg-card]:border-red-900!',
  'red-80':    '[&_div.rounded-xl.bg-card]:bg-red-50/80! [&_div.rounded-xl.bg-card]:border-red-100! dark:[&_div.rounded-xl.bg-card]:bg-red-950/80! dark:[&_div.rounded-xl.bg-card]:border-red-900!',
  'rose-25':   '[&_div.rounded-xl.bg-card]:bg-rose-50/25! [&_div.rounded-xl.bg-card]:border-rose-100! dark:[&_div.rounded-xl.bg-card]:bg-rose-950/25! dark:[&_div.rounded-xl.bg-card]:border-rose-900!',
  'rose-40':   '[&_div.rounded-xl.bg-card]:bg-rose-50/40! [&_div.rounded-xl.bg-card]:border-rose-100! dark:[&_div.rounded-xl.bg-card]:bg-rose-950/40! dark:[&_div.rounded-xl.bg-card]:border-rose-900!',
  'rose-60':   '[&_div.rounded-xl.bg-card]:bg-rose-50/60! [&_div.rounded-xl.bg-card]:border-rose-100! dark:[&_div.rounded-xl.bg-card]:bg-rose-950/60! dark:[&_div.rounded-xl.bg-card]:border-rose-900!',
  'rose-80':   '[&_div.rounded-xl.bg-card]:bg-rose-50/80! [&_div.rounded-xl.bg-card]:border-rose-100! dark:[&_div.rounded-xl.bg-card]:bg-rose-950/80! dark:[&_div.rounded-xl.bg-card]:border-rose-900!',
  'pink-25':   '[&_div.rounded-xl.bg-card]:bg-pink-50/25! [&_div.rounded-xl.bg-card]:border-pink-100! dark:[&_div.rounded-xl.bg-card]:bg-pink-950/25! dark:[&_div.rounded-xl.bg-card]:border-pink-900!',
  'pink-40':   '[&_div.rounded-xl.bg-card]:bg-pink-50/40! [&_div.rounded-xl.bg-card]:border-pink-100! dark:[&_div.rounded-xl.bg-card]:bg-pink-950/40! dark:[&_div.rounded-xl.bg-card]:border-pink-900!',
  'pink-60':   '[&_div.rounded-xl.bg-card]:bg-pink-50/60! [&_div.rounded-xl.bg-card]:border-pink-100! dark:[&_div.rounded-xl.bg-card]:bg-pink-950/60! dark:[&_div.rounded-xl.bg-card]:border-pink-900!',
  'pink-80':   '[&_div.rounded-xl.bg-card]:bg-pink-50/80! [&_div.rounded-xl.bg-card]:border-pink-100! dark:[&_div.rounded-xl.bg-card]:bg-pink-950/80! dark:[&_div.rounded-xl.bg-card]:border-pink-900!',
  // ── warm / amber family ──────────────────────────────────────────────────
  'amber-25':  '[&_div.rounded-xl.bg-card]:bg-amber-50/25! [&_div.rounded-xl.bg-card]:border-amber-100! dark:[&_div.rounded-xl.bg-card]:bg-amber-950/25! dark:[&_div.rounded-xl.bg-card]:border-amber-900!',
  'amber-40':  '[&_div.rounded-xl.bg-card]:bg-amber-50/40! [&_div.rounded-xl.bg-card]:border-amber-100! dark:[&_div.rounded-xl.bg-card]:bg-amber-950/40! dark:[&_div.rounded-xl.bg-card]:border-amber-900!',
  'amber-60':  '[&_div.rounded-xl.bg-card]:bg-amber-50/60! [&_div.rounded-xl.bg-card]:border-amber-100! dark:[&_div.rounded-xl.bg-card]:bg-amber-950/60! dark:[&_div.rounded-xl.bg-card]:border-amber-900!',
  'amber-80':  '[&_div.rounded-xl.bg-card]:bg-amber-50/80! [&_div.rounded-xl.bg-card]:border-amber-100! dark:[&_div.rounded-xl.bg-card]:bg-amber-950/80! dark:[&_div.rounded-xl.bg-card]:border-amber-900!',
  // ── white glass (same in both themes) ────────────────────────────────────
  'white-10': '[&_div.rounded-xl.bg-card]:bg-white/10! [&_div.rounded-xl.bg-card]:border-white/20! [&_div.rounded-xl.bg-card]:backdrop-blur-md!',
  'white-20': '[&_div.rounded-xl.bg-card]:bg-white/20! [&_div.rounded-xl.bg-card]:border-white/30! [&_div.rounded-xl.bg-card]:backdrop-blur-md!',
  'white-40': '[&_div.rounded-xl.bg-card]:bg-white/40! [&_div.rounded-xl.bg-card]:border-white/40! [&_div.rounded-xl.bg-card]:backdrop-blur-lg!',
  'white-60': '[&_div.rounded-xl.bg-card]:bg-white/60! [&_div.rounded-xl.bg-card]:border-white/50! [&_div.rounded-xl.bg-card]:backdrop-blur-xl!',
  // ── silver (neutral) ─────────────────────────────────────────────────────
  'neutral-25': '[&_div.rounded-xl.bg-card]:bg-neutral-50/25! [&_div.rounded-xl.bg-card]:border-neutral-100! dark:[&_div.rounded-xl.bg-card]:bg-neutral-950/25! dark:[&_div.rounded-xl.bg-card]:border-neutral-900!',
  'neutral-40': '[&_div.rounded-xl.bg-card]:bg-neutral-50/40! [&_div.rounded-xl.bg-card]:border-neutral-100! dark:[&_div.rounded-xl.bg-card]:bg-neutral-950/40! dark:[&_div.rounded-xl.bg-card]:border-neutral-900!',
  'neutral-60': '[&_div.rounded-xl.bg-card]:bg-neutral-50/60! [&_div.rounded-xl.bg-card]:border-neutral-100! dark:[&_div.rounded-xl.bg-card]:bg-neutral-950/60! dark:[&_div.rounded-xl.bg-card]:border-neutral-900!',
  'neutral-80': '[&_div.rounded-xl.bg-card]:bg-neutral-50/80! [&_div.rounded-xl.bg-card]:border-neutral-100! dark:[&_div.rounded-xl.bg-card]:bg-neutral-950/80! dark:[&_div.rounded-xl.bg-card]:border-neutral-900!',
  // ── neutrals ─────────────────────────────────────────────────────────────
  'slate-25':  '[&_div.rounded-xl.bg-card]:bg-slate-50/25! [&_div.rounded-xl.bg-card]:border-slate-100! dark:[&_div.rounded-xl.bg-card]:bg-slate-950/25! dark:[&_div.rounded-xl.bg-card]:border-slate-900!',
  'slate-40':  '[&_div.rounded-xl.bg-card]:bg-slate-50/40! [&_div.rounded-xl.bg-card]:border-slate-100! dark:[&_div.rounded-xl.bg-card]:bg-slate-950/40! dark:[&_div.rounded-xl.bg-card]:border-slate-900!',
  'slate-60':  '[&_div.rounded-xl.bg-card]:bg-slate-50/60! [&_div.rounded-xl.bg-card]:border-slate-100! dark:[&_div.rounded-xl.bg-card]:bg-slate-950/60! dark:[&_div.rounded-xl.bg-card]:border-slate-900!',
  'slate-80':  '[&_div.rounded-xl.bg-card]:bg-slate-50/80! [&_div.rounded-xl.bg-card]:border-slate-100! dark:[&_div.rounded-xl.bg-card]:bg-slate-950/80! dark:[&_div.rounded-xl.bg-card]:border-slate-900!',
  'zinc-25':   '[&_div.rounded-xl.bg-card]:bg-zinc-50/25! [&_div.rounded-xl.bg-card]:border-zinc-100! dark:[&_div.rounded-xl.bg-card]:bg-zinc-950/25! dark:[&_div.rounded-xl.bg-card]:border-zinc-900!',
  'zinc-40':   '[&_div.rounded-xl.bg-card]:bg-zinc-50/40! [&_div.rounded-xl.bg-card]:border-zinc-100! dark:[&_div.rounded-xl.bg-card]:bg-zinc-950/40! dark:[&_div.rounded-xl.bg-card]:border-zinc-900!',
  'gray-25':   '[&_div.rounded-xl.bg-card]:bg-gray-50/25! [&_div.rounded-xl.bg-card]:border-gray-100! dark:[&_div.rounded-xl.bg-card]:bg-gray-950/25! dark:[&_div.rounded-xl.bg-card]:border-gray-900!',
  'gray-40':   '[&_div.rounded-xl.bg-card]:bg-gray-50/40! [&_div.rounded-xl.bg-card]:border-gray-100! dark:[&_div.rounded-xl.bg-card]:bg-gray-950/40! dark:[&_div.rounded-xl.bg-card]:border-gray-900!',
} as const;

// ─────────────────────────────────────────────────────────────────────────────

interface CardGridProps {
  wrapper: string;   // descendant-selector tint classes
  hue: string;
  opacity: number;
}

function CardGrid({ wrapper, hue, opacity }: CardGridProps) {
  return (
    <div className={wrapper}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {NUMBERED_SAMPLES.map((n) => (
          <Card key={n}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {n}
                </span>
                <span>Sample card</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {hue}-50/{opacity} (light) · {hue}-950/{opacity} (dark)
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Palette definitions — pick which hues + opacities to surface on this page.
// ─────────────────────────────────────────────────────────────────────────────

interface PaletteEntry {
  hue: string;
  opacity: 25 | 40 | 60 | 80;
  wrapperKey: keyof typeof W;
}

const COOL_HUES   = ['sky', 'blue', 'cyan', 'indigo', 'teal'] as const;
const RED_HUES    = ['red', 'rose', 'pink'] as const;
const WARM_HUES   = ['amber'] as const;
const SILVER_HUES = ['neutral'] as const;
const NEUTRAL_HUES = ['slate', 'zinc', 'gray'] as const;
const OPACITIES   = [25, 40, 60, 80] as const;

function entries(hues: readonly string[], opacities: readonly number[] = OPACITIES): PaletteEntry[] {
  const out: PaletteEntry[] = [];
  for (const op of opacities) {
    for (const hue of hues) {
      const k = `${hue}-${op}` as keyof typeof W;
      if (W[k]) out.push({ hue, opacity: op as 25 | 40 | 60 | 80, wrapperKey: k });
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ColorPalettePage() {
  return (
    <Container>
      <div className="space-y-10 py-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Glass Card Backgrounds</h1>
          <p className="text-muted-foreground text-sm">
            Public design preview — not tied to any specific page. Each palette
            shows the same cards in <strong>light</strong> and <strong>dark</strong>{' '}
            theme side-by-side, regardless of your current site theme.
          </p>
        </div>

        {/* Cool palette — one frame per opacity, all cool hues inside */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold border-b pb-2">Cool spectrum (sky / blue / cyan / indigo / teal)</h2>
          {OPACITIES.map((op) => (
            <ThemeSplitFrame
              key={`cool-${op}`}
              title={`Cool — opacity ${op}`}
              description={`bg-{hue}-50/${op} (light) · bg-{hue}-950/${op} (dark)`}
            >
              <div className="grid grid-cols-1 gap-3">
                {entries(COOL_HUES, [op]).map((e) => (
                  <CardGrid key={`${e.hue}-${e.opacity}`} wrapper={W[e.wrapperKey]} hue={e.hue} opacity={e.opacity} />
                ))}
              </div>
            </ThemeSplitFrame>
          ))}
        </div>

        {/* Red family */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold border-b pb-2">Red family (red / rose / pink)</h2>
          {OPACITIES.map((op) => (
            <ThemeSplitFrame
              key={`red-${op}`}
              title={`Red family — opacity ${op}`}
              description={`bg-{hue}-50/${op} (light) · bg-{hue}-950/${op} (dark) — currently /person/access uses rose-25`}
            >
              <div className="grid grid-cols-1 gap-3">
                {entries(RED_HUES, [op]).map((e) => (
                  <CardGrid key={`${e.hue}-${e.opacity}`} wrapper={W[e.wrapperKey]} hue={e.hue} opacity={e.opacity} />
                ))}
              </div>
            </ThemeSplitFrame>
          ))}
        </div>

        {/* Warm — amber (filter / toolbar candidate) */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold border-b pb-2">Warm (amber) — filter / toolbar candidate</h2>
          {OPACITIES.map((op) => (
            <ThemeSplitFrame
              key={`warm-${op}`}
              title={`Amber — opacity ${op}`}
              description={`bg-amber-50/${op} (light) · bg-amber-950/${op} (dark)`}
            >
              <div className="grid grid-cols-1 gap-3">
                {entries(WARM_HUES, [op]).map((e) => (
                  <CardGrid key={`${e.hue}-${e.opacity}`} wrapper={W[e.wrapperKey]} hue={e.hue} opacity={e.opacity} />
                ))}
              </div>
            </ThemeSplitFrame>
          ))}
        </div>

        {/* White Glass — frosted, identical for light and dark */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold border-b pb-2">White Glass — frosted (same classes in light & dark)</h2>
          <p className="text-xs text-muted-foreground">
            Uses <code>bg-white/{'{op}'}</code> + <code>backdrop-blur</code> + <code>border-white/{'{op}'}</code>.
            Needs a textured/colored backdrop to look glassy — the panes below have a gradient backdrop so you can see the effect.
          </p>
          {([10, 20, 40, 60] as const).map((op) => {
            const wrapperKey = `white-${op}` as keyof typeof W;
            return (
              <section key={`white-${op}`} className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">White glass — opacity {op}</h3>
                  <p className="text-xs text-muted-foreground">
                    bg-white/{op} · backdrop-blur · border-white/{op === 10 ? 20 : op === 20 ? 30 : op === 40 ? 40 : 50}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Light pane on a tinted gradient so the glass is visible */}
                  <div className="light bg-gradient-to-br from-sky-200 via-indigo-200 to-rose-200 text-gray-900 p-4 rounded-lg border border-gray-200">
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-700 mb-3">
                      Light (over gradient)
                    </div>
                    <CardGrid wrapper={W[wrapperKey]} hue="white" opacity={op} />
                  </div>
                  {/* Dark pane on a dark gradient — true "white glass in dark area" */}
                  <div className="dark bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-gray-100 p-4 rounded-lg border border-gray-800">
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-3">
                      Dark (over gradient)
                    </div>
                    <CardGrid wrapper={W[wrapperKey]} hue="white" opacity={op} />
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Silver (neutral) — filter / toolbar candidate */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold border-b pb-2">Silver (neutral) — filter / toolbar candidate</h2>
          {OPACITIES.map((op) => (
            <ThemeSplitFrame
              key={`silver-${op}`}
              title={`Silver (neutral) — opacity ${op}`}
              description={`bg-neutral-50/${op} (light) · bg-neutral-950/${op} (dark)`}
            >
              <div className="grid grid-cols-1 gap-3">
                {entries(SILVER_HUES, [op]).map((e) => (
                  <CardGrid key={`${e.hue}-${e.opacity}`} wrapper={W[e.wrapperKey]} hue={e.hue} opacity={e.opacity} />
                ))}
              </div>
            </ThemeSplitFrame>
          ))}
        </div>

        {/* Neutrals */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold border-b pb-2">Neutrals (slate / zinc / gray)</h2>
          {[25, 40].map((op) => (
            <ThemeSplitFrame
              key={`neutral-${op}`}
              title={`Neutrals — opacity ${op}`}
              description={`bg-{hue}-50/${op} (light) · bg-{hue}-950/${op} (dark)`}
            >
              <div className="grid grid-cols-1 gap-3">
                {entries(NEUTRAL_HUES, [op]).map((e) => (
                  <CardGrid key={`${e.hue}-${e.opacity}`} wrapper={W[e.wrapperKey]} hue={e.hue} opacity={e.opacity} />
                ))}
              </div>
            </ThemeSplitFrame>
          ))}
        </div>
      </div>
    </Container>
  );
}
