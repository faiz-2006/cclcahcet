"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, RotateCcw, Plus, Trash2, Image as ImageIcon, Edit2, X, Check, Upload } from "lucide-react"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface GalleryImage {
  title: string
  description: string
  imageUrl: string
  category: string
}

export default function GalleryPage() {
  const { toast } = useToast()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [imageForm, setImageForm] = useState<GalleryImage>({
    title: "",
    description: "",
    imageUrl: "",
    category: "Facilities"
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [isUploading, setIsUploading] = useState(false)

  const categories = ["Facilities", "Events", "Collections", "Staff", "Other"]

  useEffect(() => {
    const savedData = localStorage.getItem("galleryData")
    if (savedData) {
      setImages(JSON.parse(savedData))
    } else {
      setImages(libraryData.gallery.all)
    }
  }, [])

  const handleSave = async () => {
    localStorage.setItem("galleryData", JSON.stringify(images))
    await saveToServer("galleryData", images)
    toast({
      title: "Gallery Updated",
      description: "Gallery images have been updated successfully.",
    })
  }

  const handleReset = async () => {
    setImages(libraryData.gallery.all)
    localStorage.setItem("galleryData", JSON.stringify(libraryData.gallery.all))
    await saveToServer("galleryData", libraryData.gallery.all)
    toast({
      title: "Gallery Reset",
      description: "Gallery has been reset to defaults.",
    })
  }

  const handleAddImage = () => {
    if (!imageForm.title || !imageForm.imageUrl) {
      toast({ title: "Error", description: "Please fill in title and image URL.", variant: "destructive" })
      return
    }
    
    if (editingIndex !== null) {
      const updated = [...images]
      updated[editingIndex] = imageForm
      setImages(updated)
      setEditingIndex(null)
    } else {
      setImages([...images, imageForm])
    }
    
    setImageForm({ title: "", description: "", imageUrl: "", category: "Facilities" })
  }

  const handleEditImage = (index: number) => {
    setEditingIndex(index)
    setImageForm(images[index])
  }

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setImageForm({ title: "", description: "", imageUrl: "", category: "Facilities" })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setImageForm({ ...imageForm, imageUrl: data.url })
        toast({
          title: "Upload Successful",
          description: "Image has been uploaded and URL inserted.",
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
      // Reset input so the same file can be selected again if needed
      e.target.value = ""
    }
  }

  const filteredImages = filterCategory === "all" 
    ? images 
    : images.filter(img => img.category === filterCategory)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="text-muted-foreground">
          Manage library gallery images and photos.
        </p>
      </div>

      {/* Add/Edit Image Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            {editingIndex !== null ? "Edit Image" : "Add New Image"}
          </CardTitle>
          <CardDescription>
            Add images by providing a URL. For local images, place them in the public folder and use paths like "/image-name.jpg"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={imageForm.title}
                onChange={(e) => setImageForm({ ...imageForm, title: e.target.value })}
                placeholder="Enter image title"
              />
            </div>
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={imageForm.category}
                onValueChange={(value) => setImageForm({ ...imageForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Image URL *</Label>
            <div className="flex gap-2">
              <Input
                value={imageForm.imageUrl}
                onChange={(e) => setImageForm({ ...imageForm, imageUrl: e.target.value })}
                placeholder="/image.jpg or https://example.com/image.jpg"
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

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={imageForm.description}
              onChange={(e) => setImageForm({ ...imageForm, description: e.target.value })}
              placeholder="Enter image description"
              rows={2}
            />
          </div>

          {imageForm.imageUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-2 bg-muted">
                <img 
                  src={imageForm.imageUrl} 
                  alt="Preview" 
                  className="max-h-40 rounded object-cover mx-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=300"
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleAddImage}>
              {editingIndex !== null ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {editingIndex !== null ? "Update" : "Add"} Image
            </Button>
            {editingIndex !== null && (
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Gallery Images ({images.length})</CardTitle>
              <CardDescription>Manage your library gallery</CardDescription>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredImages.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredImages.map((image, index) => {
                const actualIndex = images.findIndex(img => 
                  img.title === image.title && img.imageUrl === image.imageUrl
                )
                return (
                  <div key={index} className="group relative border rounded-lg overflow-hidden bg-muted">
                    <div className="aspect-video relative">
                      <img 
                        src={image.imageUrl} 
                        alt={image.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=300"
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="secondary" onClick={() => handleEditImage(actualIndex)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Image?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove "{image.title}" from the gallery.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteImage(actualIndex)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm truncate">{image.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{image.description}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {image.category}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No images found. Add some images to get started.</p>
            </div>
          )}
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
              <AlertDialogTitle>Reset Gallery?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset the gallery to the original defaults. This action cannot be undone.
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
