import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harsh Raj | Software Engineer',
  description: 'Professional portfolio of Harsh Raj, a software engineer with expertise in building innovative solutions.',
  generator: 'Next.js',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
