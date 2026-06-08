'use client'

import { useState } from 'react'

interface InsuranceLogo {
  domain: string
  name: string
  type?: string
}

const COLORS = ['#0D7377', '#14BDAC', '#E8553E', '#3182CE', '#805AD5', '#D69E2E', '#38A169', '#E53E3E']

function FaviconOrInitial({ domain, name, size = 20 }: { domain: string; name: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  const initial = name[0]?.toUpperCase() ?? '?'
  const color = COLORS[name.charCodeAt(0) % COLORS.length]

  if (failed) {
    return (
      <span
        className="flex items-center justify-center rounded font-bold text-white shrink-0"
        style={{ width: size, height: size, background: color, fontSize: size * 0.55 }}
      >
        {initial}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
      alt={name}
      width={size}
      height={size}
      className="object-contain rounded shrink-0"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export function InsuranceChips({ logos, showType = false }: { logos: InsuranceLogo[]; showType?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {logos.map((ins) => (
        <div
          key={ins.domain}
          className={`flex items-center gap-3 bg-white border border-[var(--color-border)] hover:border-[var(--color-brand-secondary)] hover:shadow-sm transition-all ${showType ? 'rounded-xl px-4 py-3' : 'rounded-full px-3 py-1.5'}`}
        >
          <FaviconOrInitial domain={ins.domain} name={ins.name} size={showType ? 24 : 20} />
          {showType ? (
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)] whitespace-nowrap">{ins.name}</p>
              <p className="text-[10px] text-[var(--color-muted)]">{ins.type}</p>
            </div>
          ) : (
            <span className="text-xs font-semibold text-[var(--color-foreground)]">{ins.name}</span>
          )}
        </div>
      ))}
    </div>
  )
}
