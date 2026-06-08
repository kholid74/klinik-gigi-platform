import { requireAdmin } from '@/lib/auth'
import { AdminShell } from '@/components/admin/AdminShell'
import { headers } from 'next/headers'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()

  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const pageTitle = resolveTitle(pathname)

  return (
    <AdminShell pageTitle={pageTitle} userEmail={user.email}>
      {children}
    </AdminShell>
  )
}

function resolveTitle(pathname: string): string {
  if (pathname === '/admin') return 'Dashboard'
  if (pathname.startsWith('/admin/dokter')) return 'Manajemen Dokter'
  if (pathname.startsWith('/admin/layanan')) return 'Manajemen Layanan'
  if (pathname.startsWith('/admin/promo')) return 'Manajemen Promo'
  if (pathname.startsWith('/admin/artikel')) return 'Manajemen Artikel'
  if (pathname.startsWith('/admin/booking')) return 'Manajemen Booking'
  if (pathname.startsWith('/admin/pesan')) return 'Pesan Kontak'
  return 'Admin Panel'
}
