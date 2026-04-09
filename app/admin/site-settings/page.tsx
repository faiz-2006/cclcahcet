"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Save, RotateCcw, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { libraryData } from "@/data/library-data"
import { saveToServer } from "@/lib/data-service"

export default function SiteSettingsPage() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    logo: "",
  })

  useEffect(() => {
    // Load saved data or use defaults
    const savedData = localStorage.getItem("siteSettings")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    } else {
      setFormData({
        name: libraryData.siteInfo.name,
        tagline: libraryData.siteInfo.tagline,
        description: libraryData.siteInfo.description,
        logo: libraryData.siteInfo.logo,
      })
    }
  }, [])

  const handleSave = async () => {
    localStorage.setItem("siteSettings", JSON.stringify(formData))
    await saveToServer("siteSettings", formData)
    toast({
      title: "Settings Saved",
      description: "Site settings have been updated successfully.",
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const uploadData = new FormData()
    uploadData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      })

      const data = await response.json()

      if (data.success) {
        setFormData({ ...formData, logo: data.url })
        toast({
          title: "Upload Successful",
          description: "Logo has been uploaded successfully.",
        })
      } else {
        throw new Error(data.error || "Failed to upload")
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      e.target.value = ""
    }
  }

  const handleReset = async () => {
    const defaults = {
      name: libraryData.siteInfo.name,
      tagline: libraryData.siteInfo.tagline,
      description: libraryData.siteInfo.description,
      logo: libraryData.siteInfo.logo,
    }
    setFormData(defaults)
    localStorage.setItem("siteSettings", JSON.stringify(defaults))
    await saveToServer("siteSettings", defaults)
    toast({
      title: "Settings Reset",
      description: "Site settings have been reset to defaults.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">
          Manage your library website's basic information and branding.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update the site name, tagline, and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Site Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter site name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="Enter tagline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo Path</Label>
            <div className="flex gap-2">
              <Input
                id="logo"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="/logo.png"
                className="flex-1"
                disabled={isUploading}
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  disabled={isUploading}
                />
                <Button type="button" variant="secondary" disabled={isUploading}>
                  {isUploading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload File
                    </span>
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Provide a web URL or upload an image directly from your computer.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your site information will appear</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-background rounded-lg flex items-center justify-center">
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg"
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{formData.name}</h3>
                <p className="text-muted-foreground">{formData.tagline}</p>
              </div>
            </div>
            <p className="mt-4 text-sm">{formData.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
