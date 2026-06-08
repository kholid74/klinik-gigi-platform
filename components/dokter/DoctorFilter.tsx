'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Doctor } from '@/types'
import { TabBar } from '@/components/ui/TabBar'
import { Badge } from '@/components/ui/Badge'
import { DoctorSheet } from './DoctorSheet'

const SPECIALTIES = [
  { value: 'semua', label: 'Semua' },
  { value: 'Gigi Umum', label: 'Umum' },
  { value: 'Konservasi Gigi', label: 'Konservasi' },
  { value: 'Ortodonti', label: 'Ortodonti' },
  { value: 'Bedah Mulut', label: 'Bedah Mulut' },
  { value: 'Kedokteran Gigi Anak', label: 'Gigi Anak' },
  { value: 'Periodonti', label: 'Periodonti' },
]

export function DoctorFilter({ doctors }: { doctors: Doctor[] }) {
  const [active, setActive] = useState('semua')
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const filtered = active === 'semua' ? doctors : doctors.filter((d) => d.specialty === active)

  return (
    <>
      <TabBar tabs={SPECIALTIES} active={active} onChange={setActive} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-60 bg-[var(--color-brand-light)] relative overflow-hidden">
              {doc.photo_url ? (
                <Image src={doc.photo_url} alt={doc.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl text-[var(--color-brand-primary)]/20">
                    {doc.name.split(' ').at(-1)?.[0]}
                  </span>
                </div>
              )}
              {/* availability badge */}
              <div className="absolute bottom-3 left-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold bg-white/90 text-[var(--color-brand-primary)] px-3 py-1.5 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Buka hari ini
                </span>
              </div>
            </div>

            <div className="p-5">
              <Badge variant="default" className="mb-2">{doc.specialty}</Badge>
              <h3 className="font-semibold text-[var(--color-foreground)] mb-3">{doc.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="flex-1 flex items-center justify-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] border border-[var(--color-border)] rounded-xl py-2 hover:bg-[var(--color-brand-light)] transition-colors"
                >
                  Lihat Profil <ChevronRight size={14} />
                </button>
                <Link
                  href="/booking"
                  className="flex items-center gap-1 px-3 py-2 bg-[var(--color-brand-primary)] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Calendar size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center text-[var(--color-muted)]">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold mb-1">Tidak ada dokter ditemukan</p>
            <p className="text-sm">Coba filter spesialisasi lain</p>
          </div>
        )}
      </div>

      <DoctorSheet doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </>
  )
}
