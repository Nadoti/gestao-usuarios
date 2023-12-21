
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='w-full min-h-screen flex flex-col bg-gray-100'>
          <DashboardHeader />
          <div className='h-full flex flex-grow'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
