'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import OptimizedImage from '@/components/ui/OptimizedImage'
import Link from 'next/link'
import { wooCommerceAPI } from '@/lib/api/woocommerce'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

// Mock reviews data - in real app, this would come from an API
const mockReviews = [
  {
    id: 1,
    customer_name: 'أحمد محمد',
    rating: 5,
    comment: 'خدمة ممتازة ومنتجات عالية الجودة. سرعة في التوصيل وأسعار منافسة. أنصح بالتعامل مع هذا المتجر.',
    date: '2024-01-15',
    verified_purchase: true,
    product_name: 'قطعة غيار محرك'
  },
  {
    id: 2,
    customer_name: 'سارة أحمد',
    rating: 4,
    comment: 'تعامل راقي وخدمة عملاء ممتازة. المنتجات أصلية ومطابقة للوصف.',
    date: '2024-01-10',
    verified_purchase: true,
    product_name: 'كفرات ممتازة'
  },
  {
    id: 3,
    customer_name: 'محمد علي',
    rating: 5,
    comment: 'أفضل متجر تعاملت معه. المنتجات أصلية والأسعار معقولة. التوصيل سريع وآمن.',
    date: '2024-01-08',
    verified_purchase: true,
    product_name: 'بطارية السيارة'
  },
  {
    id: 4,
    customer_name: 'فاطمة حسن',
    rating: 4,
    comment: 'تجربة شراء ممتازة. المنتجات بجودة عالية وخدمة عملاء متجاوبة.',
    date: '2024-01-05',
    verified_purchase: false,
    product_name: null
  },
  {
    id: 5,
    customer_name: 'عمر إبراهيم',
    rating: 5,
    comment: 'متجر موثوق ومنتجات أصلية. أنصح الجميع بالتعامل معه. التوصيل سريع والتعامل راقي.',
    date: '2024-01-02',
    verified_purchase: true,
    product_name: 'زيت المحرك'
  }
]

const reviewStats = {
  total_reviews: 127,
  average_rating: 4.6,
  ratings_breakdown: {
    5: 78,
    4: 32,
    3: 12,
    2: 3,
    1: 2
  }
}

interface EnhancedStoreData {
  id: number
  name: string
  logo: string
  banner?: string
}

export default function ReviewsPage() {
  const VENDOR_ID = process.env.NEXT_PUBLIC_VENDOR_ID || '22'
  const [storeData, setStoreData] = useState<EnhancedStoreData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating_high' | 'rating_low'>('newest')

  useEffect(() => {
    const loadStoreData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await wooCommerceAPI.getEnhancedStore(VENDOR_ID)
        setStoreData(data)
      } catch (error: any) {
        console.error('Error loading store data:', error)
        setError(error.message || 'فشل تحميل بيانات المتجر')
      } finally {
        setLoading(false)
      }
    }

    loadStoreData()
  }, [VENDOR_ID])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="bg-white rounded-3xl p-8 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl p-6 space-y-3">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !storeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-3xl shadow-2xl border border-red-200/50 p-12 max-w-md mx-4"
        >
          <div className="text-8xl mb-6">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            عذراً، حدث خطأ
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'لا يمكن تحميل بيانات المتجر'}
          </p>
          <Link
            href="/"
            className="bg-gradient-to-r from-brand-500 to-purple-600 text-white px-8 py-3 rounded-xl inline-block"
          >
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    )
  }

  // Filter and sort reviews
  const filteredReviews = selectedRating 
    ? mockReviews.filter(review => review.rating === selectedRating)
    : mockReviews

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'rating_high':
        return b.rating - a.rating
      case 'rating_low':
        return a.rating - b.rating
      default:
        return 0
    }
  })

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizes = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-2xl'
    }
    
    return (
      <div className={`flex items-center gap-1 ${sizes[size]}`}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
          >
            ⭐
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Breadcrumbs */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs 
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'التقييمات والمراجعات', current: true }
            ]}
          />
        </div>
      </div>

      {/* Store Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg border-b"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200">
              <OptimizedImage
                src={storeData.logo}
                alt={storeData.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{storeData.name}</h1>
              <p className="text-gray-600">التقييمات والمراجعات من عملائنا</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden sticky top-32"
            >
              <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
                <h2 className="text-2xl font-bold">إحصائيات التقييمات</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Average Rating */}
                <div className="text-center pb-6 border-b border-gray-200">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {reviewStats.average_rating}
                  </div>
                  {renderStars(Math.round(reviewStats.average_rating), 'lg')}
                  <p className="text-gray-600 mt-3">
                    بناءً على {reviewStats.total_reviews} تقييم
                  </p>
                </div>

                {/* Ratings Breakdown */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-4">توزيع التقييمات</h3>
                  {Object.entries(reviewStats.ratings_breakdown)
                    .reverse()
                    .map(([rating, count]) => {
                      const percentage = (count / reviewStats.total_reviews) * 100
                      return (
                        <button
                          key={rating}
                          onClick={() => setSelectedRating(selectedRating === Number(rating) ? null : Number(rating))}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                            selectedRating === Number(rating)
                              ? 'bg-yellow-100 border-2 border-yellow-400'
                              : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-1 text-sm w-16">
                            <span>{rating}</span>
                            <span className="text-yellow-400">⭐</span>
                          </div>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="text-sm font-medium text-gray-700 w-12 text-left">
                            {count}
                          </div>
                        </button>
                      )
                    })}
                </div>

                {/* Clear Filter */}
                {selectedRating && (
                  <button
                    onClick={() => setSelectedRating(null)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors font-medium"
                  >
                    إظهار جميع التقييمات
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden"
            >
              {/* Controls */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedRating ? `تقييمات ${selectedRating} نجوم` : 'جميع التقييمات'}
                  <span className="text-gray-500 font-normal mr-2">
                    ({sortedReviews.length})
                  </span>
                </h2>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="newest">الأحدث</option>
                  <option value="oldest">الأقدم</option>
                  <option value="rating_high">الأعلى تقييماً</option>
                  <option value="rating_low">الأقل تقييماً</option>
                </select>
              </div>

              {/* Reviews */}
              <div className="p-6 space-y-6">
                {sortedReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      لا توجد تقييمات
                    </h3>
                    <p className="text-gray-600">
                      {selectedRating 
                        ? `لا توجد تقييمات بـ ${selectedRating} نجوم`
                        : 'لا توجد تقييمات لهذا المتجر بعد'}
                    </p>
                  </div>
                ) : (
                  sortedReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white"
                    >
                      <div className="flex gap-4 mb-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {review.customer_name.charAt(0)}
                        </div>
                        
                        {/* Header */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900">{review.customer_name}</h3>
                            {review.verified_purchase && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                ✓ شراء موثق
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {renderStars(review.rating, 'sm')}
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('ar-EG', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Product Name */}
                      {review.product_name && (
                        <div className="mb-3 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                          📦 {review.product_name}
                        </div>
                      )}

                      {/* Comment */}
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Quick Action */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Link
                href="/"
                className="block w-full bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 text-white text-center py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105 font-medium"
              >
                🛍️ تصفح منتجات المتجر
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
