"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw, BookOpen, Newspaper, BookMarked, Users, TrendingUp } from "lucide-react"
import { libraryData } from "@/data/library-data"
import { saveToServer } from "@/lib/data-service"

export default function StatisticsPage() {
  type StatisticsForm = {
    totalBooks: number
    totalJournals: number
    totalEBooks: number
    dailyVisitors: number
    activeMembers: number
  }

  const [formData, setFormData] = useState<StatisticsForm>({
    totalBooks: 0,
    totalJournals: 0,
    totalEBooks: 0,
    dailyVisitors: 0,
    activeMembers: 0,
  })
  const [lastSavedData, setLastSavedData] = useState<StatisticsForm | null>(null)
  const [lastEditedField, setLastEditedField] = useState<string>("")

  useEffect(() => {
    const savedData = localStorage.getItem("statistics")
    if (savedData) {
      const parsedData = JSON.parse(savedData) as StatisticsForm
      setFormData(parsedData)
      setLastSavedData(parsedData)
    } else {
      const defaults = {
        totalBooks: libraryData.statistics.totalBooks,
        totalJournals: libraryData.statistics.totalJournals,
        totalEBooks: libraryData.statistics.totalEBooks,
        dailyVisitors: libraryData.statistics.dailyVisitors,
        activeMembers: libraryData.statistics.activeMembers,
      }
      setFormData(defaults)
      setLastSavedData(defaults)
    }
  }, [])

  const handleSave = async () => {
    const changedStat = statsConfig.find(
      (stat) =>
        !lastSavedData ||
        formData[stat.key as keyof StatisticsForm] !== lastSavedData[stat.key as keyof StatisticsForm],
    )

    const message = lastEditedField
      ? `Updated ${lastEditedField}`
      : changedStat
        ? `Updated ${changedStat.label}`
        : "Statistics updated"

    localStorage.setItem("statistics", JSON.stringify(formData))
    await saveToServer("statistics", formData)
    setLastSavedData(formData)
    setLastEditedField("")
    toast(message, {
      duration: 2000,
    })
  }

  const handleReset = async () => {
    const defaults = {
      totalBooks: libraryData.statistics.totalBooks,
      totalJournals: libraryData.statistics.totalJournals,
      totalEBooks: libraryData.statistics.totalEBooks,
      dailyVisitors: libraryData.statistics.dailyVisitors,
      activeMembers: libraryData.statistics.activeMembers,
    }
    setFormData(defaults)
    setLastSavedData(defaults)
    setLastEditedField("")
    localStorage.setItem("statistics", JSON.stringify(defaults))
    await saveToServer("statistics", defaults)
    toast("Statistics have been reset to defaults.", {
      duration: 2000,
    })
  }

  const statsConfig = [
    { key: "totalBooks", label: "Total Books", icon: BookOpen, color: "text-blue-500" },
    { key: "totalJournals", label: "Total Journals", icon: Newspaper, color: "text-green-500" },
    { key: "totalEBooks", label: "Total E-Books", icon: BookMarked, color: "text-purple-500" },
    { key: "dailyVisitors", label: "Daily Visitors", icon: TrendingUp, color: "text-orange-500" },
    { key: "activeMembers", label: "Active Members", icon: Users, color: "text-pink-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground">
          Update library statistics displayed on the homepage and marquee.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsConfig.map((stat) => (
          <Card key={stat.key}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <CardTitle className="text-base">{stat.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                value={formData[stat.key as keyof typeof formData]}
                onChange={(e) => {
                  setFormData({ ...formData, [stat.key]: parseInt(e.target.value) || 0 })
                  setLastEditedField(stat.label)
                }}
                placeholder="Enter value"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Statistics will appear on homepage and top marquee</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {statsConfig.map((stat) => (
              <div key={stat.key} className="bg-muted p-4 rounded-lg text-center">
                <stat.icon className={`h-8 w-8 mx-auto ${stat.color}`} />
                <p className="text-2xl font-bold mt-2">
                  {formData[stat.key as keyof typeof formData].toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
