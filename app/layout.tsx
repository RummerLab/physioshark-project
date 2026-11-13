import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteMetadata } from './metadata'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.organization.name}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.organization.name,
    images: [
      {
        url: '/images/hero-blacktip-reef-shark-moorea-research.jpg',
        width: 1200,
        height: 630,
        alt: 'Physioshark Project - Shark Conservation Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ['/images/hero-blacktip-reef-shark-moorea-research.jpg'],
    creator: '@physioshark',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ResearchProject',
    name: siteMetadata.organization.name,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    logo: siteMetadata.organization.logo,
    founder: {
      '@type': 'Person',
      name: siteMetadata.author,
      jobTitle: 'Chief Investigator',
      url: 'https://jodierummer.com',
    },
    funder: [
      {
        '@type': 'Organization',
        name: 'Save Our Seas Foundation',
        url: 'https://saveourseas.com',
      },
      {
        '@type': 'Organization',
        name: 'Australian Research Council',
        url: 'https://www.arc.gov.au',
      },
    ],
    knowsAbout: [
      'Shark Physiology',
      'Marine Conservation',
      'Climate Change Effects on Marine Life',
      'Shark Behavior',
      'Marine Biology',
    ],
    location: {
      '@type': 'Place',
      name: 'Moorea, French Polynesia',
    },
    sameAs: [
      siteMetadata.socialLinks.twitter,
      siteMetadata.socialLinks.instagram,
      siteMetadata.socialLinks.youtube,
    ],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="author" href="/humans.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
