import { SiteNav } from '@/components/layout/SiteNav'
import { Footer } from '@/components/layout/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
