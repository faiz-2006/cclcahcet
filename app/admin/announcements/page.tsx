"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, RotateCcw, Plus, Trash2, Bell, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { libraryData } from "@/data/library-data"
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

interface Announcement {
  title: string
  content: string
  date: string
}

export default function AnnouncementsPage() {
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<Announcement>({
    title: "",
    content: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  })

  useEffect(() => {
    const savedData = localStorage.getItem("announcements")
    if (savedData) {
      setAnnouncements(JSON.parse(savedData))
    } else {
      setAnnouncements(libraryData.announcements)
    }
  }, [])

  const handleSave = async () => {
    localStorage.setItem("announcements", JSON.stringify(announcements))
    await saveToServer("announcements", announcements)
    toast({
      title: "Announcements Saved",
      description: "All announcements have been saved successfully.",
    })
  }

  const handleReset = async () => {
    setAnnouncements(libraryData.announcements)
    localStorage.setItem("announcements", JSON.stringify(libraryData.announcements))
    await saveToServer("announcements", libraryData.announcements)
    toast({
      title: "Announcements Reset",
      description: "Announcements have been reset to defaults.",
    })
  }

  const handleAdd = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    if (editingIndex !== null) {
      const updated = [...announcements]
      updated[editingIndex] = formData
      setAnnouncements(updated)
      setEditingIndex(null)
    } else {
      setAnnouncements([formData, ...announcements])
    }

    setFormData({
      title: "",
      content: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    })
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(announcements[index])
  }

  const handleDelete = (index: number) => {
    const updated = announcements.filter((_, i) => i !== index)
    setAnnouncements(updated)
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setFormData({
      title: "",
      content: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">
          Manage library announcements displayed on the homepage and marquee.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingIndex !== null ? "Edit Announcement" : "Add New Announcement"}</CardTitle>
          <CardDescription>
            {editingIndex !== null ? "Update the announcement details" : "Create a new announcement for the library"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter announcement title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter announcement content"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="e.g., May 5, 2024"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              {editingIndex !== null ? "Update" : "Add"} Announcement
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
          <CardTitle>Current Announcements</CardTitle>
          <CardDescription>All announcements ({announcements.length} total)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No announcements yet. Add your first announcement above.
              </p>
            ) : (
              announcements.map((announcement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <Bell className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {announcement.date}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
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
                          <AlertDialogTitle>Delete Announcement?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the announcement.
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
