"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Save, RotateCcw, Plus, Trash2, GraduationCap, Edit2, X, Check, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { undergraduateSyllabi, postgraduateSyllabi, Department, AcademicYear } from "@/data/syllabi-data"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface SyllabiData {
  undergraduate: Department[]
  postgraduate: Department[]
}

export default function SyllabiPage() {
  const { toast } = useToast()
  const [syllabiData, setSyllabiData] = useState<SyllabiData>({
    undergraduate: [],
    postgraduate: []
  })
  
  // Form states
  const [activeTab, setActiveTab] = useState<"undergraduate" | "postgraduate">("undergraduate")
  const [selectedDeptIndex, setSelectedDeptIndex] = useState<number | null>(null)
  const [newDeptName, setNewDeptName] = useState("")
  const [newYear, setNewYear] = useState("")
  const [newPdfLink, setNewPdfLink] = useState("")
  const [editingYearIndex, setEditingYearIndex] = useState<number | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("syllabiData")
    if (savedData) {
      setSyllabiData(JSON.parse(savedData))
    } else {
      setSyllabiData({
        undergraduate: undergraduateSyllabi,
        postgraduate: postgraduateSyllabi
      })
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("syllabiData", JSON.stringify(syllabiData))
    toast({
      title: "Syllabi Saved",
      description: "All syllabi data has been saved successfully.",
    })
  }

  const handleReset = () => {
    const defaults = {
      undergraduate: undergraduateSyllabi,
      postgraduate: postgraduateSyllabi
    }
    setSyllabiData(defaults)
    localStorage.setItem("syllabiData", JSON.stringify(defaults))
    toast({
      title: "Syllabi Reset",
      description: "Syllabi have been reset to defaults.",
    })
  }

  // Add new department
  const handleAddDepartment = () => {
    if (!newDeptName.trim()) {
      toast({ title: "Error", description: "Please enter a department name.", variant: "destructive" })
      return
    }
    
    const newDept: Department = {
      department: newDeptName,
      academicYears: []
    }
    
    setSyllabiData({
      ...syllabiData,
      [activeTab]: [...syllabiData[activeTab], newDept]
    })
    setNewDeptName("")
    toast({ title: "Success", description: "Department added successfully." })
  }

  // Delete department
  const handleDeleteDepartment = (index: number) => {
    setSyllabiData({
      ...syllabiData,
      [activeTab]: syllabiData[activeTab].filter((_, i) => i !== index)
    })
  }

  // Add academic year to department
  const handleAddYear = (deptIndex: number) => {
    if (!newYear.trim() || !newPdfLink.trim()) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" })
      return
    }
    
    const updated = [...syllabiData[activeTab]]
    
    if (editingYearIndex !== null) {
      updated[deptIndex].academicYears[editingYearIndex] = {
        year: newYear,
        pdfLink: newPdfLink
      }
      setEditingYearIndex(null)
    } else {
      updated[deptIndex].academicYears.push({
        year: newYear,
        pdfLink: newPdfLink
      })
    }
    
    setSyllabiData({ ...syllabiData, [activeTab]: updated })
    setNewYear("")
    setNewPdfLink("")
    setSelectedDeptIndex(null)
  }

  // Edit academic year
  const handleEditYear = (deptIndex: number, yearIndex: number) => {
    const year = syllabiData[activeTab][deptIndex].academicYears[yearIndex]
    setSelectedDeptIndex(deptIndex)
    setNewYear(year.year)
    setNewPdfLink(year.pdfLink)
    setEditingYearIndex(yearIndex)
  }

  // Delete academic year
  const handleDeleteYear = (deptIndex: number, yearIndex: number) => {
    const updated = [...syllabiData[activeTab]]
    updated[deptIndex].academicYears = updated[deptIndex].academicYears.filter((_, i) => i !== yearIndex)
    setSyllabiData({ ...syllabiData, [activeTab]: updated })
  }

  const cancelEdit = () => {
    setSelectedDeptIndex(null)
    setNewYear("")
    setNewPdfLink("")
    setEditingYearIndex(null)
  }

  const SyllabiList = ({ type }: { type: "undergraduate" | "postgraduate" }) => (
    <div className="space-y-4">
      {/* Add Department */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Add New Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              placeholder="Enter department name (e.g., CSE, IT, ECE)"
              className="flex-1"
            />
            <Button onClick={handleAddDepartment}>
              <Plus className="mr-2 h-4 w-4" /> Add Department
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Departments List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {type === "undergraduate" ? "Undergraduate" : "Postgraduate"} Syllabi 
            ({syllabiData[type].length} departments)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {syllabiData[type].length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {syllabiData[type].map((dept, deptIndex) => (
                <AccordionItem key={deptIndex} value={`dept-${deptIndex}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-semibold">{dept.department}</span>
                      <span className="text-sm text-muted-foreground">
                        {dept.academicYears.length} syllabus(es)
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {/* Add Year Form */}
                      {(selectedDeptIndex === deptIndex || selectedDeptIndex === null) && (
                        <div className="p-4 border rounded-lg bg-muted/50">
                          <h4 className="font-medium mb-3">
                            {editingYearIndex !== null ? "Edit" : "Add"} Academic Year
                          </h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Year</Label>
                              <Input
                                value={newYear}
                                onChange={(e) => setNewYear(e.target.value)}
                                placeholder="e.g., 2021 or 2023-2024"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>PDF Link</Label>
                              <Input
                                value={newPdfLink}
                                onChange={(e) => setNewPdfLink(e.target.value)}
                                placeholder="https://example.com/syllabus.pdf"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" onClick={() => handleAddYear(deptIndex)}>
                              {editingYearIndex !== null ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                              {editingYearIndex !== null ? "Update" : "Add"} Year
                            </Button>
                            {editingYearIndex !== null && (
                              <Button size="sm" variant="outline" onClick={cancelEdit}>
                                <X className="mr-2 h-4 w-4" /> Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Years List */}
                      {dept.academicYears.length > 0 ? (
                        <div className="space-y-2">
                          {dept.academicYears.map((year, yearIndex) => (
                            <div key={yearIndex} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="font-medium">{year.year}</span>
                                <a 
                                  href={year.pdfLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline flex items-center gap-1"
                                >
                                  View PDF <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  onClick={() => handleEditYear(deptIndex, yearIndex)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="icon" className="text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Syllabus?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will remove the {year.year} syllabus for {dept.department}.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteYear(deptIndex, yearIndex)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No syllabi added for this department yet.
                        </p>
                      )}

                      {/* Delete Department */}
                      <div className="flex justify-end pt-2 border-t">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Department
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Department?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove {dept.department} and all its syllabi. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteDepartment(deptIndex)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No departments added yet. Add a department to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Syllabi</h1>
        <p className="text-muted-foreground">
          Manage syllabus links for undergraduate and postgraduate programs.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "undergraduate" | "postgraduate")} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="undergraduate">Undergraduate (UG)</TabsTrigger>
          <TabsTrigger value="postgraduate">Postgraduate (PG)</TabsTrigger>
        </TabsList>

        <TabsContent value="undergraduate">
          <SyllabiList type="undergraduate" />
        </TabsContent>

        <TabsContent value="postgraduate">
          <SyllabiList type="postgraduate" />
        </TabsContent>
      </Tabs>

      {/* Save/Reset Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset to Defaults
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Syllabi?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all syllabi to the original defaults. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
