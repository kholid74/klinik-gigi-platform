import type { ArticleCategory, ServiceCategory, PromoStatus } from '@/types'

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Category constants ───────────────────────────────────────────────────────

export const ARTICLE_CATEGORIES: { value: ArticleCategory | 'semua'; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'perawatan', label: 'Perawatan' },
  { value: 'anak', label: 'Gigi Anak' },
  { value: 'estetik', label: 'Estetik' },
  { value: 'nutrisi', label: 'Nutrisi' },
  { value: 'tips', label: 'Tips' },
]

export const SERVICE_CATEGORIES: { value: ServiceCategory | 'semua'; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'preventif', label: 'Preventif' },
  { value: 'restoratif', label: 'Restoratif' },
  { value: 'ortodonti', label: 'Ortodonti' },
  { value: 'bedah', label: 'Bedah' },
  { value: 'estetik', label: 'Estetik' },
  { value: 'anak', label: 'Gigi Anak' },
  { value: 'darurat', label: 'Darurat' },
]

export const PROMO_TABS: { value: PromoStatus | 'semua'; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'aktif', label: 'Aktif' },
  { value: 'member', label: 'Member' },
  { value: 'berakhir', label: 'Berakhir' },
]
