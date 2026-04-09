"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, RotateCcw, Plus, Trash2, Users, Edit2, X, Check } from "lucide-react"
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

interface CommitteeMember {
  position: string
  role: string
}

interface CommitteeData {
  members: CommitteeMember[]
  functions: string[]
  aboutCommittee: {
    description: string
  }
}

export default function CommitteePage() {
  const { toast } = useToast()
  const [committeeData, setCommitteeData] = useState<CommitteeData>({
    members: [],
    functions: [],
    aboutCommittee: { description: "" }
  })
  
  const [memberForm, setMemberForm] = useState<CommitteeMember>({ position: "", role: "" })
  const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(null)
  const [newFunction, setNewFunction] = useState("")

  useEffect(() => {
    const savedData = localStorage.getItem("committeeData")
    if (savedData) {
      setCommitteeData(JSON.parse(savedData))
    } else {
      setCommitteeData({
        members: libraryData.members,
        functions: libraryData.functions,
        aboutCommittee: libraryData.aboutCommittee
      })
    }
  }, [])

  const handleSave = async () => {
    localStorage.setItem("committeeData", JSON.stringify(committeeData))
    await saveToServer("committeeData", committeeData)
    toast({
      title: "Committee Data Saved",
      description: "Committee information has been updated successfully.",
    })
  }

  const handleReset = async () => {
    const defaults = {
      members: libraryData.members,
      functions: libraryData.functions,
      aboutCommittee: libraryData.aboutCommittee
    }
    setCommitteeData(defaults)
    localStorage.setItem("committeeData", JSON.stringify(defaults))
    await saveToServer("committeeData", defaults)
    toast({
      title: "Committee Data Reset",
      description: "Committee information has been reset to defaults.",
    })
  }

  // Member handlers
  const handleAddMember = () => {
    if (!memberForm.position || !memberForm.role) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" })
      return
    }
    if (editingMemberIndex !== null) {
      const updated = [...committeeData.members]
      updated[editingMemberIndex] = memberForm
      setCommitteeData({ ...committeeData, members: updated })
      setEditingMemberIndex(null)
    } else {
      setCommitteeData({ ...committeeData, members: [...committeeData.members, memberForm] })
    }
    setMemberForm({ position: "", role: "" })
  }

  const handleEditMember = (index: number) => {
    setEditingMemberIndex(index)
    setMemberForm(committeeData.members[index])
  }

  const handleDeleteMember = (index: number) => {
    setCommitteeData({ ...committeeData, members: committeeData.members.filter((_, i) => i !== index) })
  }

  // Function handlers
  const handleAddFunction = () => {
    if (!newFunction.trim()) return
    setCommitteeData({ ...committeeData, functions: [...committeeData.functions, newFunction] })
    setNewFunction("")
  }

  const handleDeleteFunction = (index: number) => {
    setCommitteeData({ ...committeeData, functions: committeeData.functions.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Committee</h1>
        <p className="text-muted-foreground">
          Manage library committee members and their functions.
        </p>
      </div>

      {/* About Committee */}
      <Card>
        <CardHeader>
          <CardTitle>About Committee</CardTitle>
          <CardDescription>Description about the library committee</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={committeeData.aboutCommittee.description}
            onChange={(e) => setCommitteeData({ 
              ...committeeData, 
              aboutCommittee: { description: e.target.value } 
            })}
            placeholder="Enter committee description"
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Committee Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {editingMemberIndex !== null ? "Edit Committee Member" : "Add Committee Member"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Position/Designation</Label>
              <Input
                value={memberForm.position}
                onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })}
                placeholder="e.g., Principal, Librarian, HOD"
              />
            </div>
            <div className="space-y-2">
              <Label>Committee Role</Label>
              <Input
                value={memberForm.role}
                onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                placeholder="e.g., President, Secretary, Member"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddMember}>
              {editingMemberIndex !== null ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {editingMemberIndex !== null ? "Update" : "Add"} Member
            </Button>
            {editingMemberIndex !== null && (
              <Button variant="outline" onClick={() => { setEditingMemberIndex(null); setMemberForm({ position: "", role: "" }) }}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Members ({committeeData.members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Position/Designation</th>
                  <th className="text-left p-3 font-medium">Committee Role</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {committeeData.members.map((member, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3">{member.position}</td>
                    <td className="p-3">{member.role}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditMember(index)}>
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
                              <AlertDialogTitle>Delete Member?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove {member.position} from the committee.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteMember(index)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {committeeData.members.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No committee members added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Committee Functions */}
      <Card>
        <CardHeader>
          <CardTitle>Committee Functions</CardTitle>
          <CardDescription>Add responsibilities and functions of the committee</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newFunction}
              onChange={(e) => setNewFunction(e.target.value)}
              placeholder="Enter a committee function"
              className="flex-1"
            />
            <Button onClick={handleAddFunction}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Functions ({committeeData.functions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {committeeData.functions.map((func, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-sm">{func}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-destructive shrink-0 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Function?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove this committee function.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteFunction(index)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            {committeeData.functions.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No functions added yet.</p>
            )}
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
              <AlertDialogTitle>Reset Committee Data?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all committee data to the original defaults. This action cannot be undone.
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
