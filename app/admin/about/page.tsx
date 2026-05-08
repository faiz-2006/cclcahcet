"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, RotateCcw, Plus, Trash2, Users, Building, Briefcase, Edit2, X, Check } from "lucide-react"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface StaffMember {
  name: string
  position: string
}

interface Facility {
  name: string
  description: string
}

interface AboutData {
  history: string[]
  activities: string[]
  staff: StaffMember[]
  facilities: Facility[]
}

export default function AboutPage() {
  const { toast } = useToast()
  const [aboutData, setAboutData] = useState<AboutData>({
    history: [],
    activities: [],
    staff: [],
    facilities: [],
  })
  
  // Staff form
  const [staffForm, setStaffForm] = useState<StaffMember>({ name: "", position: "" })
  const [editingStaffIndex, setEditingStaffIndex] = useState<number | null>(null)
  
  // Facility form
  const [facilityForm, setFacilityForm] = useState<Facility>({ name: "", description: "" })
  const [editingFacilityIndex, setEditingFacilityIndex] = useState<number | null>(null)
  
  // History and activities
  const [newHistory, setNewHistory] = useState("")
  const [newActivity, setNewActivity] = useState("")

  useEffect(() => {
    const savedData = localStorage.getItem("aboutData")
    if (savedData) {
      setAboutData(JSON.parse(savedData))
    } else {
      setAboutData({
        history: libraryData.about.history,
        activities: libraryData.about.activities,
        staff: libraryData.about.staff,
        facilities: libraryData.about.facilities,
      })
    }
  }, [])

  const handleSave = async () => {
    localStorage.setItem("aboutData", JSON.stringify(aboutData))
    await saveToServer("aboutData", aboutData)
    toast({
      title: "About Data Updated",
      description: "About section has been updated successfully.",
    })
  }

  const handleReset = async () => {
    const defaults = {
      history: libraryData.about.history,
      activities: libraryData.about.activities,
      staff: libraryData.about.staff,
      facilities: libraryData.about.facilities,
    }
    setAboutData(defaults)
    localStorage.setItem("aboutData", JSON.stringify(defaults))
    await saveToServer("aboutData", defaults)
    toast({
      title: "About Data Reset",
      description: "About section has been reset to defaults.",
    })
  }

  // Staff handlers
  const handleAddStaff = () => {
    if (!staffForm.name || !staffForm.position) {
      toast({ title: "Error", description: "Please fill in all staff fields.", variant: "destructive" })
      return
    }
    if (editingStaffIndex !== null) {
      const updated = [...aboutData.staff]
      updated[editingStaffIndex] = staffForm
      setAboutData({ ...aboutData, staff: updated })
      setEditingStaffIndex(null)
    } else {
      setAboutData({ ...aboutData, staff: [...aboutData.staff, staffForm] })
    }
    setStaffForm({ name: "", position: "" })
  }

  const handleEditStaff = (index: number) => {
    setEditingStaffIndex(index)
    setStaffForm(aboutData.staff[index])
  }

  const handleDeleteStaff = (index: number) => {
    setAboutData({ ...aboutData, staff: aboutData.staff.filter((_, i) => i !== index) })
  }

  // Facility handlers
  const handleAddFacility = () => {
    if (!facilityForm.name || !facilityForm.description) {
      toast({ title: "Error", description: "Please fill in all facility fields.", variant: "destructive" })
      return
    }
    if (editingFacilityIndex !== null) {
      const updated = [...aboutData.facilities]
      updated[editingFacilityIndex] = facilityForm
      setAboutData({ ...aboutData, facilities: updated })
      setEditingFacilityIndex(null)
    } else {
      setAboutData({ ...aboutData, facilities: [...aboutData.facilities, facilityForm] })
    }
    setFacilityForm({ name: "", description: "" })
  }

  const handleEditFacility = (index: number) => {
    setEditingFacilityIndex(index)
    setFacilityForm(aboutData.facilities[index])
  }

  const handleDeleteFacility = (index: number) => {
    setAboutData({ ...aboutData, facilities: aboutData.facilities.filter((_, i) => i !== index) })
  }

  // History handlers
  const handleAddHistory = () => {
    if (!newHistory.trim()) return
    setAboutData({ ...aboutData, history: [...aboutData.history, newHistory] })
    setNewHistory("")
  }

  const handleDeleteHistory = (index: number) => {
    setAboutData({ ...aboutData, history: aboutData.history.filter((_, i) => i !== index) })
  }

  // Activity handlers
  const handleAddActivity = () => {
    if (!newActivity.trim()) return
    setAboutData({ ...aboutData, activities: [...aboutData.activities, newActivity] })
    setNewActivity("")
  }

  const handleDeleteActivity = (index: number) => {
    setAboutData({ ...aboutData, activities: aboutData.activities.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">About & Staff</h1>
        <p className="text-muted-foreground">
          Manage library information, staff details, and facilities.
        </p>
      </div>

      <Tabs defaultValue="staff" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        {/* Staff Tab */}
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {editingStaffIndex !== null ? "Edit Staff Member" : "Add Staff Member"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    placeholder="Enter staff name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={staffForm.position}
                    onChange={(e) => setStaffForm({ ...staffForm, position: e.target.value })}
                    placeholder="Enter position"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddStaff}>
                  {editingStaffIndex !== null ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                  {editingStaffIndex !== null ? "Update" : "Add"} Staff
                </Button>
                {editingStaffIndex !== null && (
                  <Button variant="outline" onClick={() => { setEditingStaffIndex(null); setStaffForm({ name: "", position: "" }) }}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Staff ({aboutData.staff.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aboutData.staff.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditStaff(index)}>
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
                            <AlertDialogTitle>Delete Staff Member?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove {member.name} from the staff list.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteStaff(index)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
                {aboutData.staff.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No staff members added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facilities Tab */}
        <TabsContent value="facilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                {editingFacilityIndex !== null ? "Edit Facility" : "Add Facility"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Facility Name</Label>
                <Input
                  value={facilityForm.name}
                  onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })}
                  placeholder="Enter facility name"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={facilityForm.description}
                  onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })}
                  placeholder="Enter facility description"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddFacility}>
                  {editingFacilityIndex !== null ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                  {editingFacilityIndex !== null ? "Update" : "Add"} Facility
                </Button>
                {editingFacilityIndex !== null && (
                  <Button variant="outline" onClick={() => { setEditingFacilityIndex(null); setFacilityForm({ name: "", description: "" }) }}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Facilities ({aboutData.facilities.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aboutData.facilities.map((facility, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{facility.name}</p>
                      <p className="text-sm text-muted-foreground">{facility.description}</p>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditFacility(index)}>
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
                            <AlertDialogTitle>Delete Facility?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove {facility.name} from the facilities list.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteFacility(index)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
                {aboutData.facilities.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No facilities added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Library History</CardTitle>
              <CardDescription>Add paragraphs about the library's history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>New History Paragraph</Label>
                <Textarea
                  value={newHistory}
                  onChange={(e) => setNewHistory(e.target.value)}
                  placeholder="Enter a paragraph about the library's history"
                  rows={4}
                />
              </div>
              <Button onClick={handleAddHistory}>
                <Plus className="mr-2 h-4 w-4" /> Add Paragraph
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current History ({aboutData.history.length} paragraphs)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aboutData.history.map((para, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <p className="flex-1 text-sm">{para}</p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-destructive shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Paragraph?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove this history paragraph.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteHistory(index)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Library Activities</CardTitle>
              <CardDescription>Add library activities and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>New Activity</Label>
                <Input
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="Enter an activity"
                />
              </div>
              <Button onClick={handleAddActivity}>
                <Plus className="mr-2 h-4 w-4" /> Add Activity
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Activities ({aboutData.activities.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {aboutData.activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <p className="text-sm flex-1">{activity}</p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-destructive shrink-0 ml-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Activity?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove this activity.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteActivity(index)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
              <AlertDialogTitle>Reset About Data?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all about section data to the original defaults. This action cannot be undone.
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
