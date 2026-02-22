"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Save, RotateCcw, Plus, Trash2, Clock } from "lucide-react"
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

interface LibraryHours {
  day: string
  time: string
}

export default function HoursPage() {
  const { toast } = useToast()
  const [hours, setHours] = useState<LibraryHours[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<LibraryHours>({
    day: "",
    time: "",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("libraryHours")
    if (savedData) {
      setHours(JSON.parse(savedData))
    } else {
      setHours(libraryData.hours)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("libraryHours", JSON.stringify(hours))
    toast({
      title: "Hours Saved",
      description: "Library hours have been updated successfully.",
    })
  }

  const handleReset = () => {
    setHours(libraryData.hours)
    localStorage.setItem("libraryHours", JSON.stringify(libraryData.hours))
    toast({
      title: "Hours Reset",
      description: "Library hours have been reset to defaults.",
    })
  }

  const handleAdd = () => {
    if (!formData.day || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    if (editingIndex !== null) {
      const updated = [...hours]
      updated[editingIndex] = formData
      setHours(updated)
      setEditingIndex(null)
    } else {
      setHours([...hours, formData])
    }

    setFormData({ day: "", time: "" })
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(hours[index])
  }

  const handleDelete = (index: number) => {
    const updated = hours.filter((_, i) => i !== index)
    setHours(updated)
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setFormData({ day: "", time: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Library Hours</h1>
        <p className="text-muted-foreground">
          Manage the library operating hours displayed on the website.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingIndex !== null ? "Edit Hours" : "Add New Hours"}</CardTitle>
          <CardDescription>
            {editingIndex !== null ? "Update the hours entry" : "Add new operating hours"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="day">Day(s)</Label>
              <Input
                id="day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                placeholder="e.g., Monday - Friday"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 8:00 AM - 8:00 PM"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              {editingIndex !== null ? "Update" : "Add"} Hours
            </Button>
            {editingIndex !== null && (
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Hours</CardTitle>
          <CardDescription>Library operating schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hours.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hours configured. Add your first entry above.
              </p>
            ) : (
              hours.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{entry.day}</p>
                      <p className="text-sm text-muted-foreground">{entry.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove this hours entry from the schedule.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(index)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
