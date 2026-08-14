// JSON-LD Structured Data for SEO
// This tells Google exactly who Steven Girsang is,
// linking this website to all name variants/aliases and official social profiles

export default function JsonLd() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://stevchrist.site/#person',
    name: 'Steven Immanuel C. Girsang',
    givenName: 'Steven Immanuel Christiano',
    familyName: 'Girsang',
    alternateName: [
      'Steven Girsang',
      'Steven Immanuel',
      'Steven Immanuel C Girsang',
      'Steven Immanuel Christiano Girsang',
      'Steven I C G',
      'Steven Christiano',
      'StevenChrist',
      'StevChrist',
      'StevChris',
    ],
    url: 'https://stevchrist.site',
    image: 'https://stevchrist.site/image/og-image.png',
    jobTitle: 'Data Scientist & Data Engineer',
    description:
      'Official personal website and portfolio of Steven Immanuel C. Girsang (Steven Girsang) — Data Scientist and fresh graduate from Telkom University Bandung. Specializing in Machine Learning, Data Analysis, Data Engineering, and Web Development.',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Telkom University',
      sameAs: 'https://telkomuniversity.ac.id',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bandung',
        addressCountry: 'ID',
      },
    },
    knowsAbout: [
      'Data Science',
      'Machine Learning',
      'Data Analysis',
      'Data Engineering',
      'Python',
      'PostgreSQL',
      'Web Development',
    ],
    sameAs: [
      'https://www.linkedin.com/in/stevenchristiano',
      'https://github.com/StevChrist',
      'https://www.instagram.com/_stev.chris/',
      'https://x.com/_Stevchris',
      'https://www.tiktok.com/@stev.chris',
    ],
    nationality: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://stevchrist.site/#website',
    name: 'Steven Immanuel C. Girsang | Personal Website',
    alternateName: [
      'Steven Girsang Portfolio',
      'Steven Immanuel C Girsang Website',
      'StevChrist Portfolio',
    ],
    url: 'https://stevchrist.site',
    publisher: {
      '@type': 'Person',
      name: 'Steven Immanuel C. Girsang',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  )
}
