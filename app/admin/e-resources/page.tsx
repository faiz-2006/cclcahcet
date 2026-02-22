"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, RotateCcw, Plus, Trash2, BookMarked, ExternalLink, Globe, Edit2, X, Check } from "lucide-react"
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

interface EResource {
  name: string
  ipRange: string
  url: string
  description: string
}

interface EResourcesData {
  resources: EResource[]
  accessInstructions: string[]
}

export default function EResourcesPage() {
  const { toast } = useToast()
  const [eResourcesData, setEResourcesData] = useState<EResourcesData>({
    resources: [],
    accessInstructions: []
  })
  
  const [resourceForm, setResourceForm] = useState<EResource>({
    name: "",
    ipRange: "",
    url: "",
    description: ""
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newInstruction, setNewInstruction] = useState("")

  useEffect(() => {
    const savedData = localStorage.getItem("eResourcesData")
    if (savedData) {
      setEResourcesData(JSON.parse(savedData))
    } else {
      // Convert from existing format
      const resources: EResource[] = []
      if (libraryData.eResources.delnet) {
        resources.push({
          name: "DELNET",
          ...libraryData.eResources.delnet
        })
      }
      setEResourcesData({
        resources,
        accessInstructions: libraryData.eResources.accessInstructions
      })
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("eResourcesData", JSON.stringify(eResourcesData))
    toast({
      title: "E-Resources Saved",
      description: "E-Resources have been updated successfully.",
    })
  }

  const handleReset = () => {
    const resources: EResource[] = []
    if (libraryData.eResources.delnet) {
      resources.push({
        name: "DELNET",
        ...libraryData.eResources.delnet
      })
    }
    const defaults = {
      resources,
      accessInstructions: libraryData.eResources.accessInstructions
    }
    setEResourcesData(defaults)
    localStorage.setItem("eResourcesData", JSON.stringify(defaults))
    toast({
      title: "E-Resources Reset",
      description: "E-Resources have been reset to defaults.",
    })
  }

  // Resource handlers
  const handleAddResource = () => {
    if (!resourceForm.name || !resourceForm.url) {
      toast({ title: "Error", description: "Please fill in name and URL.", variant: "destructive" })
      return
    }
    
    if (editingIndex !== null) {
      const updated = [...eResourcesData.resources]
      updated[editingIndex] = resourceForm
      setEResourcesData({ ...eResourcesData, resources: updated })
      setEditingIndex(null)
    } else {
      setEResourcesData({ 
        ...eResourcesData, 
        resources: [...eResourcesData.resources, resourceForm] 
      })
    }
    
    setResourceForm({ name: "", ipRange: "", url: "", description: "" })
  }

  const handleEditResource = (index: number) => {
    setEditingIndex(index)
    setResourceForm(eResourcesData.resources[index])
  }

  const handleDeleteResource = (index: number) => {
    setEResourcesData({ 
      ...eResourcesData, 
      resources: eResourcesData.resources.filter((_, i) => i !== index) 
    })
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setResourceForm({ name: "", ipRange: "", url: "", description: "" })
  }

  // Instruction handlers
  const handleAddInstruction = () => {
    if (!newInstruction.trim()) return
    setEResourcesData({ 
      ...eResourcesData, 
      accessInstructions: [...eResourcesData.accessInstructions, newInstruction] 
    })
    setNewInstruction("")
  }

  const handleDeleteInstruction = (index: number) => {
    setEResourcesData({ 
      ...eResourcesData, 
      accessInstructions: eResourcesData.accessInstructions.filter((_, i) => i !== index) 
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">E-Resources</h1>
        <p className="text-muted-foreground">
          Manage electronic resources and access instructions.
        </p>
      </div>

      {/* Add/Edit Resource Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookMarked className="h-5 w-5" />
            {editingIndex !== null ? "Edit E-Resource" : "Add New E-Resource"}
          </CardTitle>
          <CardDescription>
            Add electronic databases, digital libraries, and online resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Resource Name *</Label>
              <Input
                value={resourceForm.name}
                onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })}
                placeholder="e.g., DELNET, N-LIST, JSTOR"
              />
            </div>
            <div className="space-y-2">
              <Label>IP Range</Label>
              <Input
                value={resourceForm.ipRange}
                onChange={(e) => setResourceForm({ ...resourceForm, ipRange: e.target.value })}
                placeholder="e.g., No IP Range Needed or 192.168.1.x"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>URL *</Label>
            <Input
              value={resourceForm.url}
              onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
              placeholder="https://example.com/resource"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={resourceForm.description}
              onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
              placeholder="Brief description of the resource and how to access it"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddResource}>
              {editingIndex !== null ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {editingIndex !== null ? "Update" : "Add"} Resource
            </Button>
            {editingIndex !== null && (
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resources List */}
      <Card>
        <CardHeader>
          <CardTitle>E-Resources ({eResourcesData.resources.length})</CardTitle>
          <CardDescription>Currently available electronic resources</CardDescription>
        </CardHeader>
        <CardContent>
          {eResourcesData.resources.length > 0 ? (
            <div className="space-y-4">
              {eResourcesData.resources.map((resource, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-lg">{resource.name}</h4>
                      </div>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        {resource.url} <ExternalLink className="h-3 w-3" />
                      </a>
                      {resource.ipRange && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">IP Range:</span> {resource.ipRange}
                        </p>
                      )}
                      {resource.description && (
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="icon" onClick={() => handleEditResource(index)}>
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
                            <AlertDialogTitle>Delete Resource?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove {resource.name} from the e-resources list.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteResource(index)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookMarked className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No e-resources added yet. Add a resource to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Access Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Access Instructions</CardTitle>
          <CardDescription>Instructions for accessing electronic resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              placeholder="Enter an access instruction"
              className="flex-1"
            />
            <Button onClick={handleAddInstruction}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>

          <div className="space-y-2">
            {eResourcesData.accessInstructions.map((instruction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-sm">{instruction}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-destructive shrink-0 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Instruction?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove this access instruction.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteInstruction(index)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            {eResourcesData.accessInstructions.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No access instructions added yet.</p>
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
              <AlertDialogTitle>Reset E-Resources?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all e-resources to the original defaults. This action cannot be undone.
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
