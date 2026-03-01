import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'جميع المنتجات | إبراهيم شكمان',
  description: 'تصفح جميع قطع غيار وأكسسوارات الموتوسيكلات من إبراهيم شكمان - بنيلي، هوجان، فيجوري وجميع الماركات',
  keywords: 'قطع غيار موتوسيكلات, أكسسوارات موتوسيكلات, بنيلي, هوجان, فيجوري, إبراهيم شكمان',
  openGraph: {
    title: 'جميع المنتجات | إبراهيم شكمان',
    description: 'تصفح جميع قطع غيار وأكسسوارات الموتوسيكلات',
    type: 'website',
    locale: 'ar_EG',
  },
  alternates: {
    canonical: 'https://ibrahimskman.com/products',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
