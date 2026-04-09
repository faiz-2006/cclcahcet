// Data Service - Retrieves data from server API, falls back to defaults
import { libraryData } from "@/data/library-data"
import { journalData } from "@/data/journals-data"
import { undergraduateSyllabi, postgraduateSyllabi } from "@/data/syllabi-data"

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
  return data ?? libraryData.statistics
}

export async function getAnnouncements() {
  const data = await fetchFromServer("announcements")
  return data ?? libraryData.announcements
}

export async function getLibraryHours() {
  const data = await fetchFromServer("libraryHours")
  return data ?? libraryData.hours
}

export async function getSiteInfo() {
  const data = await fetchFromServer("siteSettings")
  return data
    ? { ...libraryData.siteInfo, ...data }
    : libraryData.siteInfo
}

export async function getAboutData() {
  const data = await fetchFromServer("aboutData")
  return data ?? {
    history: libraryData.about.history,
    activities: libraryData.about.activities,
    staff: libraryData.about.staff,
    facilities: libraryData.about.facilities,
  }
}

export async function getRulesData() {
  const data = await fetchFromServer("rulesData")
  return data ?? {
    general: libraryData.rules.general,
    borrowing: libraryData.rules.borrowing,
    bookbank: libraryData.rules.bookbank,
    practice: libraryData.rules.practice,
  }
}

export async function getPolicyData() {
  const data = await fetchFromServer("policyData")
  return data ?? {
    vision: libraryData.policy.vision,
    mission: libraryData.policy.mission,
    objectives: libraryData.policy.objectives,
    generalpolicy: libraryData.policy.generalpolicy,
    finepolicy: libraryData.policy.finepolicy,
  }
}

export async function getCommitteeData() {
  const data = await fetchFromServer("committeeData")
  return data ?? {
    members: libraryData.members,
    functions: libraryData.functions,
    aboutCommittee: libraryData.aboutCommittee,
  }
}

export async function getGalleryData() {
  const data = await fetchFromServer("galleryData")
  return data ?? libraryData.gallery.all
}

export async function getContactData() {
  const defaults = {
    address: "C. Abdul Hakeem College of Engineering & Technology, Melvisharam - 632 509, Ranipet Dt., Tamil Nadu, India",
    phone: "+91-4172-266850",
    email: "library@cahcet.edu.in",
    website: "https://cahcet.edu.in",
    mapEmbed: "",
    workingHours: "Monday - Saturday: 8:00 AM - 8:00 PM",
    librarian: {
      name: "A. Fahim Sheriff",
      designation: "Librarian",
      email: "librarian@cahcet.edu.in",
      phone: "+91-4172-267387",
    },
  }
  const data = await fetchFromServer("contactData")
  return data ?? defaults
}

export async function getEResourcesData() {
  const data = await fetchFromServer("eResourcesData")
  if (data) return data

  const resources: any[] = []
  if (libraryData.eResources.delnet) {
    resources.push({ name: "DELNET", ...libraryData.eResources.delnet })
  }
  return {
    resources,
    accessInstructions: libraryData.eResources.accessInstructions,
  }
}

export async function getJournalsData() {
  const data = await fetchFromServer("journalsData")
  return data ?? journalData
}

export async function getSyllabiData() {
  const data = await fetchFromServer("syllabiData")
  return data ?? { undergraduate: undergraduateSyllabi, postgraduate: postgraduateSyllabi }
}

// ===================================================
// Legacy sync getter (kept for backwards compat)
// ===================================================
export function getLibraryData() {
  return libraryData
}
