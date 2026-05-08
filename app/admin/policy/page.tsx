"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw, FileText, Eye, Target, Scale, AlertTriangle } from "lucide-react"
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
import { PolicySection } from "@/components/policy-section"

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

  const handleSave = async () => {
    localStorage.setItem("policyData", JSON.stringify(policyData))
    await saveToServer("policyData", policyData)
    toast({
      title: "Policy Updated",
      description: "Library policy has been updated successfully.",
    })
  }

  const handleReset = async () => {
    const defaults = {
      vision: libraryData.policy.vision,
      mission: libraryData.policy.mission,
      objectives: libraryData.policy.objectives,
      generalpolicy: libraryData.policy.generalpolicy,
      finepolicy: libraryData.policy.finepolicy
    }
    setPolicyData(defaults)
    localStorage.setItem("policyData", JSON.stringify(defaults))
    await saveToServer("policyData", defaults)
    toast({
      title: "Policy Reset",
      description: "Library policy has been reset to defaults.",
    })
  }

  const handleAdd = (category: keyof PolicyData, value: string) => {
    if (!value.trim()) return
    setPolicyData(prevData => ({
      ...prevData,
      [category]: [...prevData[category], value],
    }))
  }

  const handleDelete = (category: keyof PolicyData, index: number) => {
    setPolicyData(prevData => ({
      ...prevData,
      [category]: prevData[category].filter((_, i) => i !== index),
    }))
  }

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
            items={policyData.vision}
            onAdd={handleAdd}
            onDelete={handleDelete}
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
            items={policyData.mission}
            onAdd={handleAdd}
            onDelete={handleDelete}
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
            items={policyData.objectives}
            onAdd={handleAdd}
            onDelete={handleDelete}
            placeholder="Enter an objective"
          />
        </TabsContent>

        <TabsContent value="general">
          <PolicySection 
            category="generalpolicy"
            title="General Policies"
            description="General library policies and guidelines"
            icon={Scale}
            items={policyData.generalpolicy}
            onAdd={handleAdd}
            onDelete={handleDelete}
            placeholder="Enter a general policy"
          />
        </TabsContent>

        <TabsContent value="fine">
          <PolicySection 
            category="finepolicy"
            title="Fine Policies"
            description="Policies regarding fines and penalties"
            icon={AlertTriangle}
            items={policyData.finepolicy}
            onAdd={handleAdd}
            onDelete={handleDelete}
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

