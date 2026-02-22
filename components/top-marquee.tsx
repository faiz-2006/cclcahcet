"use client"

import { libraryData } from "@/data/library-data"
import { BookOpen, BookText, Library, Bell, Calendar } from "lucide-react"

export function TopMarquee() {
  return (
    <div className="bg-yellow-500 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <div className="flex items-center mx-4">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Total Books: {libraryData.statistics.totalBooks.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <BookText className="h-4 w-4 mr-2" />
          <span>Total Journals: {libraryData.statistics.totalJournals.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <Library className="h-4 w-4 mr-2" />
          <span>Total E-Books: {libraryData.statistics.totalEBooks.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <Bell className="h-4 w-4 mr-2" />
          <span>Latest: {libraryData.announcements[0].title}</span>
        </div>
        <div className="flex items-center mx-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Library Hours: {libraryData.hours[0].time} (Mon-Fri)</span>
        </div>
        <div className="flex items-center mx-4">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Total Books: {libraryData.statistics.totalBooks.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <BookText className="h-4 w-4 mr-2" />
          <span>Total Journals: {libraryData.statistics.totalJournals.toLocaleString()}</span>
        </div>
        <div className="flex items-center mx-4">
          <Library className="h-4 w-4 mr-2" />
          <span>Total E-Books: {libraryData.statistics.totalEBooks.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

