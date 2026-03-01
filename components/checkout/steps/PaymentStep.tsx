'use client'

import { useState, useEffect } from 'react'
import { CreditCardIcon, CheckCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useCheckoutPayment, useCheckoutStep } from '@/store/checkoutStore'
import { useCartStore } from '@/store/cartStore'
import type { PaymentMethod, PaymentProof } from '@/types'
import PaymentProofUpload from '../payment/PaymentProofUpload'

// Fixed payment methods - Instapay only
const AVAILABLE_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'instapay',
    title: 'الدفع عبر محفظة Instapay',
    description: 'قم بتحويل المبلغ إلى حساب Instapay ثم ارفع صورة إثبات الدفع',
    enabled: true,
    requiresProof: true,
    icon: '/images/instapay-logo.png',
    accountNumber: process.env.NEXT_PUBLIC_INSTAPAY_ACCOUNT_NUMBER || '01025338973',
    accountName: process.env.NEXT_PUBLIC_INSTAPAY_ACCOUNT_NAME || 'وليد أحمد',
  }
]

export default function PaymentStep() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(AVAILABLE_PAYMENT_METHODS)
  const [loading, setLoading] = useState(false)
  
  const { paymentMethod, paymentProof, setPaymentMethod, setPaymentProof } = useCheckoutPayment()
  const { nextStep, previousStep } = useCheckoutStep()
  const { totalPrice } = useCartStore()

  // Set Instapay as default payment method
  useEffect(() => {
    if (!paymentMethod && AVAILABLE_PAYMENT_METHODS.length > 0) {
      setPaymentMethod(AVAILABLE_PAYMENT_METHODS[0])
    }
  }, [])
  
  const handleMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method)
    
    // Clear payment proof if switching from Instapay to another method
    if (method.id !== 'instapay' && paymentProof) {
      setPaymentProof(null)
    }
  }
  
  const handleContinue = () => {
    if (!paymentMethod) {
      toast.error('يرجى اختيار طريقة الدفع')
      return
    }
    
    // Check if Instapay requires proof
    if (paymentMethod.requiresProof && !paymentProof) {
      toast.error('يرجى رفع إثبات الدفع')
      return
    }
    
    nextStep()
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          طريقة الدفع
        </h2>
        <p className="text-gray-600">
          اختر طريقة الدفع المناسبة لك
        </p>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent" />
        </div>
      )}
      
      {/* Payment Methods */}
      {!loading && paymentMethods.length > 0 && (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id}>
              <button
                onClick={() => handleMethodSelect(method)}
                className={`
                  w-full p-6 rounded-lg border-2 text-right transition-all
                  ${paymentMethod?.id === method.id
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-gray-200 hover:border-brand-300 bg-white'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className={`
                      p-3 rounded-lg
                      ${paymentMethod?.id === method.id ? 'bg-brand-100' : 'bg-gray-100'}
                    `}>
                      {method.id === 'instapay' ? (
                        <BanknotesIcon className={`
                          w-6 h-6
                          ${paymentMethod?.id === method.id ? 'text-brand-600' : 'text-gray-600'}
                        `} />
                      ) : (
                        <CreditCardIcon className={`
                          w-6 h-6
                          ${paymentMethod?.id === method.id ? 'text-brand-600' : 'text-gray-600'}
                        `} />
                      )}
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                      
                      {/* Instapay Account Details */}
                      {method.id === 'instapay' && method.accountNumber && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            معلومات الحساب:
                          </p>
                          <p className="text-sm text-gray-900 font-mono">
                            📱 {method.accountNumber}
                          </p>
                          {method.accountName && (
                            <p className="text-sm text-gray-600 mt-1">
                              {method.accountName}
                            </p>
                          )}
                        </div>
                      )}
                      
                      {method.requiresProof && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-amber-600">
                          <span className="text-amber-500">⚠️</span>
                          <span>يتطلب إثبات الدفع</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  {paymentMethod?.id === method.id && (
                    <CheckCircleIcon className="w-8 h-8 text-brand-600" />
                  )}
                </div>
              </button>
              
              {/* Payment Proof Upload (for Instapay) */}
              {paymentMethod?.id === method.id &&
                method.requiresProof &&
                method.id === 'instapay' && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <PaymentProofUpload
                      amount={totalPrice}
                      onUploadSuccess={(proof) => setPaymentProof(proof)}
                      onRemove={() => setPaymentProof(null)}
                      existingProof={paymentProof || undefined}
                    />
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
      
      {/* No Methods Available */}
      {!loading && paymentMethods.length === 0 && (
        <div className="text-center py-12">
          <CreditCardIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد طرق دفع متاحة
          </h3>
          <p className="text-gray-600">
            عذراً، لا يمكن إتمام الدفع حالياً
          </p>
        </div>
      )}
      
      {/* Navigation Buttons */}
      {!loading && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={previousStep}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← الرجوع
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!paymentMethod || (paymentMethod.requiresProof && !paymentProof)}
            className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            متابعة إلى المراجعة ←
          </button>
        </div>
      )}
    </div>
  )
}
