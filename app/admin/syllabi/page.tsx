"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { undergraduateSyllabi, postgraduateSyllabi, Department } from "@/data/syllabi-data"
import { saveToServer } from "@/lib/data-service"
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
import { SyllabiList } from "@/components/syllabi-list"

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
  const [activeTab, setActiveTab] = useState<"undergraduate" | "postgraduate">("undergraduate")

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

  const handleSave = async () => {
    localStorage.setItem("syllabiData", JSON.stringify(syllabiData))
    await saveToServer("syllabiData", syllabiData)
    toast({
      title: "Syllabi Updated",
      description: "All syllabi data has been saved successfully.",
    })
  }

  const handleReset = async () => {
    const defaults = {
      undergraduate: undergraduateSyllabi,
      postgraduate: postgraduateSyllabi
    }
    setSyllabiData(defaults)
    localStorage.setItem("syllabiData", JSON.stringify(defaults))
    await saveToServer("syllabiData", defaults)
    toast({
      title: "Syllabi Reset",
      description: "Syllabi have been reset to defaults.",
    })
  }

  const handleAddDepartment = (type: "undergraduate" | "postgraduate", name: string) => {
    const newDept: Department = { department: name, academicYears: [] }
    setSyllabiData(prev => ({
      ...prev,
      [type]: [...prev[type], newDept]
    }))
    toast({ title: "Success", description: "Department added successfully." })
  }

  const handleDeleteDepartment = (type: "undergraduate" | "postgraduate", deptIndex: number) => {
    setSyllabiData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== deptIndex)
    }))
  }

  const handleAddYear = (type: "undergraduate" | "postgraduate", deptIndex: number, year: string, pdfLink: string) => {
    setSyllabiData(prev => {
      const updated = [...prev[type]]
      updated[deptIndex].academicYears.push({ year, pdfLink })
      return { ...prev, [type]: updated }
    })
  }

  const handleEditYear = (type: "undergraduate" | "postgraduate", deptIndex: number, yearIndex: number, year: string, pdfLink: string) => {
    setSyllabiData(prev => {
      const updated = [...prev[type]]
      updated[deptIndex].academicYears[yearIndex] = { year, pdfLink }
      return { ...prev, [type]: updated }
    })
  }

  const handleDeleteYear = (type: "undergraduate" | "postgraduate", deptIndex: number, yearIndex: number) => {
    setSyllabiData(prev => {
      const updated = [...prev[type]]
      updated[deptIndex].academicYears = updated[deptIndex].academicYears.filter((_, i) => i !== yearIndex)
      return { ...prev, [type]: updated }
    })
  }

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
          <SyllabiList 
            type="undergraduate"
            departments={syllabiData.undergraduate}
            onAddDepartment={handleAddDepartment}
            onDeleteDepartment={handleDeleteDepartment}
            onAddYear={handleAddYear}
            onEditYear={handleEditYear}
            onDeleteYear={handleDeleteYear}
          />
        </TabsContent>

        <TabsContent value="postgraduate">
          <SyllabiList 
            type="postgraduate"
            departments={syllabiData.postgraduate}
            onAddDepartment={handleAddDepartment}
            onDeleteDepartment={handleDeleteDepartment}
            onAddYear={handleAddYear}
            onEditYear={handleEditYear}
            onDeleteYear={handleDeleteYear}
          />
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
