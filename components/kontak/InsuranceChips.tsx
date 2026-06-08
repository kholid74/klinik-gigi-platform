'use client'

interface InsuranceLogo {
  domain: string
  name: string
}

export function InsuranceChips({ logos }: { logos: InsuranceLogo[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {logos.map((ins) => (
        <div key={ins.domain} className="flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-3 py-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://www.google.com/s2/favicons?domain=${ins.domain}&sz=32`}
            alt={ins.name}
            width={20}
            height={20}
            className="object-contain rounded-sm"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="text-xs font-semibold text-[var(--color-foreground)]">{ins.name}</span>
        </div>
      ))}
    </div>
  )
}
