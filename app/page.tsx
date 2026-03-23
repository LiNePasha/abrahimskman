'use client'

import Link from "next/link";
import CategoriesShowcase from "@/components/categories/CategoriesShowcase";
import FeaturedCategoryProducts from "@/components/home/FeaturedCategoryProducts";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import StoreCategoriesSticky from "@/components/stores/StoreCategoriesSticky";
import { useVendorCategoriesStore } from "@/store/vendorCategoriesStore";

// Vendor Configuration
const VENDOR_ID = process.env.NEXT_PUBLIC_VENDOR_ID || '591';

// Featured Categories from Store - Easy to Edit
const featuredStoreCategories = [
  {
    id: 626,
    name: 'انجن جارد',
    slug: 'engine-guard',
    description: 'حماية قوية لمحرك موتوسيكلك',
    icon: '🪞',
    gradient: 'from-amber-500 to-orange-500',
    productsCount: 8
  },
  {
    id: 428,
    name: 'مرايات',
    slug: 'mirrors',
    description: 'مرايات عالية الجودة',
    icon: '🪞',
    gradient: 'from-amber-500 to-orange-500',
    productsCount: 8
  },
  {
    id: 425,
    name: 'مقابض',
    slug: 'grips',
    description: 'مقابض متينة ومريحة',
    icon: '🎮',
    gradient: 'from-brand-700 to-amber-600',
    productsCount: 8
  },
{
    id: 421,
    name: 'خوذة',
    slug: 'motorcycle-safety-gear',
    description: 'أفضل خوذة لموتوسيكلك',
    icon: '🎒',
    gradient: 'from-brand-500 to-amber-500',
    productsCount: 8
  },
];

// Hero Slides - Hot Deals
const heroSlides = [
  {
    id: 1,
    image: 'https://api.spare2app.com/wp-content/uploads/2026/03/kwwiwgazn8mz6z0bcary.png',
    title: 'انجن جارد Hogan',
    subtitle: 'F250 / H250 / L250 / V250',
    oldPrice: 950,
    newPrice: 850,
    discount: 10,
    savings: 100,
    description: 'حماية قوية لمحرك موتوسيكلك - موجود جميع الألوان',
    colors: ['أبيض', 'أحمر', 'أخضر', 'أزرق', 'أسود', 'أصفر', 'رمادي'],
    ctaText: 'اطلب الآن',
    ctaLink: '/deals',
    badge: '🔥 عرض ساخن'
  },
  {
    id: 2,
    image: 'https://api.spare2app.com/wp-content/uploads/2026/02/sok4ktdrjtgxxnldqg9y.jpg',
    title: 'مرايات h2 ',
    subtitle: 'تصميم أنيق ',
    oldPrice: 320,
    newPrice: 280,
    discount: 14,
    savings: 40,
    description: 'مرايه عالية الجودة - متوفر بلونين',
    colors: ['أسود', 'فضي'],
    ctaText: 'اطلب الآن',
    ctaLink: '/deals',
    badge: '💨 الأكثر مبيعًا'
  }
];

const features = [
  {
    icon: '🚚',
    title: 'شحن سريع',
    description: 'توصيل في جميع أنحاء مصر خلال 2-3 أيام',
    color: 'bg-brand-500'
  },
  {
    icon: '✅',
    title: 'ضمان الجودة',
    description: 'قطع غيار أصلية بضمان معتمد',
    color: 'bg-brand-600'
  },
  {
    icon: '💬',
    title: 'دعم فني',
    description: 'فريق دعم متخصص لمساعدتك في الاختيار',
    color: 'bg-amber-500'
  }
];

