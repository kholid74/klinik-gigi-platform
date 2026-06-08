'use client'

import { useState } from 'react'
import { Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Service, ServiceCategory } from '@/types'
import { TabBar } from '@/components/ui/TabBar'
import { Badge } from '@/components/ui/Badge'
import { ServiceSheet } from './ServiceSheet'
import { SERVICE_CATEGORIES } from '@/lib/utils'

function formatPrice(min: number | null, max: number | null): string {
  if (!min && !max) return 'Hubungi klinik'
  const fmt = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)
  if (min && max && min !== max) return `${fmt(min)} – ${fmt(max)}`
  return fmt(min ?? max ?? 0)
}

export function ServiceFilter({ services }: { services: Service[] }) {
  const [active, setActive] = useState<ServiceCategory | 'semua'>('semua')
  const [selected, setSelected] = useState<Service | null>(null)

  const filtered = active === 'semua' ? services : services.filter((s) => s.category === active)

  return (
    <>
      <TabBar tabs={SERVICE_CATEGORIES} active={active} onChange={setActive} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((svc) => (
          <div key={svc.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-light)] flex items-center justify-center text-[var(--color-brand-primary)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <Badge variant="muted" className="capitalize text-[10px]">{svc.category}</Badge>
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)] mb-2">{svc.name}</h3>
              <p className="text-sm text-[var(--color-muted)] line-clamp-2">{svc.short_desc}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] mt-auto">
              <div>
                <div className="text-xs text-[var(--color-subtle)] mb-0.5">Mulai dari</div>
                <div className="text-sm font-bold text-[var(--color-brand-primary)]">
                  {formatPrice(svc.price_min, svc.price_max)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {svc.duration_mins && (
                  <span className="flex items-center gap-1 text-xs text-[var(--color-subtle)]">
                    <Clock size={12} />{svc.duration_mins} mnt
                  </span>
                )}
                <button
                  onClick={() => setSelected(svc)}
                  className="flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-primary)] hover:gap-1.5 transition-all"
                >
                  Detail <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center text-[var(--color-muted)]">
            <div className="text-4xl mb-3">🦷</div>
            <p className="font-semibold">Belum ada layanan di kategori ini</p>
          </div>
        )}
      </div>

      <ServiceSheet service={selected} onClose={() => setSelected(null)} />
    </>
  )
}
