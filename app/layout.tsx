import React from "react"
import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Geist from 'geist' // Declare the Geist variable here

const _inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Z S Merchant & Co. | Strategic Compliance & Risk Management',
  description: 'Singapore-based consulting firm providing AI-powered compliance and risk management solutions through expert advisory and shared services. Strategic solutions for future-ready organizations.',
  keywords: ['compliance', 'risk management', 'internal audit', 'governance', 'consulting', 'Singapore', 'AI solutions', 'regulatory compliance'],
  authors: [{ name: 'Z S Merchant & Co.' }],
  
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: 'https://zsmerchant.co',
    title: 'Z S Merchant & Co. | Strategic Compliance & Risk Management',
    description: 'AI-powered compliance and risk management solutions through expert advisory and shared services.',
    siteName: 'Z S Merchant & Co.',
    images: [
      {
        url: '/apple-icon.png',
        width: 180,
        height: 180,
        alt: 'Z S Merchant & Co.',
      },
    ],
  },
  
  twitter: {
    card: 'summary',
    title: 'Z S Merchant & Co.',
    description: 'Strategic Compliance & Risk Management Solutions',
    images: ['/apple-icon.png'],
  },
  
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}