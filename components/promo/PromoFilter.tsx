'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import type { Promo, PromoStatus } from '@/types'
import { TabBar } from '@/components/ui/TabBar'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

const TABS: { value: PromoStatus | 'semua'; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'aktif', label: 'Aktif' },
  { value: 'member', label: 'Member' },
  { value: 'berakhir', label: 'Berakhir' },
]

function copyCode(code: string) {
  navigator.clipboard.writeText(code).catch(() => {})
}

export function PromoFilter({ promos }: { promos: Promo[] }) {
  const [active, setActive] = useState<PromoStatus | 'semua'>('semua')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = active === 'semua' ? promos : promos.filter((p) => p.status === active)
  const featured = filtered.find((p) => p.is_featured)
  const regular = filtered.filter((p) => !p.is_featured)

  function handleCopy(code: string) {
    copyCode(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      <TabBar tabs={TABS} active={active} onChange={setActive} />

      <div className="mt-8 space-y-5">
        {/* Featured promo */}
        {featured && (
          <div className={`rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row ${featured.status === 'berakhir' ? 'opacity-65 grayscale-[40%]' : ''}`}>
            {/* Image */}
            <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden bg-[var(--color-brand-light)]" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))' }}>
              {featured.image_url && (
                <Image src={featured.image_url} alt={featured.title} fill className="object-cover" />
              )}
            </div>
            {/* Body */}
            <div className="flex-1 bg-white p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="cta">⭐ Promo Unggulan</Badge>
                <Badge variant={featured.status === 'aktif' ? 'primary' : 'muted'}>
                  {featured.status === 'aktif' ? 'Aktif' : featured.status === 'member' ? 'Member Only' : 'Berakhir'}
                </Badge>
              </div>
              <h2 className="font-display text-2xl text-[var(--color-foreground)] mb-2">{featured.title}</h2>
              {featured.promo_price && (
                <div className="text-2xl font-bold text-[var(--color-brand-cta)] mb-1">
                  {formatPrice(featured.promo_price)}
                  {featured.original_price && (
                    <s className="text-base font-normal text-[var(--color-subtle)] ml-2">{formatPrice(featured.original_price)}</s>
                  )}
                </div>
              )}
              <p className="text-sm text-[var(--color-muted)] mb-4">{featured.description}</p>
              {featured.max_claims && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[var(--color-muted)] mb-1.5">
                    <span>Klaim tersisa</span>
                    <span className="font-bold text-[var(--color-brand-cta)]">{featured.current_claims}/{featured.max_claims}</span>
                  </div>
                  <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-brand-cta)] rounded-full" style={{ width: `${(featured.current_claims / featured.max_claims) * 100}%` }} />
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Link href="/booking" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-brand-primary)] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity">
                  Klaim Promo
                </Link>
                {featured.promo_code && (
                  <button
                    onClick={() => handleCopy(featured.promo_code!)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-semibold rounded-full hover:bg-[var(--color-brand-light)] transition-colors"
                  >
                    {copied === featured.promo_code ? <><CheckCircle2 size={14} className="text-green-500" /> Disalin!</> : <>{featured.promo_code} · Salin</>}
                  </button>
                )}
              </div>
              {featured.terms.length > 0 && (
                <div className="mt-4 bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]">
                  <p className="text-xs font-semibold text-[var(--color-muted)] mb-2">Syarat & Ketentuan</p>
                  <ul className="space-y-1">
                    {featured.terms.map((t) => (
                      <li key={t} className="text-xs text-[var(--color-muted)] flex items-start gap-2">
                        <span className="text-[var(--color-brand-primary)] mt-0.5">•</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Regular promos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regular.map((promo) => (
            <div key={promo.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${promo.status === 'berakhir' ? 'opacity-65 grayscale-[40%]' : ''}`}>
              {/* Image */}
              <div className="h-48 relative overflow-hidden bg-[var(--color-brand-light)]" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))' }}>
                {promo.image_url && <Image src={promo.image_url} alt={promo.title} fill className="object-cover" />}
                {/* Badges */}
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${promo.status === 'aktif' ? 'bg-[var(--color-brand-cta)]' : promo.status === 'member' ? 'bg-purple-600' : 'bg-gray-500'}`}>
                    {promo.end_date ? `Berakhir ${new Date(promo.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}` : 'Berakhir'}
                  </span>
                </div>
                {/* Discount badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${promo.status === 'berakhir' ? 'bg-gray-500' : 'bg-[var(--color-brand-cta)]'}`}>
                    {promo.discount_type === 'percentage' ? `${promo.discount_value}% OFF` : promo.discount_type === 'free' ? 'GRATIS' : `- ${formatPrice(promo.discount_value ?? 0)}`}
                  </span>
                </div>
              </div>
              {/* Body */}
              <div className="p-5">
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">{promo.title}</h3>
                <p className="text-xs text-[var(--color-muted)] line-clamp-2 mb-3">{promo.description}</p>
                {promo.max_claims && (
                  <div className="mb-3">
                    <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-brand-primary)] rounded-full" style={{ width: `${(promo.current_claims / promo.max_claims) * 100}%` }} />
                    </div>
                    <p className="text-xs text-[var(--color-subtle)] mt-1">{promo.current_claims}/{promo.max_claims} sudah diklaim</p>
                  </div>
                )}
                {promo.status !== 'berakhir' ? (
                  <Link href="/booking" className="block text-center text-sm font-semibold py-2.5 bg-[var(--color-brand-primary)] text-white rounded-xl hover:opacity-90 transition-opacity">
                    Klaim Sekarang
                  </Link>
                ) : (
                  <button disabled className="w-full text-center text-sm font-semibold py-2.5 bg-[var(--color-border)] text-[var(--color-subtle)] rounded-xl cursor-not-allowed">
                    Promo Berakhir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[var(--color-muted)]">
            <div className="text-4xl mb-3">🎁</div>
            <p className="font-semibold">Tidak ada promo di kategori ini</p>
            <p className="text-sm mt-1">Cek kembali nanti untuk penawaran terbaru</p>
          </div>
        )}
      </div>
    </>
  )
}
