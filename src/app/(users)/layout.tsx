import { Header } from '@/components/Header'
import '../globals.css'
import { Footer } from '@/components/Footer'
import { QuoteProvider } from '@/components/QuoteContext'

export default function UsersRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <QuoteProvider>
        <header><Header /></header>
        {children}
        <footer className="sharedMain" style={{paddingBottom: '10px', paddingTop: '10px', marginTop: '0px'}}>
          <Footer />
        </footer>
        </QuoteProvider>
  )
}