import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import Footer from "@/components/layout/Footer";
import AuthBootstrap from "@/components/common/AuthBootstrap";
import ShoppingCart from "@/components/cart/ShoppingCart";
import CartFloatingButton from "@/components/cart/CartFloatingButton";
import BottomNav from "@/components/layout/BottomNav";
import ToastContainer from "@/components/common/ToastContainer";

export const metadata: Metadata = {
  metadataBase: new URL('https://ibrahimskman.com'),
  title: 'إبراهيم شكمان - قطع غيار وأكسسوارات الموتوسيكلات',
  description: 'متجر إبراهيم شكمان لقطع غيار وأكسسوارات الموتوسيكلات في مصر - قطع أصلية بأفضل الأسعار',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthBootstrap />
        <ConditionalNavbar />
        <ShoppingCart />
        <CartFloatingButton />
        <main>{children}</main>
        <Footer />
        <BottomNav />
        <ToastContainer />
      </body>
    </html>
  );
}
