import type { Metadata } from 'next'
import { AlertCircle } from 'lucide-react'
import { signIn } from '@/lib/actions/auth'

export const metadata: Metadata = { title: 'Login Admin — Senyum Sehat' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8] px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-primary)] flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🦷</span>
            </div>
            <h1 className="font-display text-2xl text-[var(--color-brand-primary)]">Senyum Sehat</h1>
            <p className="text-xs text-[var(--color-subtle)] mt-1">Admin Panel — Masuk untuk melanjutkan</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 bg-red-50 rounded-xl text-sm text-red-600">
              <AlertCircle size={14} className="shrink-0" />
              Email atau password salah.
            </div>
          )}

          <form action={signIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@klinik.id"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm outline-none focus:border-[var(--color-brand-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm outline-none focus:border-[var(--color-brand-primary)] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm mt-2"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[var(--color-subtle)] mt-4">
          Akses terbatas untuk admin klinik.
        </p>
      </div>
    </div>
  )
}
