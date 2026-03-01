'use client'

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'إبراهيم شكمان',
    alternateName: 'Ibrahim Shkman',
    url: 'https://ibrahimskman.com',
    logo: 'https://ibrahimskman.com/logo.webp',
    description: 'متجر إبراهيم شكمان لقطع غيار وأكسسوارات الموتوسيكلات في مصر',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-XXX-XXX-XXXX',
      contactType: 'Customer Service',
      areaServed: 'EG',
      availableLanguage: ['ar', 'en'],
    },
    sameAs: [
      'https://www.facebook.com/ibrahimskman',
      'https://www.instagram.com/ibrahimskman',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: 'Cairo',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
