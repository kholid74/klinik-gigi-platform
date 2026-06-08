import Link from 'next/link'

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href: string }[]
  gradient?: string
}

export function PageHero({ title, subtitle, breadcrumb, gradient }: PageHeroProps) {
  const bg = gradient ?? 'linear-gradient(135deg, var(--color-brand-primary) 0%, #006064 100%)'

  return (
    <div className="py-14 md:py-20 text-white" style={{ background: bg }}>
      <div className="container">
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
