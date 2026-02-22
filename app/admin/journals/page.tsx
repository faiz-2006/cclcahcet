"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Save, RotateCcw, Plus, Trash2, Newspaper, Edit2, X, Check, Search, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { journalData, Journal } from "@/data/journals-data"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function JournalsPage() {
  const { toast } = useToast()
  const [journals, setJournals] = useState<Journal[]>([])
  const [journalForm, setJournalForm] = useState<Journal>({
    name: "",
    type: "National",
    department: ""
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")

  const departments = [
    "ARTIFICIAL INTELLIGENCE",
    "CIVIL ENGINEERING",
    "COMPUTER SCIENCE ENGINEERING",
    "ELECTRICAL AND ELECTRONICS ENGINEERING",
    "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "INFORMATION TECHNOLOGY",
    "MECHANICAL ENGINEERING",
    "SCIENCE AND HUMANITIES"
  ]

  useEffect(() => {
    const savedData = localStorage.getItem("journalsData")
    if (savedData) {
      setJournals(JSON.parse(savedData))
    } else {
      setJournals(journalData)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("journalsData", JSON.stringify(journals))
    toast({
      title: "Journals Saved",
      description: "All journal data has been saved successfully.",
    })
  }

  const handleReset = () => {
    setJournals(journalData)
    localStorage.setItem("journalsData", JSON.stringify(journalData))
    toast({
      title: "Journals Reset",
      description: "Journals have been reset to defaults.",
    })
  }

  const handleAddJournal = () => {
    if (!journalForm.name || !journalForm.department) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" })
      return
    }
    
    if (editingIndex !== null) {
      const updated = [...journals]
      updated[editingIndex] = journalForm
      setJournals(updated)
      setEditingIndex(null)
    } else {
      setJournals([...journals, journalForm])
    }
    
    setJournalForm({ name: "", type: "National", department: "" })
  }

  const handleEditJournal = (index: number) => {
    setEditingIndex(index)
    setJournalForm(journals[index])
  }

  const handleDeleteJournal = (index: number) => {
    setJournals(journals.filter((_, i) => i !== index))
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setJournalForm({ name: "", type: "National", department: "" })
  }

  // Get filtered journals
  const filteredJournals = journals.filter(journal => {
    const matchesSearch = journal.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || journal.type === filterType
    const matchesDept = filterDepartment === "all" || journal.department === filterDepartment
    return matchesSearch && matchesType && matchesDept
  })

  // Get unique departments from current journals
  const uniqueDepartments = [...new Set(journals.map(j => j.department))]

  // Stats
  const nationalCount = journals.filter(j => j.type === "National").length
  const internationalCount = journals.filter(j => j.type === "International").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Journals</h1>
        <p className="text-muted-foreground">
          Manage the library's journal collection.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Journals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">National Journals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{nationalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">International Journals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{internationalCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Journal Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            {editingIndex !== null ? "Edit Journal" : "Add New Journal"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Journal Name *</Label>
            <Input
              value={journalForm.name}
              onChange={(e) => setJournalForm({ ...journalForm, name: e.target.value })}
              placeholder="Enter journal name"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Type *</Label>
              <Select
                value={journalForm.type}
                onValueChange={(value: "National" | "International") => setJournalForm({ ...journalForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="National">National</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Department *</Label>
              <Select
                value={journalForm.department}
                onValueChange={(value) => setJournalForm({ ...journalForm, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddJournal}>
              {editingIndex !== null ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {editingIndex !== null ? "Update" : "Add"} Journal
            </Button>
            {editingIndex !== null && (
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Journals List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Journal List ({filteredJournals.length} of {journals.length})</CardTitle>
              <CardDescription>View and manage all journals</CardDescription>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search journals..."
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="National">National</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {uniqueDepartments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Journal Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJournals.length > 0 ? (
                  filteredJournals.map((journal, idx) => {
                    const actualIndex = journals.findIndex(j => 
                      j.name === journal.name && j.department === journal.department
                    )
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{idx + 1}</TableCell>
                        <TableCell className="max-w-md">
                          <p className="truncate">{journal.name}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant={journal.type === "National" ? "default" : "secondary"}>
                            {journal.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{journal.department}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleEditJournal(actualIndex)}>
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
                                  <AlertDialogTitle>Delete Journal?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will remove "{journal.name}" from the list.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteJournal(actualIndex)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No journals found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
              <AlertDialogTitle>Reset Journals?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all journals to the original defaults. This action cannot be undone.
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
