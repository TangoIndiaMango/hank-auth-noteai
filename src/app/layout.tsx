import { ClerkProvider } from '@clerk/nextjs'
import './global.css'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'NotesAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Provider>
          <body>{children}</body>
        </Provider>

      </html>
    </ClerkProvider>
  )
}