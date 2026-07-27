// JSON-LD Structured Data for SEO
// This tells Google exactly who Steven Girsang is,
// linking this website to all name variants/aliases

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Steven Immanuel C. Girsang',
    alternateName: [
      'Steven Girsang',
      'Steven Immanuel',
      'Steven Immanuel Christiano Girsang',
      'Steven Immanuel C Girsang',
      'Steven I C G',
      'Steven Christiano',
      'StevenChrist',
      'StevChrist',
      'StevChris',
    ],
    url: 'https://stevchrist.site',
    image: 'https://stevchrist.site/image/og-image.png',
    jobTitle: 'Data Scientist',
    description:
      'Steven Immanuel C. Girsang is a Data Scientist and fresh graduate from Telkom University Bandung, specializing in Machine Learning, Data Analysis, and Web Development.',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Telkom University',
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
      'Python',
      'Web Development',
      'Graphic Design',
      'Video Editing',
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
