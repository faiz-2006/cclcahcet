"use client"

import { useState, useEffect } from "react"
import { libraryData } from "@/data/library-data"
import { getStatistics, getAnnouncements, getLibraryHours } from "@/lib/data-service"
import { BookOpen, BookText, Library, Bell, Calendar } from "lucide-react"

export function TopMarquee() {
  const [stats, setStats] = useState(libraryData.statistics)
  const [announcements, setAnnouncements] = useState(libraryData.announcements)
  const [hours, setHours] = useState(libraryData.hours)

  useEffect(() => {
    const loadData = async () => {
      const [s, a, h] = await Promise.all([
        getStatistics(),
        getAnnouncements(),
        getLibraryHours(),
      ])
      setStats(s)
      setAnnouncements(a)
      setHours(h)
    }
    loadData()
  }, [])

  return (
    <div className="bg-yellow-500 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <div className="flex items-center mx-4">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Total Books: {stats.totalBooks.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <BookText className="h-4 w-4 mr-2" />
          <span>Total Journals: {stats.totalJournals.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <Library className="h-4 w-4 mr-2" />
          <span>Total E-Books: {stats.totalEBooks.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <Bell className="h-4 w-4 mr-2" />
          <span>Latest: {announcements.length > 0 ? announcements[0].title : "No announcements"}</span>
        </div>
        <div className="flex items-center mx-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Library Hours: {hours.length > 0 ? `${hours[0].time} (${hours[0].day})` : "Contact library"}</span>
        </div>
        <div className="flex items-center mx-4">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Total Books: {stats.totalBooks.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <BookText className="h-4 w-4 mr-2" />
          <span>Total Journals: {stats.totalJournals.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <Library className="h-4 w-4 mr-2" />
          <span>Total E-Books: {stats.totalEBooks.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
