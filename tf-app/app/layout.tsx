// app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'TF Simulator',
  description: 'A web application to demonstrate the relative frames of references',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}