const quickHighlights = [
  'شحن سريع لكل المحافظات',
  'دعم فني قبل وبعد الشراء',
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Zustand store for vendor categories
  const { categories, isLoading: categoriesLoading, fetchVendorCategories } = useVendorCategoriesStore();

  // Load categories from store
  useEffect(() => {
    fetchVendorCategories(VENDOR_ID);
  }, [fetchVendorCategories]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      prevSlide(); // RTL: swipe left = previous
    }
    if (isRightSwipe) {
      nextSlide(); // RTL: swipe right = next
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Top Highlights Bar */}
      <section className="border-b border-brand-100 bg-white/80 backdrop-blur">
        <div className="container px-3 py-2 mx-auto max-w-7xl md:px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {quickHighlights.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold border rounded-full text-brand-700 bg-brand-50 border-brand-200"
              >
                <span>✦</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Carousel - New Visual Theme */}
      <section className="relative w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(227,133,10,0.28),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.09),_transparent_40%)]" />
        <div className="container relative px-3 py-4 mx-auto max-w-7xl md:px-4 md:py-8">
          
          {/* Carousel Content */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              {heroSlides.map((slide, index) => index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Mobile: Compact Horizontal Card */}
                  <div className="md:hidden">
                    <div className="relative flex gap-3 p-3 overflow-hidden border shadow-2xl bg-white/95 rounded-2xl border-brand-100">
                      {/* Discount Badge */}
                      {slide.discount && (
                        <div className="absolute z-10 px-2 py-1 text-xs font-black text-white transform rounded-lg shadow-lg bg-brand-700 -rotate-3 top-1 left-1">
                          🔥 -{slide.discount}%
                        </div>
                      )}

                      {/* Product Image - Right Side */}
                      <div className="flex-shrink-0 w-24">
                        <OptimizedImage
                          src={slide.image}
                          alt={slide.title}
                          width={96}
                          height={96}
                          className="object-contain w-full h-24"
                          priority={index === 0}
                          quality={75}
                        />
                      </div>

                      {/* Product Info - Left Side */}
                      <div className="flex flex-col justify-center flex-1 min-w-0">
                        <h2 className="mb-0.5 text-sm font-black text-gray-900 truncate">
                          {slide.title}
                        </h2>
                        <p className="mb-1 text-xs text-gray-600 truncate">
                          {slide.subtitle}
                        </p>
                        
                        {/* Price Row */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-lg font-black text-brand-600">
                            {slide.newPrice} ج.م
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {slide.oldPrice}
                          </span>
                        </div>

                        {/* CTA Button */}
                        <Link
                          href={slide.ctaLink}
                          className="inline-flex items-center self-start justify-center gap-1 px-3 py-1.5 text-xs font-bold text-white rounded-lg bg-brand-600 hover:bg-brand-700"
                        >
                          اطلب الآن 🛒
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Full Layout */}
                  <div className="hidden gap-6 md:grid md:grid-cols-2 md:gap-10">
                    
                    {/* Content Side */}
                    <div className="flex flex-col order-2 text-center md:order-1 md:text-right">
                      
                      {/* Title */}
                      <h1 className="mb-2 text-2xl font-black text-white md:mb-3 md:text-5xl lg:text-6xl drop-shadow-sm">
                        {slide.title}
                      </h1>

                      {/* Subtitle */}
                      <p className="mb-4 text-base font-bold text-white/90 md:mb-5 md:text-xl">
                        {slide.subtitle}
                      </p>

                      {/* Price Card */}
                      <div className="self-center p-4 mb-4 border shadow-2xl bg-white/95 border-brand-100 md:self-start rounded-2xl md:p-5 md:mb-5">
                        <div className="flex items-end gap-2 mb-2 md:gap-3 md:mb-3">
                          <div>
                            <p className="text-xs text-gray-600">السعر الآن</p>
                            <p className="text-3xl font-black text-brand-600 md:text-4xl lg:text-5xl">
                              {slide.newPrice}
                              <span className="text-lg md:text-2xl"> ج.م</span>
                            </p>
                          </div>
                          <div className="pb-1">
                            <p className="text-base font-bold text-gray-400 line-through md:text-xl">
                              {slide.oldPrice}
                            </p>
                          </div>
                        </div>
                        
                        {/* Savings Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl md:gap-2 md:px-4 md:py-2 bg-brand-700">
                          <span className="text-base md:text-xl">💰</span>
                          <span className="text-sm font-black text-white md:text-base">
                            وفر {slide.savings} جنيه
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="flex justify-center md:justify-start">
                        <Link
                          href={slide.ctaLink}
                          className="inline-flex items-center gap-2 px-6 py-3 text-lg font-black text-white transition-transform shadow-2xl md:px-8 md:py-4 rounded-xl bg-brand-600 hover:bg-brand-700 hover:scale-105 md:text-xl"
                        >
                          <span>{slide.ctaText}</span>
                          <motion.span 
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-xl md:text-2xl"
                          >
                            🛒
                          </motion.span>
                        </Link>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className="flex flex-col order-1 gap-4 md:order-2">

                      {/* Image Container */}
                      <div className="relative p-4 border shadow-2xl bg-white/95 border-brand-100 rounded-3xl md:p-6">
                        {/* Discount Badge - On Image */}
                        {slide.discount && (
                          <div className="absolute z-10 top-2 left-2 md:top-3 md:left-3">
                            <div className="inline-flex items-center gap-1.5 px-3 py-2 shadow-2xl rounded-2xl transform -rotate-3 md:gap-2 md:px-4 md:py-2.5 bg-brand-700">
                              <span className="text-xl md:text-2xl">🔥</span>
                              <div>
                                <p className="text-[10px] font-bold text-white/90 md:text-xs">خصم</p>
                                <p className="text-xl font-black text-white md:text-2xl">{slide.discount}%</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <OptimizedImage
                          src={slide.image}
                          alt={slide.title}
                          width={400}
                          height={400}
                          className="object-contain w-full max-w-[280px] md:max-w-[400px] mx-auto"
                          priority={index === 0}
                          quality={90}
                        />
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Section - Compact on Mobile */}
          <div className="flex items-center justify-center gap-3 mt-3 md:justify-between md:gap-4 md:mt-8">
            
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="flex items-center justify-center flex-shrink-0 w-8 text-white transition-all border rounded-full bg-white/20 border-white/30 aspect-square backdrop-blur-sm hover:bg-white/30 md:w-14"
              aria-label="السابق"
            >
              <ChevronRightIcon className="w-4 md:w-7" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5 md:gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-6 bg-white md:w-10'
                      : 'w-1.5 bg-white/50 hover:bg-white/75 md:w-2'
                  } aspect-square md:w-3`}
                  aria-label={`الانتقال للعرض ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="flex items-center justify-center flex-shrink-0 w-8 text-white transition-all border rounded-full bg-white/20 border-white/30 aspect-square backdrop-blur-sm hover:bg-white/30 md:w-14"
              aria-label="التالي"
            >
              <ChevronLeftIcon className="w-4 md:w-7" />
            </button>
          </div>

        </div>
      </section>

      {/* Store Categories - Circular & Scrollable & Sticky */}
      <section className="sticky z-40 border-b shadow-sm top-16 md:top-20 bg-white/95 backdrop-blur border-brand-100">
        <div className="px-0 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* <h2 className="mb-3 text-base font-bold text-center text-gray-900 md:text-xl md:mb-4">تصفح حسب الفئة</h2> */}
          
          {/* Store Categories Sticky Component */}
          <StoreCategoriesSticky
            categories={categories}
            loading={categoriesLoading}
            showAsLinks={true}
            storeSlug="category"
            viewMode="horizontal"
          />
        </div>
      </section>

      {/* Featured Store Categories Products */}
      {featuredStoreCategories.map((category) => (
        <FeaturedCategoryProducts
          key={category.id}
          vendorId={VENDOR_ID}
          categoryId={category.id}
          categoryName={category.name}
          categorySlug={category.slug}
          description={category.description}
          icon={category.icon}
          gradient={category.gradient}
          productsCount={category.productsCount}
        />
      ))}

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-gray-900">ليه تشتري من إبراهيم شكمان؟</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              نقدم لك أفضل تجربة تسوق لقطع غيار الموتوسيكلات
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="p-6 text-center transition-all duration-300 border group rounded-3xl border-brand-100 bg-gradient-to-b from-white to-brand-50/50 hover:shadow-xl hover:-translate-y-1">
                <div className={`${feature.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="max-w-sm mx-auto leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="relative py-20 overflow-hidden text-white bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold">لم تجد ما تبحث عنه؟</h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-gray-300">
            تواصل معنا وسنساعدك في العثور على القطعة المناسبة لموتوسيكلك
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 transition-all duration-200 transform btn-primary bg-brand-600 hover:bg-brand-700 hover:scale-105"
            >
              <span>تواصل معنا</span>
              <span>📞</span>
            </Link>
            <Link 
              href="/search"
              className="inline-flex items-center justify-center gap-2 text-white border-white btn-outline hover:bg-white hover:text-gray-900"
            >
              <span>بحث متقدم</span>
              <span>🔍</span>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
