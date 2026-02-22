"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Save, RotateCcw, Plus, Trash2, ScrollText, Edit2, X, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { libraryData } from "@/data/library-data"
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

interface RulesData {
  general: string[]
  borrowing: string[]
  bookbank: string[]
  practice: string[]
}

export default function RulesPage() {
  const { toast } = useToast()
  const [rulesData, setRulesData] = useState<RulesData>({
    general: [],
    borrowing: [],
    bookbank: [],
    practice: []
  })
  
  const [newGeneral, setNewGeneral] = useState("")
  const [newBorrowing, setNewBorrowing] = useState("")
  const [newBookbank, setNewBookbank] = useState("")
  const [newPractice, setNewPractice] = useState("")

  useEffect(() => {
    const savedData = localStorage.getItem("rulesData")
    if (savedData) {
      setRulesData(JSON.parse(savedData))
    } else {
      setRulesData({
        general: libraryData.rules.general,
        borrowing: libraryData.rules.borrowing,
        bookbank: libraryData.rules.bookbank,
        practice: libraryData.rules.practice
      })
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("rulesData", JSON.stringify(rulesData))
    toast({
      title: "Rules Saved",
      description: "Library rules have been updated successfully.",
    })
  }

  const handleReset = () => {
    const defaults = {
      general: libraryData.rules.general,
      borrowing: libraryData.rules.borrowing,
      bookbank: libraryData.rules.bookbank,
      practice: libraryData.rules.practice
    }
    setRulesData(defaults)
    localStorage.setItem("rulesData", JSON.stringify(defaults))
    toast({
      title: "Rules Reset",
      description: "Library rules have been reset to defaults.",
    })
  }

  // Generic add/delete handlers
  const handleAdd = (category: keyof RulesData, value: string, setter: (val: string) => void) => {
    if (!value.trim()) return
    setRulesData({ ...rulesData, [category]: [...rulesData[category], value] })
    setter("")
  }

  const handleDelete = (category: keyof RulesData, index: number) => {
    setRulesData({ ...rulesData, [category]: rulesData[category].filter((_, i) => i !== index) })
  }

  const RulesList = ({ 
    category, 
    title, 
    description,
    newValue,
    setNewValue,
    placeholder
  }: { 
    category: keyof RulesData
    title: string
    description: string
    newValue: string
    setNewValue: (val: string) => void
    placeholder: string
  }) => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5" />
            Add {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button onClick={() => handleAdd(category, newValue, setNewValue)}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current {title} ({rulesData[category].length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {rulesData[category].map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-sm">{rule}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-destructive shrink-0 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Rule?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove this rule from the {title.toLowerCase()}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(category, index)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            {rulesData[category].length === 0 && (
              <p className="text-center text-muted-foreground py-4">No rules added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rules & Regulations</h1>
        <p className="text-muted-foreground">
          Manage library rules, borrowing policies, and best practices.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General Rules</TabsTrigger>
          <TabsTrigger value="borrowing">Borrowing Rules</TabsTrigger>
          <TabsTrigger value="bookbank">Book Bank</TabsTrigger>
          <TabsTrigger value="practice">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <RulesList 
            category="general"
            title="General Rules"
            description="Rules for general library conduct"
            newValue={newGeneral}
            setNewValue={setNewGeneral}
            placeholder="Enter a general rule"
          />
        </TabsContent>

        <TabsContent value="borrowing">
          <RulesList 
            category="borrowing"
            title="Borrowing Rules"
            description="Rules for borrowing books and materials"
            newValue={newBorrowing}
            setNewValue={setNewBorrowing}
            placeholder="Enter a borrowing rule"
          />
        </TabsContent>

        <TabsContent value="bookbank">
          <RulesList 
            category="bookbank"
            title="Book Bank Rules"
            description="Rules for the book bank facility"
            newValue={newBookbank}
            setNewValue={setNewBookbank}
            placeholder="Enter a book bank rule"
          />
        </TabsContent>

        <TabsContent value="practice">
          <RulesList 
            category="practice"
            title="Best Practices"
            description="Best practices and services offered"
            newValue={newPractice}
            setNewValue={setNewPractice}
            placeholder="Enter a best practice"
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
              <AlertDialogTitle>Reset Rules Data?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all rules to the original defaults. This action cannot be undone.
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
