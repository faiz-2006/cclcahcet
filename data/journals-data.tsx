
  // Journals
  // ===================================================
  // Print and electronic journals
  export type Journal = {
    name: string;
    type: "National" | "International";
    department: string;
  };
  
  export const journalData: Journal[] = [
    // National Journals - Artificial Intelligence
    {
      name: "JOURNAL OF INTELLIGENT COMPUTING AND APPLICATION(JICA)",
      type: "National",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "JOURNAL OF INTELLIGENT SYSTEM RESEARCH(JISR)",
      type: "National",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "JOURNAL OF INTELLIGENT LEARNING SYSTEMS AND APPLICATIONS",
      type: "National",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "JNL. OF INNOVATIONS IN DATA SCIENCE AND BIG DATA MANAGEMNET",
      type: "National",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "RESEARCH & REVIEW:MACHINE LEARNING AND CLOUD COMPUTING",
      type: "National",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "RECENTS TRENDS IN ARTIFICIAL INTELLIGENCE & ITS APPLICATIONS",
      type: "National",
      department: "ARTIFICIAL INTELLIGENCE"
    },
  
    // National Journals - Civil Engineering
    {
      name: "JOURNAL OF CIVIL  AND CONSTRUCTION ENGINEERING",
      type: "National",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "JOURNAL OF CONSTRUCTION AND BUILDING MATERIALS ENGINEERING",
      type: "National",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "JOURNAL OF GEOTECHNICAL STUDIES",
      type: "National",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "JOURNAL OF STRUCTURAL TECHNOLOGY",
      type: "National",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "JOURNAL OF ENVIRONMENTAL ENGINEERING STUDIES",
      type: "National",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "JOURNAL OF TRANSPORTATION SYSTEMS",
      type: "National",
      department: "CIVIL ENGINEERING"
    },
  
    // National Journals - Computer Science Engineering
    {
      name: "JOURNAL OF DATA MINING AND MANAGEMENT",
      type: "National",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "JOURNAL OF COMPUTER SCIENCE AND APPLICATIONS",
      type: "National",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "JOURNAL OF INFORMATION TECHNOLOGY AND SCIENCES",
      type: "National",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "JOURNAL OF COMPUTER SCIENCE ENGINEERING AND SOFTWARE TESTING",
      type: "National",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "JOURNAL OF COMPUTER BASED PARALLEL PROGRAMMING",
      type: "National",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "JOURNAL OF SOFTWARE ENGINEERING AND TECHNOLOGY",
      type: "National",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
  
    // National Journals - Electrical and Electronics Engineering
    {
      name: "JOURNAL OF CONTROL AND INSTRUMENTATION ENGINEERING",
      type: "National",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "JOURNAL OF ADVANCES IN ELECTRICAL ENGG. AND DEVICES",
      type: "National",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "JOURNAL OF CONTROLLER AND CONVERTERS",
      type: "National",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "JOURNAL OF ELECTRICAL AND POWER SYSTEM ENGINEERING",
      type: "National",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "JOURNAL OF DIGITAL INTEGRATED CIRCUITS IN ELECTRICAL DEVICES",
      type: "National",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "IEEMA JOURNALS",
      type: "National",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
  
    // National Journals - Electronics and Communication Engineering
    {
      name: "JOURNAL OF ELECTRONICS AND TELECOMMUNICATION SYSTEM ENGINEERING",
      type: "National",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "JOURNAL OF MICROPROCESSOR AND MICROCONTROLLER RESEARCH",
      type: "National",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "JOURNAL OF ANALOG AND DIGITAL DEVICES",
      type: "National",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "IETE – JOURNAL OF EDUCATION",
      type: "National",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "IETE – JOURNAL OF RESEARCH",
      type: "National",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "IETE – JOURNAL OF TECHNICAL REVIEW",
      type: "National",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
  
    // National Journals - Information Technology
    {
      name: "JOURNAL OF NETWORK SECURITY COMPUTER NETWORKS",
      type: "National",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "JOURNAL OF WEB DEVELOPMENT AND WEB DESIGNING",
      type: "National",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "JOURNAL OF ANDRIOD AND ISO APPLICATIONS AND TESTING",
      type: "National",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "CURRENT DEVELOPMENT IN ARTIFICIAL INTELLIGENCE",
      type: "National",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "JOURNAL OF IMAGE PROCESSING AND ARTIFICIAL INTELLIGENCE",
      type: "National",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "INTERNATIONAL JOURNALOF DATA MINING AND DATA WAREHOUSE",
      type: "National",
      department: "INFORMATION TECHNOLOGY"
    },
  
    // National Journals - Mechanical Engineering
    {
      name: "JOURNAL OF MECHANICAL AND MECHANICS ENGINEERING",
      type: "National",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "INDIAN JOURNAL OF ENGINEERING AND MATERIAL SCIENCE",
      type: "National",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "JOURNAL OF AUTOMATION AND AUTOMOBILE ENGINEERING",
      type: "National",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "JOURNAL OF THERMAL ENERGY SYSTEMS",
      type: "National",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "JOURNALS OF MECHATRONICS MACHINE DESIGN AND MANUFACTURING",
      type: "National",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "JOURNAL OF METALLURGICAL ENGINEERING",
      type: "National",
      department: "MECHANICAL ENGINEERING"
    },
  
    // National Journals - Master of Computer Application
    {
      name: "JOURNAL OF CYBERNETICS AND SYSTEMS",
      type: "National",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "JOURNAL OF ANALYSIS AND COMPUTATION (JCS)",
      type: "National",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "JOURNAL OF HYBRID COMPUTATIONAL RESEARCH",
      type: "National",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "JOURNAL OF IoT SECURITY AND SMART TECHNOLOGIES",
      type: "National",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "JOURNAL OF NEURAL COMPUTING SYSTEMS",
      type: "National",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "JOURNAL OF SOFTWQRE PROJECT MANAGEMENT AND QUALITY ASSURANCE",
      type: "National",
      department: "MASTER OF COMPUTER APPLICATION"
    },
  
    // National Journals - Master of Business Administration
    {
      name: "INDIAN JOURNAL OF FINANCE",
      type: "National",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "INDIAN JOURNAL OF MARKETING",
      type: "National",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "INDIAN JOURNAL OF MANAGEMENT",
      type: "National",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "IUP – OPERATIONS MANAGEMENT",
      type: "National",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "JOURNAL OF WOMEN ENTREPRENEURSHIP AND BUSINESS MANAGEMENT",
      type: "National",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "JOURNAL OF ECONOMICS STUDIES AND FINANCIAL RESEARCH",
      type: "National",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
  
    // National Journals - Master of Applied Electronics
    {
      name: "JOURNAL OF ELECTRONIC DESIGN AND TECHNOLOGY",
      type: "National",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "ADVANCE RESEARCH IN ANALOG AND DIGITAL COMMUNICATION",
      type: "National",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "ADVANCE RESEARCH IN COMMUNICATION ENGINEERING AND ITS INNOVATION",
      type: "National",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "JOURNAL OF RF AND MICROWAVE COMMUNICATION TECHNOLOGIES",
      type: "National",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "JOURNAL OF VLSI DESIGN AND SIGNAL PROCESSING",
      type: "National",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "JOURNAL OF ALTERNATIVE AND RENEWABLE ENERGY SOURCES",
      type: "National",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
  
    // International Journals - Artificial Intelligence
    {
      name: "INTERNATIONAL JOURNAL OF ARTIFICIAL INTELLIGENCE AND COMPUTATIONAL RESEARCH (IJAICR)",
      type: "International",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "INTERNATIONAL JOURNAL OF APPLIED ARTIFICIAL INTELLIGENCE IN ENGINEERING SYSTEM",
      type: "International",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "INTERNATIONAL JOURNAL OF INTELLIGENT INFORMATION PROCESSING",
      type: "International",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "INTERNATIONAL JOURNAL OF INTELLIGENT SYSTEMS SCIENCE AND TECHNOLOGY",
      type: "International",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "INTERNATIONAL JOURNAL OF HYBRID COMPUTATIONAL INTELLIGENCE",
      type: "International",
      department: "ARTIFICIAL INTELLIGENCE"
    },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTATIONAL INTELLIGENCE THEORY AND PRACTICE",
      type: "International",
      department: "ARTIFICIAL INTELLIGENCE"
    },
  
    // International Journals - Civil Engineering
    {
      name: "INTERNATIONAL JOURNAL OF GEOTECHNIQUES AND ENVIRONMENT",
      type: "International",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF MECHANICS STRUCTURAL",
      type: "International",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF CIVIL ENGINEERING AND MATERIALS AND CONSTRUCTION",
      type: "International",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF BUILDING CONSTRUCTION AND ARCHITECTURE PLANNING",
      type: "International",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF MODERN DEVELOPMENT IN CIVIL ENGINEERING",
      type: "International",
      department: "CIVIL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF ADVANCED CIVIL ENGINEERING RESEARCH",
      type: "International",
      department: "CIVIL ENGINEERING"
    },
  
    // International Journals - Computer Science Engineering
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTER ENGINEERING",
      type: "International",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTER SCIENCE AND SYSTEM ANALYSIS",
      type: "International",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTER SCIENCE AND SOFTWARE TECHNOLOGY",
      type: "International",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTER SCIENCE AND ENGINEERING SYSTEMS(IJCSES)",
      type: "International",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF SOFTWARE ENGINEERING",
      type: "International",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTER AND INTERNET SECURITY",
      type: "International",
      department: "COMPUTER SCIENCE ENGINEERING"
    },
  
    // International Journals - Electrical and Electronics Engineering
    {
      name: "INTERNATIONAL JOURNAL OF ELECTRIC POWER SYSTEM AND ENERGY CONVERSION",
      type: "International",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF ELECTRICAL ENERGY SYSTEM",
      type: "International",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF ENERGY SYSTEMS,COMPUTER AND CONTROL",
      type: "International",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF INDUSTRIAL ENGINEERING",
      type: "International",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF POWER SYSTEMS AND POWER ELECTRONICS",
      type: "International",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF INTEGRATED ENERGY SYSTEMS",
      type: "International",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING"
    },
  
    // International Journals - Electronics and Communication Engineering
    {
      name: "INTERNATIONAL JOURNAL OF ANALOG CIRCUITS, VLSI AND BIOELECTRONICS",
      type: "International",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF WIRELESS NETWORKS AND COMMUNICATION",
      type: "International",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF ELECTRONICS AND COMMUNICATION ENGINEERING",
      type: "International",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF NETWORK AND MOBILE TECHNOLOGIES",
      type: "International",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF MICROCIRCUITS AND ELECTRONICS",
      type: "International",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF MICRO AND NANO ELECTRONICS, CIRCUITS AND SYSTEMS",
      type: "International",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
  
    // International Journals - Information Technology
    {
      name: "INTERNATIONAL JOURNAL OF INFORMATION TECHNOLOGY AND HIGH PERFORMANCE COMPUTING",
      type: "International",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "INTERNATIONAL JOURNAL OF INFORMATION TECHNOLOGY AND DATABASE SYSTEMS",
      type: "International",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "INTERNATIONAL JOURNAL OF ADVANCES IN SOFTWARE ENGINEERING",
      type: "International",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "INTERNATIONAL JOURNAL OF REAL TIME SYSTEMS",
      type: "International",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "INTERNATIONAL JOURNAL OF INFORMATION AND COMMUNICATION TECHNOLOGIES",
      type: "International",
      department: "INFORMATION TECHNOLOGY"
    },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTER SICENCE AND INFORMATION TECHNOLOGY",
      type: "International",
      department: "INFORMATION TECHNOLOGY"
    },
  
    // International Journals - Mechanical Engineering
    {
      name: "INTERNATIONAL JOURNAL OF MECHANICAL ENGINEERING AND MATERIALS SCIENCES",
      type: "International",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF PRODUCTION AND QUALITY ENGINEERING",
      type: "International",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF MACHINES INTELLIGENCE AND APPLICATIONS",
      type: "International",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF PRODUCT DESIGN",
      type: "International",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF DIGITAL MANUFACTURING",
      type: "International",
      department: "MECHANICAL ENGINEERING"
    },
    {
      name: "INTERNATIONAL JOURNAL OF NANOMATERIALS AND TECHNOLOGY(IJONMAT)",
      type: "International",
      department: "MECHANICAL ENGINEERING"
    },
  
    // International Journals - Master of Computer Application
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTATIONAL INTELLIGENCE RESEARCH AND APPLICATIONS",
      type: "International",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF SOFTWARE ENGINEERING AND COMPUTING",
      type: "International",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF WIRELESS COMMUNICATIONS AND NETWORKING",
      type: "International",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTING AND APPLICATIONS",
      type: "International",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF DATA ANALYSIS AND INFORMATION SYSTEMS",
      type: "International",
      department: "MASTER OF COMPUTER APPLICATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF ADVANCES IN EMBEDDED SYSTEMS RESEARCH",
      type: "International",
      department: "MASTER OF COMPUTER APPLICATION"
    },
  
    // International Journals - Master of Business Administration
    {
      name: "INTERNATIONAL JOURNAL OF HUMAN RESOURCE AND BUSINESS MANAGEMENT",
      type: "International",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF ENTERPRENEURSHIP AND SMALL BUSINESS DEVELOPMENT",
      type: "International",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF MARKET RESEARCH AND MARKET TECHNOLOGY",
      type: "International",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF BUSINESS INTELLIGENCE AND MANAGEMENT",
      type: "International",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF BUSINESS MANAGEMENT ECONOMICS AND INFORMATION TECHNOLOGY",
      type: "International",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
    {
      name: "INTERNATIONAL JOURNAL OF FINANCIAL MARKETS",
      type: "International",
      department: "MASTER OF BUSINESS ADMINISTRATION"
    },
  
    // International Journals - Master of Applied Electronics
    {
      name: "INTERNATIONAL JOURNAL OF MULTIMEDIA, COMPUTER VISION AND MACHINE LEARNING",
      type: "International",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "INTERNATIONAL JOURNAL OF ADVANCES IN CIRCUITS AND SYSTEMS",
      type: "International",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTATIONAL INTELLIGENCE IN CONTROL",
      type: "International",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "INTERNATIONAL JOURNAL OF HIGHLY RELIABLE ELECTRONIC SYSTEMS",
      type: "International",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "INTERNATIONAL JOURNAL OF MICRO AND NANO SYSTEMS",
      type: "International",
      department: "MASTER OF APPLIED ELECTRONICS"
    },
    {
      name: "INTERNATIONAL JOURNAL OF INDUSTRIAL ELECTRONICS AND CONTROL",
      type: "International",
      department: "MASTER OF APPLIED ELECTRONICS"
    }
  ];
  
  export const departments = [
    "ARTIFICIAL INTELLIGENCE",
    "CIVIL ENGINEERING",
    "COMPUTER SCIENCE ENGINEERING",
    "ELECTRICAL AND ELECTRONICS ENGINEERING",
    "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "INFORMATION TECHNOLOGY",
    "MECHANICAL ENGINEERING",
    "MASTER OF COMPUTER APPLICATION",
    "MASTER OF BUSINESS ADMINISTRATION",
    "MASTER OF APPLIED ELECTRONICS"
  ];
  