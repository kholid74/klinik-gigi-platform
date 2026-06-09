'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { sendContactMessage } from '@/lib/actions/contact'
import { SITE_CONTACT } from '@/lib/site'

const schema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, 'Nomor telepon tidak valid'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  subject: z.string().min(3, 'Subjek minimal 3 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await sendContactMessage({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        subject: data.subject,
        message: data.message,
      })
      if (result.error) {
        setStatus('error')
      } else {
        setStatus('success')
        reset()
      }
    })
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="text-green-500" size={32} />
        </div>
        <div>
          <h3 className="font-display text-xl text-[var(--color-foreground)] mb-2">Pesan Terkirim!</h3>
          <p className="text-sm text-[var(--color-muted)]">Tim kami akan menghubungi Anda dalam 1×24 jam di hari kerja.</p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-2.5 bg-[var(--color-brand-primary)] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
        >
          Kirim Pesan Lain
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
      <h2 className="font-display text-xl text-[var(--color-foreground)]">Kirim Pesan</h2>
      <p className="text-xs leading-relaxed text-[var(--color-muted)] -mt-3">
        Untuk booking lebih cepat, gunakan tombol <strong>Buat Janji</strong>. {SITE_CONTACT.responseTime}
      </p>

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-sm text-red-600">
          <AlertCircle size={14} />
          Gagal mengirim pesan. Silakan coba lagi.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
            Nama Lengkap <span className="text-[var(--color-brand-cta)]">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="Nama Anda"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[var(--color-surface)] ${
              errors.name
                ? 'border-red-400 focus:border-red-500'
                : 'border-[var(--color-border)] focus:border-[var(--color-brand-primary)]'
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
            Nomor WhatsApp <span className="text-[var(--color-brand-cta)]">*</span>
          </label>
          <input
            {...register('phone')}
            placeholder="08xx-xxxx-xxxx"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[var(--color-surface)] ${
              errors.phone
                ? 'border-red-400 focus:border-red-500'
                : 'border-[var(--color-border)] focus:border-[var(--color-brand-primary)]'
            }`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
          Email <span className="text-[var(--color-subtle)]">(opsional)</span>
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="email@contoh.com"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[var(--color-surface)] ${
            errors.email
              ? 'border-red-400 focus:border-red-500'
              : 'border-[var(--color-border)] focus:border-[var(--color-brand-primary)]'
          }`}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
          Subjek <span className="text-[var(--color-brand-cta)]">*</span>
        </label>
        <input
          {...register('subject')}
          placeholder="Topik yang ingin ditanyakan"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[var(--color-surface)] ${
            errors.subject
              ? 'border-red-400 focus:border-red-500'
              : 'border-[var(--color-border)] focus:border-[var(--color-brand-primary)]'
          }`}
        />
        {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
          Pesan <span className="text-[var(--color-brand-cta)]">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Tuliskan pertanyaan atau keluhan Anda di sini..."
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[var(--color-surface)] resize-none ${
            errors.message
              ? 'border-red-400 focus:border-red-500'
              : 'border-[var(--color-border)] focus:border-[var(--color-brand-primary)]'
          }`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {isPending ? (
          <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Mengirim...</>
        ) : (
          <><Send size={14} />Kirim Pesan</>
        )}
      </button>
    </form>
  )
}
