'use client'

import { useState, Fragment, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Popover, Transition } from '@headlessui/react'
import {  Bars3Icon, 
  ShoppingBagIcon, 
  XMarkIcon, 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'
import { 
  ChevronDownIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  TruckIcon 
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'
import Search from '@/components/ui/Search'
import useShoppingCart from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useVendorCategoriesStore } from '@/store/vendorCategoriesStore'
import StoreCategoriesSticky from '@/components/stores/StoreCategoriesSticky'
import { Category } from '@/types'

const motorcycleBrands = [
  {
    name: 'هوجان',
    slug: 'haojiang',
    models: [
      { name: 'Z250', slug: 'z250' },
      { name: 'F250', slug: 'f250' },
      { name: 'H250', slug: 'h250' },
      { name: 'TX250', slug: 'tx250' }
    ]
  },
  {
    name: 'فيجوري',
    slug: 'vigorey', 
    models: [
      { name: 'VR300', slug: 'vr300' },
      { name: 'ST Plus', slug: 'st-plus' }
    ]
  },
  {
    name: 'بينيلي',
    slug: 'benelli',
    models: [
      { name: 'VLX', slug: 'vlx' },
      { name: 'S200', slug: 's200' }
    ]
  },
  {
    name: 'ويانج',
    slug: 'wuyang',
    models: [
      { name: 'RV250', slug: 'rv250' }
    ]
  }
]

const navigation = {
  pages: [
    { name: 'الرئيسية', href: '/' },
    { name: 'جميع المنتجات', href: '/products' },
    { name: 'من نحن', href: '/about' },
    { name: 'اتصل بنا', href: '/contact' }
  ]
}

export default function NavbarNew() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const { cartQuantityTotal, openCart } = useShoppingCart()
  const { user, logout } = useUserStore()
  
  // Zustand store for vendor categories
  const VENDOR_ID = process.env.NEXT_PUBLIC_VENDOR_ID || '22'
  const { categories, isLoading: loadingCategories, fetchVendorCategories } = useVendorCategoriesStore()
  
  // Load categories on mount
  useEffect(() => {
    fetchVendorCategories(VENDOR_ID)
  }, [fetchVendorCategories])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch categories from API with parent filter to get only main brands
  // Fetch only main categories (children of 365 - the main brands parent)
  // Take first 12 categories for navbar
  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
        
  //       const response = await fetch('/api/categories?parent=365&per_page=50')
  //       const data = await response.json()
        
  //       if (data.data && Array.isArray(data.data)) {
          
  //         const mainCategories = data.data.slice(0, 12)
  //         setCategories(mainCategories)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching categories:', error)
  //     } finally {
  //       setLoadingCategories(false)
  //     }
  //   }

  //   fetchCategories()
  // }, [])

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'} bg-white`}>
      {/* Top Bar - Desktop Only (Not Sticky) */}
      <div className={`${scrolled ? 'hidden' : 'block'} hidden border-b bg-gradient-to-r from-primary-50 to-blue-50 border-primary-100`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="flex items-center gap-6 text-gray-600">
              <a href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || '01065333763'}`} className="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
                <PhoneIcon className="w-4 h-4" />
                <span className="font-medium">{process.env.NEXT_PUBLIC_CONTACT_PHONE || '01065333763'}</span>
              </a>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ibrahimskmanweb@gmail.com'}`} className="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
                <EnvelopeIcon className="w-4 h-4" />
                <span>{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ibrahimskmanweb@gmail.com'}</span>
              </a>
            </div>
            {/* <div className="flex items-center gap-2 font-medium text-primary-700">
              <TruckIcon className="w-4 h-4" />
              <span>شحن مجاني للطلبات أكثر من 500 جنيه 🎉</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Navigation (Sticky) */}
      <header className='relative bg-white'>
        <nav aria-label="Top" className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4 md:h-20">
            {/* Mobile: Menu Button */}
            <button
              type="button"
              className="p-2 -ml-2 text-gray-600 transition-all rounded-lg lg:hidden hover:bg-gray-100 active:scale-95"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 lg:mr-8">
              <OptimizedImage src="/logo.webp"
                alt="إبراهيم شكمان"
                width={200}
                height={79}
                className="w-20 h-20 transition-transform hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation Links  */}
            <div className="flex-1 hidden lg:flex lg:items-center lg:gap-6">
              {/* Brands Dropdown */}
              {/* <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className={`group flex items-center gap-1.5 text-sm font-semibold transition-all px-3 py-2 rounded-lg ${open ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}>
                      <span>🏍️ الماركات</span>
                      <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 scale-95 translate-y-1"
                      enterTo="opacity-100 scale-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 scale-100 translate-y-0"
                      leaveTo="opacity-0 scale-95 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 z-20 mt-3 origin-top-right w-96">
                        <div className="overflow-hidden bg-white shadow-2xl rounded-2xl ring-1 ring-black/5">
                          <div className="p-6">
                            <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">اختر الماركة</h3>
                            <div className="grid grid-cols-2 gap-6">
                              {motorcycleBrands.map((brand) => (
                                <div key={brand.slug} className="space-y-2">
                                  <Link
                                    href={`/brands/${brand.slug}`}
                                    className="flex items-center gap-2 font-bold text-gray-900 transition-colors group hover:text-primary-600"
                                  >
                                    <span className="text-lg">{brand.name}</span>
                                    <span className="transition-opacity opacity-0 text-primary-600 group-hover:opacity-100">←</span>
                                  </Link>
                                  <ul className="space-y-1.5 mr-2">
                                    {brand.models.map((model) => (
                                      <li key={model.slug}>
                                        <Link
                                          href={`/brands/${brand.slug}/${model.slug}`}
                                          className="text-sm text-gray-600 transition-all hover:text-primary-600 hover:mr-1"
                                        >
                                          • {model.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover> */}

              {/* Categories Dropdown */}
              {/* <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className={`group flex items-center gap-1.5 text-sm font-semibold transition-all px-3 py-2 rounded-lg ${open ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}>
                      <span>📦 فئات القطع</span>
                      <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 scale-95 translate-y-1"
                      enterTo="opacity-100 scale-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 scale-100 translate-y-0"
                      leaveTo="opacity-0 scale-95 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 z-20 mt-3 origin-top-right w-80">
                        <div className="overflow-hidden bg-white shadow-2xl rounded-2xl ring-1 ring-black/5">
                          <div className="p-6">
                            <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">تصفح حسب الفئة</h3>
                            {loadingCategories ? (
                              <div className="py-8 text-sm text-center text-gray-500">
                                <div className="w-8 h-8 mx-auto mb-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
                                جاري التحميل...
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-2">
                                {categories.map((category) => (
                                  <Link
                                    key={category.id}
                                    href={`/products/category/${category.slug}`}
                                    className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 transition-all rounded-lg group hover:text-primary-600 hover:bg-primary-50"
                                  >
                                    <span className="font-medium">{category.name}</span>
                                    <span className="text-xs text-gray-400 group-hover:text-primary-600">({category.count})</span>
                                  </Link>
                                ))}
                                {categories.length > 0 && (
                                  <Link
                                    href="/products"
                                    className="flex items-center justify-center col-span-2 gap-2 px-4 py-3 pt-4 mt-2 text-sm font-bold transition-all border-t rounded-lg text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100"
                                  >
                                    <span>عرض جميع المنتجات</span>
                                    <span>←</span>
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover> */}

              {/* Regular Links */}
              {navigation.pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className="px-3 py-2 text-sm font-semibold text-gray-700 transition-all rounded-lg hover:text-primary-600 hover:bg-gray-50"
                >
                  {page.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search - Hidden on Mobile */}
              <div className="hidden md:block">
                <Search />
              </div>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative group p-2.5 rounded-xl bg-gray-50 hover:bg-primary-50 transition-all active:scale-95"
              >
                <ShoppingBagIcon className="w-6 h-6 text-gray-600 transition-colors group-hover:text-primary-600" />
                {cartQuantityTotal > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-primary-600 text-white text-xs font-bold rounded-full border-2 border-white shadow-lg animate-pulse">
                    {cartQuantityTotal > 99 ? '99+' : cartQuantityTotal}
                  </span>
                )}
              </button>

              {/* User Menu - Desktop */}
              <div className="items-center hidden gap-2 lg:flex">
                {user ? (
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${open ? 'bg-primary-50 text-primary-600' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                          <UserCircleIcon className="w-5 h-5" />
                          <span className="max-w-[100px] truncate text-sm">{user.name || user.email}</span>
                          <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Popover.Panel className="absolute left-0 z-20 w-64 mt-3 origin-top-left">
                            <div className="overflow-hidden bg-white shadow-2xl rounded-2xl ring-1 ring-black/5">
                              <div className="p-4">
                                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                  <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-br from-primary-500 to-primary-600">
                                    {(user.name || user.email).charAt(0).toUpperCase()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">{user.name || 'مستخدم'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                  </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                  <Link
                                    href="/account"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all"
                                  >
                                    <UserCircleIcon className="w-5 h-5" />
                                    <span>حسابي</span>
                                  </Link>
                                  <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                                  >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    <span>تسجيل الخروج</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/auth/login"
                      className="px-4 py-2.5 text-sm font-semibold text-brand-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="px-4 py-2.5 text-sm font-semibold text-white bg-brand-500 rounded-xl shadow-lg shadow-primary-500/30 transition-all active:scale-95"
                    >
                      حساب جديد
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <Dialog as="div" className="relative z-[100000000] lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-[100000000] flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-sm transform flex-col bg-white shadow-2xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-blue-50">
              <OptimizedImage src="/logo.webp" alt="إبراهيم شكمان" width={200} height={79} className="w-20 h-20" />
              <button
                type="button"
                className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-white/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto">
              {/* User Section */}
              <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-br from-primary-500 to-primary-600">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{user.name || 'مستخدم'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      href="/auth/login"
                      className="flex-1 px-4 py-2.5 text-sm font-semibold text-center text-brand-600 bg-white border border-primary-200 rounded-xl hover:bg-primary-50 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="flex-1 px-4 py-2.5 text-sm font-semibold text-center text-white bg-brand-500 rounded-xl shadow-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      حساب جديد
                    </Link>
                  </div>
                )}
              </div>

              {/* Search Bar - Mobile */}
              <div className="px-4 py-4 border-b border-gray-200">
                <Search onSearchOpen={() => setMobileMenuOpen(false)} />
              </div>

              {/* Quick Links - Mobile */}
              {user && (
                <div className="px-4 py-3 space-y-1 border-b border-gray-200">
                  <Link
                    href="/account"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    <span>حسابي</span>
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              )}

              {/* Navigation Links */}
              <div className="px-4 py-4 space-y-1">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="block px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>

              {/* Brands Section */}
              {/* <div className="px-4 py-4 border-t border-gray-200">
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">🏍️ الماركات</h3>
                <div className="space-y-4">
                  {motorcycleBrands.map((brand) => (
                    <div key={brand.slug}>
                      <Link
                        href={`/brands/${brand.slug}`}
                        className="block mb-2 font-bold text-gray-900 transition-colors hover:text-primary-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {brand.name}
                      </Link>
                      <div className="mr-4 space-y-1">
                        {brand.models.map((model) => (
                          <Link
                            key={model.slug}
                            href={`/brands/${brand.slug}/${model.slug}`}
                            className="block py-1 text-sm text-gray-600 transition-colors hover:text-primary-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            • {model.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Categories Section - StoreCategoriesSticky */}
              <div className="border-t border-gray-200">
                {/* <div className="px-4 py-3">
                  <h3 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">📦 تصفح الفئات</h3>
                </div> */}
                <StoreCategoriesSticky
                  categories={categories}
                  loading={loadingCategories}
                  showAsLinks={true}
                  storeSlug="category"
                  viewMode="sidebar"
                  onCategorySelect={() => setMobileMenuOpen(false)}
                />
              </div>

              {/* Contact Info - Mobile */}
              <div className="px-4 py-4 space-y-2 border-t border-gray-200 bg-gray-50">
                <a href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || '01065333763'}`} className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600">
                  <PhoneIcon className="w-4 h-4" />
                  <span>{process.env.NEXT_PUBLIC_CONTACT_PHONE || '01065333763'}</span>
                </a>
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ibrahimskmanweb@gmail.com'}`} className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ibrahimskmanweb@gmail.com'}</span>
                </a>
                {/* <div className="flex items-center gap-2 pt-2 text-xs font-medium text-primary-600">
                  <TruckIcon className="w-4 h-4" />
                  <span>شحن مجاني للطلبات أكثر من 500 جنيه</span>
                </div> */}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
