import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - إبراهيم شكمان',
  description: 'سياسة الخصوصية وحماية البيانات في متجر إبراهيم شكمان. نحن ملتزمون بحماية خصوصيتك',
  keywords: 'سياسة الخصوصية, حماية البيانات, الأمان, Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50" dir="rtl">
      <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 text-5xl rounded-full bg-gradient-to-br from-brand-500 to-brand-600">
            🔒
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            سياسة الخصوصية
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
          </p>
          <p className="mt-2 text-sm text-gray-500">
            آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="p-8 bg-white shadow-lg md:p-12 rounded-3xl">
          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">المقدمة</h2>
              <p className="text-gray-700 leading-relaxed">
                نحن في <strong>إبراهيم شكمان</strong> نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. 
                توضح هذه السياسة كيفية جمعنا واستخدامنا وحماية معلوماتك عند استخدام موقعنا الإلكتروني.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">البيانات التي نجمعها</h2>
              <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-xl">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>المعلومات الشخصية:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، العنوان</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>معلومات الطلب:</strong> تفاصيل المنتجات، طرق الدفع، تاريخ الشراء</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>بيانات التصفح:</strong> عنوان IP، نوع المتصفح، صفحات الزيارة</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف نستخدم بياناتك</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">✓</span>
                  <span>معالجة وإتمام طلباتك</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">✓</span>
                  <span>التواصل معك بخصوص الطلبات والعروض</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">✓</span>
                  <span>تحسين خدماتنا وتجربة المستخدم</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">✓</span>
                  <span>الامتثال للمتطلبات القانونية</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حماية بياناتك</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                نطبق إجراءات أمنية صارمة لحماية معلوماتك الشخصية:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">🔐 تشفير SSL</h3>
                  <p className="text-sm text-gray-700">جميع البيانات المنقولة مشفرة</p>
                </div>
                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">🛡️ خوادم آمنة</h3>
                  <p className="text-sm text-gray-700">تخزين محمي بجدران نارية</p>
                </div>
                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">👥 وصول محدود</h3>
                  <p className="text-sm text-gray-700">فقط الموظفون المصرح لهم</p>
                </div>
                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">💳 دفع آمن</h3>
                  <p className="text-sm text-gray-700">معالجة الدفع عبر بوابات معتمدة</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مشاركة البيانات</h2>
              <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-3">
                  <strong>لا نبيع أو نؤجر</strong> معلوماتك الشخصية لأي طرف ثالث.
                </p>
                <p className="text-gray-700">
                  قد نشارك البيانات فقط مع:
                </p>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li>• شركات الشحن لتوصيل طلباتك</li>
                  <li>• بوابات الدفع الإلكتروني لمعالجة المدفوعات</li>
                  <li>• الجهات القانونية عند الضرورة القانونية</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حقوقك</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <strong>الوصول:</strong> يمكنك طلب نسخة من بياناتك الشخصية
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✏️</span>
                  <div>
                    <strong>التصحيح:</strong> يمكنك تحديث أو تصحيح بياناتك في أي وقت
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🗑️</span>
                  <div>
                    <strong>الحذف:</strong> يمكنك طلب حذف بياناتك (وفقاً للقوانين المعمول بها)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🚫</span>
                  <div>
                    <strong>الاعتراض:</strong> يمكنك الاعتراض على معالجة بياناتك لأغراض تسويقية
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
              <p className="text-gray-700 leading-relaxed">
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك التحكم في الكوكيز من إعدادات متصفحك.
                استخدامنا للكوكيز يشمل:
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>• تذكر تفضيلاتك</li>
                <li>• تتبع عناصر السلة</li>
                <li>• تحليل استخدام الموقع</li>
                <li>• عرض إعلانات مخصصة</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">التعديلات على السياسة</h2>
              <p className="text-gray-700 leading-relaxed">
                قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني
                أو عبر إشعار على الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
              <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl">
                <p className="mb-4">
                  لأي استفسارات بخصوص سياسة الخصوصية، يمكنك التواصل معنا:
                </p>
                <ul className="space-y-2">
                  <li>📧 البريد: {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ibrahimskmanweb@gmail.com'}</li>
                  <li>📱 الهاتف: {process.env.NEXT_PUBLIC_CONTACT_PHONE || '01065333763'}</li>
                </ul>
                <Link href="/help" className="inline-block mt-4 px-6 py-2 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  مركز المساعدة
                </Link>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  )
}
