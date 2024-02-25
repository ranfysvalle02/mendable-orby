import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1337',
  description: 'powered by Mendable',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
          <h1 style={{textAlign: 'center', fontFamily: 'Sixtyfour', fontSize: '3rem', background:'black', color:'white'}}>1337</h1>
        </div>
        {children}
        <Toaster />
        <script defer src='/lz-string.min.js' />
      </body>
    </html>
  )
}
