import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  // Convert slug to readable name
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return {
    title: `${categoryName} | إبراهيم شكمان`,
    description: `تصفح جميع منتجات ${categoryName} من إبراهيم شكمان - قطع غيار وأكسسوارات الموتوسيكلات الأصلية بأفضل الأسعار`,
    keywords: `${categoryName}, قطع غيار موتوسيكلات, أكسسوارات موتوسيكلات, إبراهيم شكمان`,
    openGraph: {
      title: `${categoryName} | إبراهيم شكمان`,
      description: `تصفح جميع منتجات ${categoryName}`,
      type: 'website',
      locale: 'ar_EG',
    },
    alternates: {
      canonical: `https://ibrahimskman.com/category/${slug}`,
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
