"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { libraryData } from "@/data/library-data"
import { getPolicyData } from "@/lib/data-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PolicyPage() {
  const [policy, setPolicy] = useState({
    vision: libraryData.policy.vision,
    mission: libraryData.policy.mission,
    objectives: libraryData.policy.objectives,
    generalpolicy: libraryData.policy.generalpolicy,
    finepolicy: libraryData.policy.finepolicy,
  })

  useEffect(() => {
    const loadData = async () => {
      const data = await getPolicyData()
      setPolicy(data)
    }
    loadData()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Library Goal</h1>
        <p className="text-muted-foreground">To cater to the needs of Library Users in the least possible time.</p>
      </div>

      <Tabs defaultValue="vision">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vision">Vision & Mission</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vision" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {policy.vision.map((visionItem, index) => (
                    <li key={index}>{visionItem}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {policy.mission.map((missionItem, index) => (
                    <li key={index}>{missionItem}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                  <CardTitle>Circulation Policy</CardTitle>
                </CardHeader>
                <h1 className="list-disc pl-5 space-y-2"></h1>
                {libraryData.policy.circulationpolicy.map((rule, index) => (
                  <div key={index}>{rule}</div>
                ))}
              </CardContent> 
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>General Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {policy.generalpolicy.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle lang="en">Return and Fine Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {policy.finepolicy.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
         
        <TabsContent value="objectives" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {policy.objectives.map((objective, index) => (
                  <li key={`objective-${index}`}>{objective}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs> 
    </div>
  )
}