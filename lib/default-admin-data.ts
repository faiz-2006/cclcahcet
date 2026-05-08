import { libraryData } from "@/data/library-data"
import { journalData } from "@/data/journals-data"
import { undergraduateSyllabi, postgraduateSyllabi } from "@/data/syllabi-data"

export const defaultAdminData: Record<string, any> = {
  statistics: libraryData.statistics,
  announcements: libraryData.announcements,
  libraryHours: libraryData.hours,
  siteSettings: libraryData.siteInfo,
  aboutData: {
    history: libraryData.about.history,
    activities: libraryData.about.activities,
    staff: libraryData.about.staff,
    facilities: libraryData.about.facilities,
  },
  rulesData: {
    general: libraryData.rules.general,
    borrowing: libraryData.rules.borrowing,
    bookbank: libraryData.rules.bookbank,
    practice: libraryData.rules.practice,
  },
  policyData: {
    vision: libraryData.policy.vision,
    mission: libraryData.policy.mission,
    objectives: libraryData.policy.objectives,
    generalpolicy: libraryData.policy.generalpolicy,
    finepolicy: libraryData.policy.finepolicy,
  },
  committeeData: {
    members: libraryData.members,
    functions: libraryData.functions,
    aboutCommittee: libraryData.aboutCommittee,
  },
  galleryData: libraryData.gallery.all,
  contactData: {
    address:
      "C. Abdul Hakeem College of Engineering & Technology, Melvisharam - 632 509, Ranipet Dt., Tamil Nadu, India",
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
  },
  eResourcesData: {
    resources: libraryData.eResources.delnet
      ? [{ name: "DELNET", ...libraryData.eResources.delnet }]
      : [],
    accessInstructions: libraryData.eResources.accessInstructions,
  },
  journalsData: journalData,
  syllabiData: { undergraduate: undergraduateSyllabi, postgraduate: postgraduateSyllabi },
}
