import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Informasi Grup WhatsApp",
  description: "Halaman informasi grup WhatsApp dengan kontak admin",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --theme-color: #10b981;
          }
          
          .dark {
            --theme-color: #10b981;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'