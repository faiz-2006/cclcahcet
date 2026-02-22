// ===================================================
// LIBRARY DATA FILE
// ===================================================
// This file contains all the data for the library website.
// Edit this file to update content across the entire site.
// ===================================================

import {
  BookOpen,
  Info,
  FileText,
  BookCopy,
  GalleryVerticalEnd,
  Search,
  BookMarked,
  ScrollText,
  Newspaper,
  Contact,
  Users
} from "lucide-react"

// Site Information
// ===================================================
// Basic information about the site and user

export const libraryData = {
  siteInfo: {
    name: "CAHCET Central Library",
    tagline: "Discover Knowledge, Explore Ideas",
    description: "A comprehensive library management system for college",
    logo: "/logo-ccl.png", // Path to logo image
  },

  // Navigation
  // ===================================================
  // Main menu items for the sidebar
  navigation: {
    mainMenu: [
      {
        title: "Home",
        icon: BookOpen,
        href: "/",
      },
      {
        title: "About",
        icon: Info,
        href: "/about",
      },
      {
        title: "Rules & Regulations",
        icon: ScrollText,
        href: "/rules",
      },
      {
        title: "Library Policy",
        icon: FileText,
        href: "/policy",
      },
      {
        title: "Committee",
        icon: Users,
        href: "/committee",
      },
      {
        title: "Syllabi",
        icon: FileText,
        href: "/syllabi",
      },
      {
        title: "E-Resources",
        icon: BookCopy,
        href: "/e-resources",
      },
      {
        title: "Gallery",
        icon: GalleryVerticalEnd,
        href: "/gallery",
      },
      {
        title: "OPAC",
        icon: Search,
        href: "/opac",
      },
      {
        title: "E-Books",
        icon: BookMarked,
        href: "/e-books",
      },
      {
        title: "Journals",
        icon: Newspaper,
        href: "/journals",
      },
      {
        title: "Contact Us",
        icon: Contact,
        href: "/contact",
      },
    ],
  },

  // Statistics
  // ===================================================
  // Key statistics displayed on the homepage and marquee
  statistics: {
    totalBooks: 39402,
    totalJournals: 120,
    totalEBooks: 4000,
    dailyVisitors: 350,
    activeMembers: 1200
  },

  // Announcements
  // ===================================================
  // Latest news and announcements
  announcements: [
    {
      title: "Library Timings Extended During Exams",
      content: "The library will remain open until 10 PM during the examination period from May 15 to June 10.",
      date: "May 5, 2023",
    },
    {
      title: "New Database Subscription",
      content: "We are pleased to announce that our library has subscribed to the JSTOR Arts & Sciences Collection.",
      date: "April 20, 2023",
    },
    {
      title: "Book Donation Drive",
      content:
        "Donate your gently used books to help expand our collection. Collection boxes are available at the library entrance.",
      date: "March 15, 2023",
    },
  ],

  // Library Hours
  // ===================================================
  // Operating hours
  hours: [
    { day: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
    { day: "Saturday", time: "9:00 AM - 5:00 PM" },
    { day: "Holidays", time: "10:00 AM - 2:00 PM" },
  ],

    // Committee Section
  // ===================================================
  // Information about the library committee

  members: [
    { position: "Principal", role: "President" },
    { position: "Librarian", role: "Secretary" },
    { position: "All HODs of Department", role: "Members" },
    { position: "Student Representatives (04)", role: "Members" }
  ],

  functions: [
    "Formulate the policy, rules, and regulations for the Library.",
    "Supervise and approval for Library Budget and allocation of funds under different expenditure heads.",
    "To advise the Librarian for development proposals.",
    "To take strategic decisions regarding acquisition of Library reading material/ resources.",
    "Make necessary provision for Library building, furniture, equipment, reading material and staff, etc. in the Library.",
    "To ensure good governance of the Library.",
    "Library Committee meeting will be held every three month (Starting and Mid of every semester)."
  ],

  aboutCommittee: {
    description: "The Library Committee plays a crucial role in the development and management of the college library. The committee meets quarterly to discuss policy matters, budget allocation, and strategic decisions regarding library resources. It ensures that the library remains a vibrant center for academic resources and activities that support the educational mission of the institution."
  },

  // About Section
  // ===================================================
  // Information about the library
  about: {
    history: 
    [
      "Our Central Library is a three storey building, built with greenhouse technology, with a total area of 1,588 sq. m. and is located in the heart of the campus. Our Central library incorporated KOHA-Integrated Library Management Software for day-to-day library activities.  Our Central Library is well equipped with modern facilities and resources in the form of books, journals, e-resources (e-books, e-journals, NPTEL Videos), and other learning materials to support the academic and research needs of students and faculty. We follow open access system for the users to access the library resources. ",
  ],
    activities:[
      "Formulate the policy, rules, and regulations for the Library.",
      "Supervise and approval for Library Budget and allocation of funds under different expenditure heads.",
      "To advise the Librarian for development proposals.",
      "To take strategic decisions regarding acquisition of Library reading material/ resources.",
      "Make necessary provision for Library building, furniture, equipment, reading material and staff, etc. in the Library.",
      "To ensure good governance of the Library.",
      "Library committee metting will be held every three month (Starting and Mid of semester).",
    ],
      
    
    staff: [
      { name: "A. Fahim Sheriff", position: "Librarian" },
      { name: "A.S. Abdul Khuddus", position: "Library Assistant" },
      { name: "K.O. Anees Ahamed", position: "Library Assistant" },
      { name: "T.M. Abdullah Basha", position: "Library Assistant" },
    ],
    facilities: [
      {
        name: "Reading Rooms",
        description:
          "Spacious reading areas with seating capacity for 200 students, equipped with comfortable furniture and proper lighting.",
      },
      {
        name: "Digital Library",
        description: "20 computer workstations with internet access and essential software for accessing e-resources.",
      },
      {
        name: "Multimedia Section",
        description: "Audio-visual resources and equipment for multimedia learning.",
      },
      {
        name: "Periodicals/Journals Section",
        description: "Dedicated area for reading current journals and magazines.",
      },
      {
        name: "Reference Section",
        description:
          "Comprehensive collection of reference materials including encyclopedias, dictionaries, handbooks and rare books.",
      },
    ],
  },

  // Rules and Regulations
  // ===================================================
  // Library rules
  rules: {
    general: [
      "All the Student and Staff are member of Library.",
      "Students should examine the books thoroughly on receiving them for any damage and report to Librarian if any such damage is found, otherwise they will be held responsible for the same.",
      "Silence must be Strictly observed inside the Library.",
      "Members should leave their belongiongs at the entrance before entering the library.",
      "In case of loss of a student ID Card, they have to inform immediately to the Librarian and a written request must be made to the principal for the issue of a duplicate ID Card.",
    ],


    borrowing: [
      "Borrowing materials without a valid identity card is prohibited.",
      "Not permitted to use another user Identity Card.",
      "Books borrowed from the library are not transferable",
      "Reference Books are meant for Reading in Library only.",
      "Journals will not be issued to students at any circumstances.",
      "The Librarian may recall any book at any time even if the permitted period has not expired.",
      "The Librarian may refuse to issue books to those who violate these rules.",
      "Reservation for the books in demand can be done in OPAC to a maximum of (3books) at a time.",
      "Renewal of books can be done in OPAC.",
    ],
    
  bookbank: [
    "Book Bank facility is available for SC/ST Students and they can borrow six books in their library account for current semester (6 months).",
  ],

  practice: [
    "Library User Orientation (Information Literacy Programme).",
    "Maintenance of Service Areas.",
    "Access to e-Resources.",
    "Best Library User Award.",
    "User Feedback Practice through Suggestion Register.",
  ],
  },

  // E-Resources
  // ===================================================
  // Electronic resources
  eResources: {
    delnet: {
      ipRange: "No IP Range Needed",
      url: "https://discovery.delnet.in",
      description:
        "DELNET provides access to a wide range of resources including books, journals, theses, and dissertations. Contact the librarian for access instructions.",
    },
    // nlist: {
    //   ipRange: "No IP Range Needed",
    //   url: "https://nlist.inflibnet.ac.in",
    //   description: "N-LIST provides access to e-journals, e-books, and research databases. Contact the librarian for access instructions.",
    // },
    // consortium: {
    //   ipRange: "No IP Range Needed",
    //   url: "https://library.annauniv.edu/auerc/login.php",
    //   description: "AUERC provides access to e-journals, e-books, and research databases. Contact the librarian for access instructions.",
    // },
    accessInstructions: [
      "Connect to the college Wi-Fi network or use computers in the library.",
      "For DELNET and N-LIST, access is restricted to the college IP range.",
      "For remote access, use the VPN service provided by the college IT department.",
      "Log in with your college credentials when prompted.",
      "For assistance, contact the Digital Resources Specialist at the library.",
      "Training sessions on using e-resources are conducted monthly. Check the library notice board for schedules.",
    ],
  },

  // Gallery
  // ===================================================
  // Images of library facilities and events
  gallery: {
    all: [
      // Facilities
      {
        title: "Library Entrance",
        description: "Main entrance to the library",
        imageUrl: "/entrance_lib.jpg",
        category: "Facilities"
      },
      {
        title: "Issue & Return Counters",
        description: "Counters for issuing and returning books",
        imageUrl: "/issue.jpg",
        category: "Facilities"
      },
      {
        title: "Digital Library",
        description: "Access to online e-books and e-resources, with advanced search capabilities",
        imageUrl: "/Digital Library.jpg",
        category: "Facilities"
      },
      {
        title: "OPAC Access",
        description: "Online Public Access Catalog for searching library resources",
        imageUrl: "/opac_lib.jpg",
        category: "Facilities"
      },
      {
        title: "Book Shelf Index",
        description: "Collection of 30,000+ books on various subjects, departments, and languages",
        imageUrl: "/bookshelf_index.jpg",
        category: "Facilities"
      },   
      // Events
      // {
      //   title: "Book Exhibition 2023",
      //   description: "Annual exhibition featuring new acquisitions",
      //   imageUrl: "/placeholder.svg?height=400&width=400&text=Book%20Exhibition",
      //   category: "Events"
      // },
      
      // Collections
      // {
      //   title: "Rare Books Collection",
      //   description: "Valuable and historical books preserved in special conditions",
      //   imageUrl: "/placeholder.svg?height=400&width=400&text=Rare%20Books",
      //   category: "Collections"
      // },
    ]
  },

  

  // Library Policy
  // ===================================================
  // Policies and strategic plans
  policy: {
    vision: [
      "The vision of Central Library is to provide a student - centred learning environment that facilitates transference of information and to cater to the needs of its users by providing well-equipped and functional physical spaces where students can pursue learning independently beyond the classroom and to become a Learning Resource Centre with a state-of-the art library."
    ],
      
    mission:[
      "The mission of Central Library is to provide access to the user community with high quality information resources in all forms.",
      "To develop reading habit in students. ",
      "To use modern tools, techniques for collection, storage and dissemination of information.",
    ],
    circulationpolicy: [
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-primary/10 border-b-2 border-primary/20">
            <th className="p-4 font-semibold text-primary">Category</th>
            <th className="p-4 font-semibold text-primary">No. of Books Issue</th>
            <th className="p-4 font-semibold text-primary">Duration</th>
          </tr>
        </thead>
        <tbody>
          {[
            { category: "Research Scholars", books: "09", duration: "06 Months (Renewal after 03 Months)" },
            { category: "Teaching Staffs", books: "09", duration: "06 Months (Renewal after 03 Months)" },
            { category: "Non-Teaching", books: "03", duration: "03 Months (Renewal after 45 days)" },
            { category: "Lab Assistant", books: "03", duration: "03 Months (Renewal after 45 days)" },
            { category: "Under Graduate Students", books: "06", duration: "01 Month (Renewal after 15 days)" },
            { category: "Post Graduate Students", books: "06", duration: "01 Month (Renewal after 15 days)" }
          ].map((row, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="p-4">{row.category}</td>
              <td className="p-4 text-center">{row.books}</td>
              <td className="p-4">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ],
    generalpolicy:[
      "Students must take care of Library books and must not deface by underlining, writing or drawing or removing any part of them, or in any other way.",
      "Silence should be strictly observed in the library.",
      "Use of cell phones inside the library is prohibited.",
      "All books, files, notebooks etc. must be presented to the attendant at the checkpoint for inspection before leaving the library. There is no exception to this rule.",
      "Misbehavior in the library will lead to cancellation of membership and also lead to serious disciplinary action.",
      "Student should examine the books thoroughlyon receiving them for any damage and report to Librarian if any such damage is found, otherwise they will be held responsible for the same.",
    ],
    finepolicy: [
      "Books can be retained for a maximum duration of one month with a renewal done at an interval of 15 days.",
      "Books can be retained for a maximum duration of six month for staffs with a renewal done at an interval of 3 months.",
      "The Cost of replacement with double amount along with the fine will be charged to the person for loss or damage the library books.",
      "Fine will be charged as given below if the books are not returned on orbefore the due date this is to ensure that all library Users get a fair chance to access the books.",
                     "First Week - Rs. 1/- per day.",
                     "Second Week - Rs. 2/- per day.",
                     "Third Week - Rs. 10/- per day.",
    ],
      
    objectives:
      [
      "To understand the research, teaching and learning needs of its users.",
      "To build collections and create tools to support research, teaching and learning.",
      "To provide access to and promote the discovery and use of local and external information resources.",
      "T0o ensure the preservation of long-lasting availability of library collections and resources.",
      "To bring our Library at par with the International Library Standard and to make it one of the best in the state of Tamilnadu.",
      "To conduct Orientation classes to create awareness among students.",
      "To encourage the User community to utilize E- resources, (E-journals, E-books, NPTEL videos) to its maximum to gain more knowledge of the recent developments in their respective fields.",
      ],
    },

}

