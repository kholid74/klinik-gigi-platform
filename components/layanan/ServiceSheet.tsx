'use client'

import Link from 'next/link'
import { Clock, CheckCircle, Calendar } from 'lucide-react'
import type { Service } from '@/types'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { Badge } from '@/components/ui/Badge'

function formatPrice(min: number | null, max: number | null): string {
  if (!min && !max) return 'Hubungi klinik'
  const fmt = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)
  if (min && max && min !== max) return `${fmt(min)} – ${fmt(max)}`
  return fmt(min ?? max ?? 0)
}

export function ServiceSheet({ service, onClose }: { service: Service | null; onClose: () => void }) {
  if (!service) return null

  return (
    <BottomSheet open={!!service} onClose={onClose} title={service.name}>
      <div className="space-y-5">
        {/* Meta */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="capitalize">{service.category}</Badge>
          {service.duration_mins && (
            <Badge variant="muted">
              <Clock size={11} className="mr-1" />
              {service.duration_mins} menit
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]">
          <div className="text-xs text-[var(--color-subtle)] mb-1">Estimasi biaya</div>
          <div className="text-xl font-bold text-[var(--color-brand-primary)]">
            {formatPrice(service.price_min, service.price_max)}
          </div>
          <div className="text-xs text-[var(--color-subtle)] mt-1">*Biaya final sesuai kondisi dan kebutuhan pasien</div>
        </div>

        {/* Description */}
        {service.description && (
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">{service.description}</p>
        )}

        {/* Benefits */}
        {service.benefits.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-foreground)] mb-3">Keunggulan Layanan</h4>
            <ul className="space-y-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                  <CheckCircle size={15} className="text-[var(--color-brand-secondary)] shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href="/booking"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--color-brand-primary)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          <Calendar size={16} />
          Booking {service.name}
        </Link>
      </div>
    </BottomSheet>
  )
}
