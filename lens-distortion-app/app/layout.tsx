// app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Lens Distortion Simulator',
  description: 'A web application to demonstrate the effects of distortion parameters on lenses',
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