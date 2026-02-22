import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LibrarySidebar } from "@/components/library-sidebar"
import { TopMarquee } from "@/components/top-marquee"
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CAHCET CENTRAL LIBRARY",
  description: "A comprehensive library Website of CCL"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
          <SidebarProvider>
            <div className="flex min-h-screen flex-col">
              <TopMarquee />
              <div className="flex flex-1">
                <LibrarySidebar />
                <main className="flex-1 p-4 md:p-6 overflow-hidden">
                  <div className="max-w-7xl mx-auto">{children}</div>
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}



import './globals.css'