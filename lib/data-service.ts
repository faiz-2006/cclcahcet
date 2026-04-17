// Data Service - Retrieves data from server API, falls back to defaults
import { libraryData } from "@/data/library-data"
import { defaultAdminData } from "@/lib/default-admin-data"

// ===================================================
// Server fetch helper
// ===================================================
async function fetchFromServer(key: string): Promise<any | null> {
  try {
    const res = await fetch(`/api/admin-data?key=${key}`, { cache: "no-store" })
    if (res.ok) {
      const json = await res.json()
      return json.data ?? null
    }
  } catch (e) {
    // API not available (SSR or network issue), return null
  }
  return null
}

// ===================================================
// Save helper - saves to server
// ===================================================
export async function saveToServer(key: string, data: any): Promise<boolean> {
  try {
    const res = await fetch("/api/admin-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, data }),
    })
    return res.ok
  } catch (e) {
    console.error("Failed to save to server:", e)
    return false
  }
}

// ===================================================
// Async getters - fetch from server API
// ===================================================

export async function getStatistics() {
  const data = await fetchFromServer("statistics")
  return data ?? defaultAdminData.statistics
}

export async function getAnnouncements() {
  const data = await fetchFromServer("announcements")
  return data ?? defaultAdminData.announcements
}

export async function getLibraryHours() {
  const data = await fetchFromServer("libraryHours")
  return data ?? defaultAdminData.libraryHours
}

export async function getSiteInfo() {
  const data = await fetchFromServer("siteSettings")
  return data
    ? { ...defaultAdminData.siteSettings, ...data }
    : defaultAdminData.siteSettings
}

export async function getAboutData() {
  const data = await fetchFromServer("aboutData")
  return data ?? defaultAdminData.aboutData
}

export async function getRulesData() {
  const data = await fetchFromServer("rulesData")
  return data ?? defaultAdminData.rulesData
}

export async function getPolicyData() {
  const data = await fetchFromServer("policyData")
  return data ?? defaultAdminData.policyData
}

export async function getCommitteeData() {
  const data = await fetchFromServer("committeeData")
  return data ?? defaultAdminData.committeeData
}

export async function getGalleryData() {
  const data = await fetchFromServer("galleryData")
  return data ?? defaultAdminData.galleryData
}

export async function getContactData() {
  const data = await fetchFromServer("contactData")
  return data ?? defaultAdminData.contactData
}

export async function getEResourcesData() {
  const data = await fetchFromServer("eResourcesData")
  if (data) return data
  return defaultAdminData.eResourcesData
}

export async function getJournalsData() {
  const data = await fetchFromServer("journalsData")
  return data ?? defaultAdminData.journalsData
}

export async function getSyllabiData() {
  const data = await fetchFromServer("syllabiData")
  return data ?? defaultAdminData.syllabiData
}

// ===================================================
// Legacy sync getter (kept for backwards compat)
// ===================================================
export function getLibraryData() {
  return libraryData
}
