"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  BookOpen,
  Users,
  Settings,
  FileText,
  Image,
  Newspaper,
  GraduationCap,
  Bell,
  ArrowRight,
  Clock,
  TrendingUp,
  BookMarked,
  ScrollText,
  Contact,
  Library
} from "lucide-react"
import { libraryData } from "@/data/library-data"
import { getStatistics, getAnnouncements } from "@/lib/data-service"

const quickActions = [
  {
    title: "Site Settings",
    description: "Update site name, logo, and tagline",
    icon: Settings,
    href: "/admin/site-settings",
    color: "bg-blue-500",
  },
  {
    title: "Statistics",
    description: "Update books, journals, e-books count",
    icon: TrendingUp,
    href: "/admin/statistics",
    color: "bg-green-500",
  },
  {
    title: "Announcements",
    description: "Add or edit library announcements",
    icon: Bell,
    href: "/admin/announcements",
    color: "bg-yellow-500",
  },
  {
    title: "Library Hours",
    description: "Update operating hours",
    icon: Clock,
    href: "/admin/hours",
    color: "bg-purple-500",
  },
  {
    title: "About & Staff",
    description: "Manage staff information and history",
    icon: Users,
    href: "/admin/about",
    color: "bg-pink-500",
  },
  {
    title: "Committee",
    description: "Manage committee members and functions",
    icon: Users,
    href: "/admin/committee",
    color: "bg-indigo-500",
  },
  {
    title: "Rules & Regulations",
    description: "Update library rules",
    icon: ScrollText,
    href: "/admin/rules",
    color: "bg-orange-500",
  },
  {
    title: "Library Policy",
    description: "Manage vision, mission, and policies",
    icon: FileText,
    href: "/admin/policy",
    color: "bg-teal-500",
  },
  {
    title: "Gallery",
    description: "Add or remove gallery images",
    icon: Image,
    href: "/admin/gallery",
    color: "bg-cyan-500",
  },
  {
    title: "Journals",
    description: "Manage journal listings",
    icon: Newspaper,
    href: "/admin/journals",
    color: "bg-red-500",
  },
  {
    title: "Syllabi",
    description: "Update syllabus links",
    icon: GraduationCap,
    href: "/admin/syllabi",
    color: "bg-emerald-500",
  },
  {
    title: "E-Resources",
    description: "Manage e-resource access",
    icon: BookMarked,
    href: "/admin/e-resources",
    color: "bg-violet-500",
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(libraryData.statistics)
  const [announcements, setAnnouncements] = useState(libraryData.announcements)

  useEffect(() => {
    const loadData = async () => {
      const [s, a] = await Promise.all([
        getStatistics(),
        getAnnouncements()
      ])
      setStats(s)
      setAnnouncements(a)
    }
    loadData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, A. Fahim Sheriff! Manage all library website content from here.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBooks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Physical collection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Journals</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJournals}</div>
            <p className="text-xs text-muted-foreground">Print & electronic</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E-Books</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEBooks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Digital collection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{libraryData.about.staff.length}</div>
            <p className="text-xs text-muted-foreground">Library team</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-base">{action.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  <div className="flex items-center mt-3 text-primary text-sm font-medium">
                    Manage <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Announcements Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest news displayed on the website</CardDescription>
          </div>
          <Link href="/admin/announcements">
            <Button variant="outline" size="sm">
              Manage <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.slice(0, 3).map((announcement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Bell className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium">{announcement.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{announcement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-3">
        <Link href="/" target="_blank">
          <Button variant="outline">
            <Library className="mr-2 h-4 w-4" />
            View Website
          </Button>
        </Link>
        <Link href="/admin/contact">
          <Button variant="outline">
            <Contact className="mr-2 h-4 w-4" />
            Contact Settings
          </Button>
        </Link>
      </div>
    </div>
  )
}
