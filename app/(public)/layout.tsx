import { SiteNav } from '@/components/layout/SiteNav'
import { Footer } from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/home/AnnouncementBar'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
    </>
  )
}
