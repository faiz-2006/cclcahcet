"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Department } from "@/data/syllabi-data"
import { Check, Edit2, ExternalLink, GraduationCap, Plus, Trash2, X } from "lucide-react"
import { useState } from "react"

interface SyllabiListProps {
  type: "undergraduate" | "postgraduate"
  departments: Department[]
  onAddDepartment: (type: "undergraduate" | "postgraduate", name: string) => void
  onDeleteDepartment: (type: "undergraduate" | "postgraduate", deptIndex: number) => void
  onAddYear: (type: "undergraduate" | "postgraduate", deptIndex: number, year: string, pdfLink: string) => void
  onEditYear: (type: "undergraduate" | "postgraduate", deptIndex: number, yearIndex: number, year: string, pdfLink: string) => void
  onDeleteYear: (type: "undergraduate" | "postgraduate", deptIndex: number, yearIndex: number) => void
}

export function SyllabiList({
  type,
  departments,
  onAddDepartment,
  onDeleteDepartment,
  onAddYear,
  onEditYear,
  onDeleteYear,
}: SyllabiListProps) {
  const [newDeptName, setNewDeptName] = useState("")
  const [selectedDeptIndex, setSelectedDeptIndex] = useState<number | null>(null)
  const [newYear, setNewYear] = useState("")
  const [newPdfLink, setNewPdfLink] = useState("")
  const [editingYearIndex, setEditingYearIndex] = useState<number | null>(null)

  const handleAddDepartment = () => {
    if (!newDeptName.trim()) return
    onAddDepartment(type, newDeptName)
    setNewDeptName("")
  }

  const handleAddOrUpdateYear = (deptIndex: number) => {
    if (!newYear.trim() || !newPdfLink.trim()) return
    if (editingYearIndex !== null) {
      onEditYear(type, deptIndex, editingYearIndex, newYear, newPdfLink)
    } else {
      onAddYear(type, deptIndex, newYear, newPdfLink)
    }
    cancelEdit()
  }

  const handleEditYear = (deptIndex: number, yearIndex: number) => {
    const year = departments[deptIndex].academicYears[yearIndex]
    setSelectedDeptIndex(deptIndex)
    setNewYear(year.year)
    setNewPdfLink(year.pdfLink)
    setEditingYearIndex(yearIndex)
  }

  const cancelEdit = () => {
    setSelectedDeptIndex(null)
    setNewYear("")
    setNewPdfLink("")
    setEditingYearIndex(null)
  }

  return (
    <div className="space-y-4">
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
              onKeyDown={(e) => e.key === 'Enter' && handleAddDepartment()}
            />
            <Button onClick={handleAddDepartment}>
              <Plus className="mr-2 h-4 w-4" /> Add Department
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {type === "undergraduate" ? "Undergraduate" : "Postgraduate"} Syllabi ({departments.length} departments)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {departments.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {departments.map((dept, deptIndex) => (
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
                      {(selectedDeptIndex === deptIndex || (selectedDeptIndex === null && editingYearIndex === null)) && (
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
                            <Button size="sm" onClick={() => handleAddOrUpdateYear(deptIndex)}>
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
                                      <AlertDialogAction onClick={() => onDeleteYear(type, deptIndex, yearIndex)}>
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
                              <AlertDialogAction onClick={() => onDeleteDepartment(type, deptIndex)}>
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
}
