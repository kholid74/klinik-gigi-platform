import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { ContactForm } from '@/components/kontak/ContactForm'
import { InsuranceChips } from '@/components/kontak/InsuranceChips'
import { SITE_CONTACT, SITE_SCHEDULE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kontak Kami',
  description: 'Hubungi Klinik Gigi Senyum Sehat. Kami siap membantu pertanyaan Anda seputar layanan dan perjanjian.',
}

const INSURANCE_LOGOS = [
  { domain: 'bpjs-kesehatan.go.id', name: 'BPJS Kesehatan' },
  { domain: 'prudential.com', name: 'Prudential' },
  { domain: 'axa.com', name: 'AXA' },
  { domain: 'allianz.com', name: 'Allianz' },
  { domain: 'manulife.com', name: 'Manulife' },
  { domain: 'sunlife.com', name: 'Sun Life' },
  { domain: 'brilife.co.id', name: 'BRI Life' },
  { domain: 'cigna.com', name: 'Cigna' },
]

export default function KontakPage() {
  return (
    <>
      <PageHero
        title="Hubungi Kami"
        subtitle="Ada pertanyaan atau ingin membuat janji? Tim kami siap membantu Anda."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Kontak', href: '/kontak' }]}
      />

      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_480px] gap-8 items-start">
            {/* Left: info + insurance */}
            <div className="space-y-6">
              {/* Contact info cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <MapPin size={20} className="text-[var(--color-brand-primary)]" />,
                    label: 'Alamat',
                    value: SITE_CONTACT.address,
                    link: SITE_CONTACT.mapsHref,
                  },
                  {
                    icon: <Phone size={20} className="text-[var(--color-brand-primary)]" />,
                    label: 'WhatsApp',
                    value: SITE_CONTACT.whatsappDisplay,
                    link: SITE_CONTACT.whatsappHref,
                  },
                  {
                    icon: <Mail size={20} className="text-[var(--color-brand-primary)]" />,
                    label: 'Email',
                    value: SITE_CONTACT.email,
                    link: `mailto:${SITE_CONTACT.email}`,
                  },
                  {
                    icon: <Clock size={20} className="text-[var(--color-brand-primary)]" />,
                    label: 'Jam Buka',
                    value: SITE_CONTACT.hoursShort,
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-light)] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[var(--color-subtle)] mb-1">{item.label}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[var(--color-foreground)] hover:text-[var(--color-brand-primary)] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[var(--color-foreground)]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Schedule table */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display text-lg text-[var(--color-foreground)] mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-[var(--color-brand-primary)]" />
                  Jadwal Operasional
                </h3>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {SITE_SCHEDULE.map((row) => (
                      <tr key={row.day}>
                        <td className="py-3 text-[var(--color-muted)] pr-4">{row.day}</td>
                        <td className={`py-3 font-semibold text-right ${row.time === 'Tutup' ? 'text-red-500' : 'text-[var(--color-foreground)]'}`}>
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Insurance */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display text-lg text-[var(--color-foreground)] mb-4">Asuransi yang Diterima</h3>
                <InsuranceChips logos={INSURANCE_LOGOS} />
                <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
                  Cakupan tergantung polis masing-masing. Konfirmasi ke admin sebelum kunjungan dan bawa kartu peserta/asuransi saat datang.
                </p>
              </div>

              {/* Map embed placeholder */}
              <div className="bg-[var(--color-brand-light)] rounded-2xl overflow-hidden h-56 flex items-center justify-center">
                <div className="text-center text-[var(--color-muted)]">
                  <MapPin size={32} className="mx-auto mb-2 text-[var(--color-brand-primary)]" />
                  <p className="text-sm font-semibold">{SITE_CONTACT.address}</p>
                  <a href={SITE_CONTACT.mapsHref} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[var(--color-brand-primary)] hover:underline">
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: contact form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
