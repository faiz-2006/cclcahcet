// data/library-data.tsx

// Define the type for syllabi data
export interface AcademicYear {
    year: string;
    pdfLink: string;
  }
  
  export interface Department {
    department: string;
    academicYears: AcademicYear[];
  }
  //TODO: INTEGRATE THE ACTUAL DATA
  export const undergraduateSyllabi: Department[] = [
    {
      department: "CSE",
      academicYears: [
        {
          year: "2021",
          pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.E.CSE.pdf"
        },
        
      ]
    },
    {
      department: "IT",
      academicYears: [
        {
          year: "2021",
          pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.Tech.IT.pdf"
        },
        
      ]
    },
    {
      department: "AIDS",
      academicYears: [
        {
          year: "2021",
          pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.Tech.AIDS.pdf"
        },
        
      ]
    },
    {
      department: "Civil",
      academicYears: [
        {
          year: "2021",
          pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/Civil/BE.Civil.pdf"
        },
        
      ]
    },
    {
      department: "Mechanical",
      academicYears: [
        {
          year: "2021",
          pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/Mech/B.E.Mech.pdf"
        },
        
      ]
    },
    {
      department: "ECE",
      academicYears: [
        {
          year: "2021",
          pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.E.ECE.pdf"
        },
        
      ]
    },
    {
      department: "EEE",
      academicYears: [
        {
          year: "2021",
          pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/EEE/B.E.%20EEE.pdf"
        },
       
      ]
    }
  ];
  
  export const postgraduateSyllabi: Department[] = [
    {
      department: "MCA",
      academicYears: [
        {
          year: "2023-2024",
          pdfLink: "https://example.com/mca-syllabus-2023-2024.pdf"
        },
        {
          year: "2022-2023",
          pdfLink: "https://example.com/mca-syllabus-2022-2023.pdf"
        }
      ]
    },
    {
      department: "MBA",
      academicYears: [
        {
          year: "2023-2024",
          pdfLink: "https://example.com/mba-syllabus-2023-2024.pdf"
        },
        {
          year: "2022-2023",
          pdfLink: "https://example.com/mba-syllabus-2022-2023.pdf"
        }
      ]
    }
  ];