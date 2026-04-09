"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { libraryData } from "@/data/library-data"
import { getAboutData } from "@/lib/data-service"
import Image from "next/image"

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(libraryData.about)

  useEffect(() => {
    const loadData = async () => {
      const data = await getAboutData()
      setAboutData(data)
    }
    loadData()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">About Our Library</h1>
        <p className="text-muted-foreground">
          Learn about our mission, history, and the services we provide to our college community.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About Us</CardTitle>
            <CardDescription>The journey of our college library</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Image
              src="/library-top.png"
              alt="Library Building"
              width={800}
              height={400}
              className="w-full rounded-lg object-cover h-64"
            />
            <p>{aboutData.history}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Library Staff</CardTitle>
          <CardDescription>Meet the team behind our library services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aboutData.staff.map((person, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <h3 className="mt-4 text-lg font-medium">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.position}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facilities</CardTitle>
          <CardDescription>What we offer to our users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {aboutData.facilities.map((facility, index) => (
              <div key={index} className="rounded-lg border p-4">
                <h3 className="font-medium">{facility.name}</h3>
                <p className="mt-2 text-sm">{facility.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
