"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, RotateCcw, Plus, Trash2, FileText, Eye, Target, Scale, AlertTriangle } from "lucide-react"
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

interface PolicyData {
  vision: string[]
  mission: string[]
  objectives: string[]
  generalpolicy: string[]
  finepolicy: string[]
}

export default function PolicyPage() {
  const { toast } = useToast()
  const [policyData, setPolicyData] = useState<PolicyData>({
    vision: [],
    mission: [],
    objectives: [],
    generalpolicy: [],
    finepolicy: []
  })
  
  const [newVision, setNewVision] = useState("")
  const [newMission, setNewMission] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [newGeneralPolicy, setNewGeneralPolicy] = useState("")
  const [newFinePolicy, setNewFinePolicy] = useState("")

  useEffect(() => {
    const savedData = localStorage.getItem("policyData")
    if (savedData) {
      setPolicyData(JSON.parse(savedData))
    } else {
      setPolicyData({
        vision: libraryData.policy.vision,
        mission: libraryData.policy.mission,
        objectives: libraryData.policy.objectives,
        generalpolicy: libraryData.policy.generalpolicy,
        finepolicy: libraryData.policy.finepolicy
      })
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("policyData", JSON.stringify(policyData))
    toast({
      title: "Policy Saved",
      description: "Library policy has been updated successfully.",
    })
  }

  const handleReset = () => {
    const defaults = {
      vision: libraryData.policy.vision,
      mission: libraryData.policy.mission,
      objectives: libraryData.policy.objectives,
      generalpolicy: libraryData.policy.generalpolicy,
      finepolicy: libraryData.policy.finepolicy
    }
    setPolicyData(defaults)
    localStorage.setItem("policyData", JSON.stringify(defaults))
    toast({
      title: "Policy Reset",
      description: "Library policy has been reset to defaults.",
    })
  }

  // Generic add/delete handlers
  const handleAdd = (category: keyof PolicyData, value: string, setter: (val: string) => void) => {
    if (!value.trim()) return
    setPolicyData({ ...policyData, [category]: [...policyData[category], value] })
    setter("")
  }

  const handleDelete = (category: keyof PolicyData, index: number) => {
    setPolicyData({ ...policyData, [category]: policyData[category].filter((_, i) => i !== index) })
  }

  const PolicySection = ({ 
    category, 
    title, 
    description,
    icon: Icon,
    newValue,
    setNewValue,
    placeholder,
    useTextarea = false
  }: { 
    category: keyof PolicyData
    title: string
    description: string
    icon: React.ElementType
    newValue: string
    setNewValue: (val: string) => void
    placeholder: string
    useTextarea?: boolean
  }) => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            Add {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {useTextarea ? (
            <div className="space-y-2">
              <Textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={placeholder}
                rows={3}
              />
              <Button onClick={() => handleAdd(category, newValue, setNewValue)}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current {title} ({policyData[category].length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {policyData[category].map((item, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-3 flex-1">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm">{item}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-destructive shrink-0 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove this item from {title.toLowerCase()}.
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
            {policyData[category].length === 0 && (
              <p className="text-center text-muted-foreground py-4">No items added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Library Policy</h1>
        <p className="text-muted-foreground">
          Manage library vision, mission, objectives, and policies.
        </p>
      </div>

      <Tabs defaultValue="vision" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="vision">Vision</TabsTrigger>
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="general">General Policy</TabsTrigger>
          <TabsTrigger value="fine">Fine Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="vision">
          <PolicySection 
            category="vision"
            title="Vision Statement"
            description="Library's vision for the future"
            icon={Eye}
            newValue={newVision}
            setNewValue={setNewVision}
            placeholder="Enter vision statement"
            useTextarea
          />
        </TabsContent>

        <TabsContent value="mission">
          <PolicySection 
            category="mission"
            title="Mission Statement"
            description="Library's mission and purpose"
            icon={Target}
            newValue={newMission}
            setNewValue={setNewMission}
            placeholder="Enter mission statement"
            useTextarea
          />
        </TabsContent>

        <TabsContent value="objectives">
          <PolicySection 
            category="objectives"
            title="Objectives"
            description="Library's objectives and goals"
            icon={FileText}
            newValue={newObjective}
            setNewValue={setNewObjective}
            placeholder="Enter an objective"
          />
        </TabsContent>

        <TabsContent value="general">
          <PolicySection 
            category="generalpolicy"
            title="General Policies"
            description="General library policies and guidelines"
            icon={Scale}
            newValue={newGeneralPolicy}
            setNewValue={setNewGeneralPolicy}
            placeholder="Enter a general policy"
          />
        </TabsContent>

        <TabsContent value="fine">
          <PolicySection 
            category="finepolicy"
            title="Fine Policies"
            description="Policies regarding fines and penalties"
            icon={AlertTriangle}
            newValue={newFinePolicy}
            setNewValue={setNewFinePolicy}
            placeholder="Enter a fine policy"
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
              <AlertDialogTitle>Reset Policy Data?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all policy data to the original defaults. This action cannot be undone.
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
