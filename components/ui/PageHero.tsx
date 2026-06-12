import Link from 'next/link'

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href: string }[]
  gradient?: string
  /** Decorative accent shape shown top-right: 'circle' | 'dots' | 'rings' | 'wave' */
  accent?: 'circle' | 'dots' | 'rings' | 'wave'
}

function AccentCircle() {
  return (
    <>
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
    </>
  )
}

function AccentDots() {
  return (
    <div className="absolute top-4 right-8 grid grid-cols-5 gap-2.5 pointer-events-none opacity-25">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
      ))}
    </div>
  )
}

function AccentRings() {
  return (
    <>
      <div className="absolute -bottom-12 -right-12 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute bottom-4 right-8 w-14 h-14 rounded-full border border-white/15 pointer-events-none" />
    </>
  )
}

function AccentWave() {
  return (
    <svg
      className="absolute bottom-0 right-0 w-64 h-32 pointer-events-none opacity-10"
      viewBox="0 0 256 128"
      fill="none"
      preserveAspectRatio="none"
    >
      <path d="M0 64 C64 0 128 128 256 64 L256 128 L0 128 Z" fill="white" />
    </svg>
  )
}

const ACCENT_MAP = {
  circle: AccentCircle,
  dots: AccentDots,
  rings: AccentRings,
  wave: AccentWave,
}

export function PageHero({ title, subtitle, breadcrumb, gradient, accent }: PageHeroProps) {
  const bg = gradient ?? 'linear-gradient(135deg, var(--color-brand-primary) 0%, #006064 100%)'
  const Accent = accent ? ACCENT_MAP[accent] : null

  return (
    <div className="relative py-14 md:py-20 text-white overflow-hidden" style={{ background: bg }}>
      {Accent && <Accent />}
      <div className="container relative z-10">
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
            {breadcrumb.map((item, i) => (
              <span key={item.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {i < breadcrumb.length - 1 ? (
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3">{title}</h1>
        {subtitle && <p className="text-white/80 text-base md:text-lg max-w-xl">{subtitle}</p>}
      </div>
    </div>
  )
}
