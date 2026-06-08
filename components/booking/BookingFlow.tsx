'use client'

import { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronLeft, ChevronRight, Check, AlertCircle, Calendar, Clock, User } from 'lucide-react'
import type { Doctor, Service, TimeSlot } from '@/types'
import { useBookingStore } from '@/lib/stores/booking-store'
import { createBooking } from '@/lib/actions/booking'
import { formatPrice } from '@/lib/utils'

// ─── Step 1: Pilih Layanan ────────────────────────────────────────────────────

function StepService({ services }: { services: Service[] }) {
  const { selectedService, setService } = useBookingStore()

  return (
    <div>
      <h2 className="font-display text-xl text-[var(--color-foreground)] mb-1">Pilih Layanan</h2>
      <p className="text-sm text-[var(--color-muted)] mb-6">Layanan apa yang Anda butuhkan hari ini?</p>

      <div className="grid sm:grid-cols-2 gap-3">
        {services.map((svc) => (
          <button
            key={svc.id}
            onClick={() => setService(svc)}
            className={`text-left p-4 rounded-2xl border-2 transition-all hover:border-[var(--color-brand-primary)] hover:shadow-sm ${
              selectedService?.id === svc.id
                ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-light)]'
                : 'border-[var(--color-border)] bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-light)] flex items-center justify-center text-xl shrink-0">
                {svc.icon_name ?? '🦷'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--color-foreground)]">{svc.name}</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5 line-clamp-2">{svc.short_desc}</p>
                {svc.price_min && (
                  <p className="text-xs font-bold text-[var(--color-brand-primary)] mt-1">
                    {formatPrice(svc.price_min)}{svc.price_max && svc.price_max !== svc.price_min ? ` – ${formatPrice(svc.price_max)}` : ''}
                  </p>
                )}
              </div>
              {selectedService?.id === svc.id && (
                <Check size={16} className="text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step 2: Pilih Dokter ─────────────────────────────────────────────────────

function StepDoctor({ doctors }: { doctors: Doctor[] }) {
  const { selectedDoctor, setDoctor } = useBookingStore()

  return (
    <div>
      <h2 className="font-display text-xl text-[var(--color-foreground)] mb-1">Pilih Dokter</h2>
      <p className="text-sm text-[var(--color-muted)] mb-6">Pilih dokter yang akan menangani Anda.</p>

      <div className="space-y-3">
        {doctors.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setDoctor(doc)}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all hover:border-[var(--color-brand-primary)] hover:shadow-sm ${
              selectedDoctor?.id === doc.id
                ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-light)]'
                : 'border-[var(--color-border)] bg-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[var(--color-brand-light)] shrink-0 relative">
                {doc.photo_url ? (
                  <Image src={doc.photo_url} alt={doc.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">👨‍⚕️</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--color-foreground)]">{doc.name}</p>
                <p className="text-xs text-[var(--color-muted)]">{doc.specialty}</p>
              </div>
              {selectedDoctor?.id === doc.id && (
                <Check size={16} className="text-[var(--color-brand-primary)] shrink-0" />
              )}
            </div>
          </button>
        ))}

        {doctors.length === 0 && (
          <div className="py-10 text-center text-[var(--color-muted)]">
            <User size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">Belum ada dokter tersedia</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Step 3: Pilih Jadwal ─────────────────────────────────────────────────────

async function fetchSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
  const res = await fetch(`/api/slots?doctorId=${doctorId}&date=${date}`)
  if (!res.ok) return []
  return res.json()
}

function StepSchedule() {
  const { selectedDoctor, selectedDate, selectedTime, setSchedule } = useBookingStore()
  const [date, setDate] = useState(selectedDate ?? '')
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [pickedTime, setPickedTime] = useState<string | null>(selectedTime)

  const today = new Date().toISOString().slice(0, 10)
  const maxDate = new Date(Date.now() + 30 * 24 * 3600000).toISOString().slice(0, 10)

  useEffect(() => {
    if (!date || !selectedDoctor) return
    setLoading(true)
    fetchSlots(selectedDoctor.id, date)
      .then(setSlots)
      .finally(() => setLoading(false))
  }, [date, selectedDoctor])

  return (
    <div>
      <h2 className="font-display text-xl text-[var(--color-foreground)] mb-1">Pilih Jadwal</h2>
      <p className="text-sm text-[var(--color-muted)] mb-6">Tentukan tanggal dan waktu kunjungan Anda.</p>

      {/* Date picker */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-2 flex items-center gap-1.5">
          <Calendar size={12} /> Tanggal Kunjungan
        </label>
        <input
          type="date"
          min={today}
          max={maxDate}
          value={date}
          onChange={(e) => { setDate(e.target.value); setPickedTime(null) }}
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm focus:outline-none focus:border-[var(--color-brand-primary)]"
        />
      </div>

      {/* Time slots */}
      {date && (
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-3 flex items-center gap-1.5">
            <Clock size={12} /> Waktu Tersedia
          </label>
          {loading ? (
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-20 h-10 rounded-xl bg-[var(--color-border)] animate-pulse" />
              ))}
            </div>
          ) : slots.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)] py-4">Tidak ada slot tersedia di tanggal ini.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => {
                    setPickedTime(slot.time)
                    setSchedule(date, slot.time)
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    !slot.available
                      ? 'bg-[var(--color-border)] text-[var(--color-subtle)] cursor-not-allowed line-through'
                      : pickedTime === slot.time
                      ? 'bg-[var(--color-brand-primary)] text-white shadow-md'
                      : 'bg-white border border-[var(--color-border)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Step 4: Data Pasien ──────────────────────────────────────────────────────

const patientSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  phone: z.string().regex(/^(\+62|08)\d{8,11}$/, 'Format: 08xxxxxxxxxx'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  notes: z.string().max(500).optional(),
})

type PatientForm = z.infer<typeof patientSchema>

function StepPatient() {
  const { patientData, setPatientData } = useBookingStore()

  const { register, handleSubmit, formState: { errors } } = useForm<PatientForm>({
    resolver: zodResolver(patientSchema),
    defaultValues: patientData,
  })

  function onSubmit(data: PatientForm) {
    setPatientData({ name: data.name, phone: data.phone, email: data.email ?? '', notes: data.notes ?? '' })
  }

  return (
    <form id="patient-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-display text-xl text-[var(--color-foreground)] mb-1">Data Pasien</h2>
      <p className="text-sm text-[var(--color-muted)] mb-6">Isi data diri Anda untuk konfirmasi janji.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
            Nama Lengkap <span className="text-[var(--color-brand-cta)]">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="Nama sesuai identitas"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[var(--color-surface)] ${errors.name ? 'border-red-400' : 'border-[var(--color-border)] focus:border-[var(--color-brand-primary)]'}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
            Nomor WhatsApp <span className="text-[var(--color-brand-cta)]">*</span>
          </label>
          <input
            {...register('phone')}
            placeholder="08xxxxxxxxxx"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[var(--color-surface)] ${errors.phone ? 'border-red-400' : 'border-[var(--color-border)] focus:border-[var(--color-brand-primary)]'}`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
            Email <span className="text-[var(--color-subtle)]">(opsional)</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="email@contoh.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[var(--color-surface)] ${errors.email ? 'border-red-400' : 'border-[var(--color-border)] focus:border-[var(--color-brand-primary)]'}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
            Catatan Keluhan <span className="text-[var(--color-subtle)]">(opsional)</span>
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            placeholder="Ceritakan keluhan gigi Anda secara singkat..."
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] text-sm outline-none transition-colors bg-[var(--color-surface)] focus:border-[var(--color-brand-primary)] resize-none"
          />
        </div>
      </div>
    </form>
  )
}

// ─── Step 5: Konfirmasi ───────────────────────────────────────────────────────

function StepConfirm({ onError }: { onError: (msg: string) => void }) {
  const { selectedService, selectedDoctor, selectedDate, selectedTime, patientData } = useBookingStore()
  const [isPending, startTransition] = useTransition()

  function formatBookingDate(dateStr: string) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
  }

  function handleConfirm() {
    if (!selectedService || !selectedDoctor || !selectedDate || !selectedTime) return
    startTransition(async () => {
      const result = await createBooking({
        serviceId: selectedService.id,
        doctorId: selectedDoctor.id,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        patientName: patientData.name,
        patientPhone: patientData.phone,
        patientEmail: patientData.email || undefined,
        patientNotes: patientData.notes || undefined,
      })
      if (result?.error) onError(result.error)
    })
  }

  const rows = [
    { label: 'Layanan', value: selectedService?.name ?? '-' },
    { label: 'Dokter', value: selectedDoctor?.name ?? '-' },
    { label: 'Tanggal', value: selectedDate ? formatBookingDate(selectedDate) : '-' },
    { label: 'Waktu', value: selectedTime ? `${selectedTime} WIB` : '-' },
    { label: 'Nama Pasien', value: patientData.name || '-' },
    { label: 'WhatsApp', value: patientData.phone || '-' },
    ...(patientData.email ? [{ label: 'Email', value: patientData.email }] : []),
    ...(patientData.notes ? [{ label: 'Catatan', value: patientData.notes }] : []),
  ]

  return (
    <div>
      <h2 className="font-display text-xl text-[var(--color-foreground)] mb-1">Konfirmasi Janji</h2>
      <p className="text-sm text-[var(--color-muted)] mb-6">Periksa kembali data Anda sebelum mengirim.</p>

      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden mb-6">
        {rows.map((row, i) => (
          <div key={i} className={`flex gap-3 px-5 py-3 ${i < rows.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
            <span className="text-xs text-[var(--color-subtle)] w-28 shrink-0 pt-0.5">{row.label}</span>
            <span className="text-sm font-semibold text-[var(--color-foreground)]">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-brand-light)] border border-[var(--color-brand-primary)]/20 rounded-xl p-4 text-xs text-[var(--color-muted)] mb-6">
        Dengan mengirim form ini, Anda menyetujui bahwa data akan digunakan untuk konfirmasi janji temu. Tim kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal.
      </div>

      <button
        onClick={handleConfirm}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Memproses...</>
        ) : (
          <>Kirim Janji Temu<ChevronRight size={16} /></>
        )}
      </button>
    </div>
  )
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEP_LABELS = ['Layanan', 'Dokter', 'Jadwal', 'Data', 'Konfirmasi']

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEP_LABELS.map((label, i) => {
        const num = i + 1
        const done = step > num
        const active = step === num
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                done ? 'bg-[var(--color-brand-primary)] text-white' :
                active ? 'bg-[var(--color-brand-primary)] text-white ring-4 ring-[var(--color-brand-light)]' :
                'bg-[var(--color-border)] text-[var(--color-subtle)]'
              }`}>
                {done ? <Check size={14} /> : num}
              </div>
              <span className={`text-[10px] font-semibold hidden sm:block ${active ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-subtle)]'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 rounded ${step > num ? 'bg-[var(--color-brand-primary)]' : 'bg-[var(--color-border)]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main BookingFlow ─────────────────────────────────────────────────────────

export function BookingFlow({ services, doctors }: { services: Service[]; doctors: Doctor[] }) {
  const { step, setStep, selectedService, selectedDoctor, selectedDate, selectedTime, patientData } = useBookingStore()
  const [error, setError] = useState<string | null>(null)

  function canGoNext(): boolean {
    if (step === 1) return !!selectedService
    if (step === 2) return !!selectedDoctor
    if (step === 3) return !!selectedDate && !!selectedTime
    if (step === 4) return !!patientData.name && !!patientData.phone
    return false
  }

  function handleNext() {
    if (step === 4) {
      const form = document.getElementById('patient-form') as HTMLFormElement | null
      if (form) { form.requestSubmit(); return }
    }
    if (canGoNext()) setStep(step + 1)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator step={step} />

      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 min-h-[400px]">
        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 rounded-xl text-sm text-red-600">
            <AlertCircle size={14} className="shrink-0" />
            {error}
          </div>
        )}

        {step === 1 && <StepService services={services} />}
        {step === 2 && <StepDoctor doctors={doctors} />}
        {step === 3 && <StepSchedule />}
        {step === 4 && <StepPatient />}
        {step === 5 && <StepConfirm onError={setError} />}
      </div>

      {step < 5 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-foreground)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            Kembali
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext() && step !== 4}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[var(--color-brand-primary)] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 4 ? 'Lanjut ke Konfirmasi' : 'Lanjutkan'}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
