"use client"

import { BookOpen, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { libraryData } from "@/data/library-data"

export function LibrarySidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = libraryData.navigation.mainMenu

  return (
    <>
      {/* Mobile Header - Full width, fixed top */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between h-16 px-4 border-b bg-background z-40">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="text-primary hover:bg-primary/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <img 
              src={libraryData.siteInfo.logo}
              alt="Logo" 
              className="h-8 w-auto rounded-md object-contain" 
            />
            <span className="font-semibold text-sm">{libraryData.siteInfo.name}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay with improved animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar drawer */}
            <motion.div
              initial={{ opacity: 1, x: "-100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-background md:hidden overflow-y-auto shadow-lg"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <Link href="/" className="flex items-center gap-2">
                  <img 
                    src={libraryData.siteInfo.logo}
                    alt="Logo" 
                    className="h-8 w-auto rounded-md object-contain" 
                  />
                  <span className="font-semibold text-sm">{libraryData.siteInfo.name}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="overflow-y-auto h-[calc(100vh-4rem)] pb-20">
                <div className="flex flex-col gap-1 p-3">
                  {menuItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Button
                        key={item.title}
                        variant={active ? "default" : "ghost"}
                        className={`justify-start gap-2 h-12 w-full ${
                          active ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-accent"
                        }`}
                        asChild
                      >
                        <Link href={item.href}>
                          <item.icon className={`h-5 w-5 mr-2 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                          {item.title}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar with improved styling */}
      <Sidebar className="hidden md:flex border-r shadow-sm">
        <SidebarHeader className="flex items-center h-16 px-6 border-b">
          <Link href="/" className="flex items-center gap-2 w-full">
            <img 
              src={libraryData.siteInfo.logo}
              alt="Logo" 
              className="h-10 w-auto rounded-md object-contain" 
            />
            <span className="font-semibold truncate">{libraryData.siteInfo.name}</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-2 py-4">
          <SidebarMenu>
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton 
                    asChild 
                    isActive={active} 
                    className={`transition-all duration-200 w-full rounded-md ${
                      active ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className={`h-5 w-5 ${
                        active ? "text-black" : "text-black"
                      }`} />
                      <span>{item.title}</span>
                      {active && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className="absolute right-2 h-2 w-2 rounded-full bg-primary-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          {/* User information removed from the footer */}
        </SidebarFooter>
      </Sidebar>
    </>
  )
}