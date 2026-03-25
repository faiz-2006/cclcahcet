// Data Service - Retrieves data from localStorage or falls back to defaults
import { libraryData } from "@/data/library-data"

export const getLibraryData = () => {
  // Check if we're in browser environment
  if (typeof window === "undefined") return libraryData

  // Get site settings from localStorage or use defaults
  const siteSettings = localStorage.getItem("siteSettings")
  const siteInfo = siteSettings
    ? {
        ...libraryData.siteInfo,
        ...JSON.parse(siteSettings),
      }
    : libraryData.siteInfo

  // Get announcements from localStorage or use defaults
  const announcementsData = localStorage.getItem("announcements")
  const announcements = announcementsData ? JSON.parse(announcementsData) : libraryData.announcements

  // Get hours from localStorage or use defaults
  const hoursData = localStorage.getItem("libraryHours")
  const hours = hoursData ? JSON.parse(hoursData) : libraryData.hours

  // Get statistics from localStorage or use defaults
  const statisticsData = localStorage.getItem("statistics")
  const statistics = statisticsData ? JSON.parse(statisticsData) : libraryData.statistics

  return {
    ...libraryData,
    siteInfo,
    announcements,
    hours,
    statistics,
  }
}

// Get site info only
export const getSiteInfo = () => {
  if (typeof window === "undefined") return libraryData.siteInfo

  const siteSettings = localStorage.getItem("siteSettings")
  return siteSettings
    ? {
        ...libraryData.siteInfo,
        ...JSON.parse(siteSettings),
      }
    : libraryData.siteInfo
}

// Get announcements only
export const getAnnouncements = () => {
  if (typeof window === "undefined") return libraryData.announcements

  const announcementsData = localStorage.getItem("announcements")
  return announcementsData ? JSON.parse(announcementsData) : libraryData.announcements
}

// Get library hours only
export const getLibraryHours = () => {
  if (typeof window === "undefined") return libraryData.hours

  const hoursData = localStorage.getItem("libraryHours")
  return hoursData ? JSON.parse(hoursData) : libraryData.hours
}

// Get statistics only
export const getStatistics = () => {
  if (typeof window === "undefined") return libraryData.statistics

  const statisticsData = localStorage.getItem("statistics")
  return statisticsData ? JSON.parse(statisticsData) : libraryData.statistics
}
