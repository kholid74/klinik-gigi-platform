'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, Award, Calendar } from 'lucide-react'
import type { Doctor } from '@/types'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { Badge } from '@/components/ui/Badge'

const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export function DoctorSheet({
  doctor,
  onClose,
}: {
  doctor: Doctor | null
  onClose: () => void
}) {
  if (!doctor) return null

  return (
    <BottomSheet open={!!doctor} onClose={onClose}>
      {/* Avatar + Name */}
      <div className="flex gap-4 items-center mb-6">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[var(--color-brand-light)] shrink-0 relative">
          {doctor.photo_url ? (
            <Image src={doctor.photo_url} alt={doctor.name} fill sizes="80px" className="object-cover object-top" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-3xl text-[var(--color-brand-primary)]/30">
              {doctor.name.split(' ').at(-1)?.[0]}
            </div>
          )}
        </div>
        <div>
          <Badge variant="default" className="mb-1">{doctor.specialty}</Badge>
          <h3 className="font-semibold text-[var(--color-foreground)] text-lg">{doctor.name}</h3>
        </div>
      </div>

      {/* Bio */}
      {doctor.bio && (
        <div className="mb-5">
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">{doctor.bio}</p>
        </div>
      )}

      {/* Education */}
      {doctor.education.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
            <GraduationCap size={14} />
            Pendidikan
          </div>
          <ul className="space-y-2">
            {doctor.education.map((edu) => (
              <li key={edu} className="text-sm text-[var(--color-muted)] flex items-start gap-2">
                <span className="text-[var(--color-brand-secondary)] mt-1">•</span>
                {edu}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications */}
      {doctor.certifications.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
            <Award size={14} />
            Sertifikasi & Keanggotaan
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.certifications.map((cert) => (
              <Badge key={cert} variant="outline">{cert}</Badge>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/booking"
        onClick={onClose}
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--color-brand-primary)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
      >
        <Calendar size={16} />
        Buat Janji dengan {doctor.name.split(' ')[1]}
      </Link>
    </BottomSheet>
  )
}
