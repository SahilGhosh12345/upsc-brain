import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import Provider from './Provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Learning Platform',
  description: 'AI-powered mock interviews and PDF note-taking',
  icons: {
    icon: '/logo.jpg',
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
          {children}
          </Provider>
        </ThemeProvider>
        
      </body>
    </html>
    </ClerkProvider>
  )
}
