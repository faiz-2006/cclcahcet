"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { undergraduateSyllabi, postgraduateSyllabi, Department } from "@/data/syllabi-data"
import { Button } from "@/components/ui/button"
import { FileDown, Search, Filter, BookOpen, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

export default function SyllabiPage() {
  const [selectedLevel, setSelectedLevel] = useState<"undergraduate" | "postgraduate">("undergraduate")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleDownload = (pdfLink: string, departmentName: string) => {
    toast({
      title: "Syllabus Downloaded",
      description: `${departmentName} syllabus has been downloaded.`,
    })
    window.open(pdfLink, "_blank")
  }

  const syllabi = selectedLevel === "undergraduate" ? undergraduateSyllabi : postgraduateSyllabi

  const filteredDepartments = syllabi.filter(
    (dept) => !searchQuery || dept.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const resetFilters = () => {
    setSelectedDepartment("")
    setSelectedYear("")
    setSearchQuery("")
  }

  // Color themes based on level
  const getColorTheme = () => {
    return selectedLevel === "undergraduate"
      ? {
          bg: "from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900",
          icon: "bg-teal-500/10 text-teal-500",
          badge: "bg-teal-500/10 text-teal-500 hover:bg-teal-500/20",
          tab: "data-[state=active]:bg-teal-500 data-[state=active]:text-white",
        }
      : {
          bg: "from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900",
          icon: "bg-violet-500/10 text-violet-500",
          badge: "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20",
          tab: "data-[state=active]:bg-violet-500 data-[state=active]:text-white",
        }
  }

  const colorTheme = getColorTheme()

  return (
    <div className="space-y-8 w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-4"
      >
        <h1 className="text-3xl font-bold tracking-tight">Course Syllabi</h1>
        <p className="text-muted-foreground">Access syllabi for all courses offered by the college</p>
      </motion.div>

      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className={`bg-gradient-to-r ${colorTheme.bg}`}>
          <div className="flex items-center gap-2">
            <Search className={`h-5 w-5 ${selectedLevel === "undergraduate" ? "text-teal-500" : "text-violet-500"}`} />
            <CardTitle>Find Syllabi</CardTitle>
          </div>
          <CardDescription>Search and filter course syllabi by department and year</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search by keyword</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search departments..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="gap-2">
                <Filter className="h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="undergraduate" value={selectedLevel} onValueChange={setSelectedLevel as (value: string) => void} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="undergraduate" className={colorTheme.tab}>
            <GraduationCap className="mr-2 h-4 w-4" />
            Undergraduate
          </TabsTrigger>
          <TabsTrigger value="postgraduate" className={colorTheme.tab}>
            <BookOpen className="mr-2 h-4 w-4" />
            Postgraduate
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <TabsContent value={selectedLevel} className="mt-0 w-full">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDepartments.map((department, index) => (
                  <motion.div
                    key={department.department}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="w-full"
                  >
                    <Card
                      className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-none shadow-md ${selectedDepartment === department.department ? "ring-2 ring-primary" : ""}`}
                    >
                      <CardHeader className={`bg-gradient-to-r ${colorTheme.bg} pb-3`}>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <div className={`h-8 w-8 rounded-full ${colorTheme.icon} flex items-center justify-center`}>
                            {selectedLevel === "undergraduate" ? (
                              <BookOpen className="h-4 w-4" />
                            ) : (
                              <GraduationCap className="h-4 w-4" />
                            )}
                          </div>
                          {department.department}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Select Year</label>
                            <Select
                              value={selectedDepartment === department.department ? selectedYear : ""}
                              onValueChange={(value) => {
                                setSelectedDepartment(department.department)
                                setSelectedYear(value)
                              }}
                            >
                              <SelectTrigger className="mt-1.5">
                                <SelectValue placeholder="Choose year" />
                              </SelectTrigger>
                              <SelectContent>
                                {department.academicYears.map((year) => (
                                  <SelectItem key={year.year} value={year.year}>
                                    {year.year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {selectedDepartment === department.department && selectedYear && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 text-center"
                            >
                              <Button
                                onClick={() => {
                                  const selectedYearData = department.academicYears.find(y => y.year === selectedYear)
                                  if (selectedYearData) {
                                    handleDownload(selectedYearData.pdfLink, department.department)
                                  }
                                }}
                                className="w-full"
                              >
                                <FileDown className="mr-2 h-4 w-4" />
                                Download {department.department} Syllabus
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <CardTitle>Syllabus Download Instructions</CardTitle>
          <CardDescription>How to access and use course syllabi</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ol className="space-y-3 list-decimal pl-5">
            <li>Select your program level (Undergraduate or Postgraduate)</li>
            <li>Choose your department from the available options</li>
            <li>Select the academic year of study</li>
            <li>Click the "Download" button for the department syllabus</li>
            <li>The PDF will open in a new tab or download automatically</li>
            <li>For any issues accessing syllabi, contact the library staff</li>
          </ol>
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/50 rounded-lg">
            <p className="text-sm">
              New syllabi for the upcoming academic year will be available by July 15th. Please check back for updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}