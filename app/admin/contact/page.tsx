"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, RotateCcw, Contact, Phone, Mail, MapPin, Globe, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
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

interface ContactData {
  address: string
  phone: string
  email: string
  website: string
  mapEmbed: string
  workingHours: string
  librarian: {
    name: string
    designation: string
    email: string
    phone: string
  }
}

const defaultContactData: ContactData = {
  address: "C. Abdul Hakeem College of Engineering & Technology, Melvisharam - 632 509, Ranipet Dt., Tamil Nadu, India",
  phone: "+91-4172-266850",
  email: "library@cahcet.edu.in",
  website: "https://cahcet.edu.in",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.123456789!2d79.123456!3d12.789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQ3JzIwLjQiTiA3OcKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890",
  workingHours: "Monday - Saturday: 8:00 AM - 8:00 PM",
  librarian: {
    name: "A. Fahim Sheriff",
    designation: "Librarian",
    email: "librarian@cahcet.edu.in",
    phone: "+91-9876543210"
  }
}

export default function ContactPage() {
  const { toast } = useToast()
  const [contactData, setContactData] = useState<ContactData>(defaultContactData)

  useEffect(() => {
    const savedData = localStorage.getItem("contactData")
    if (savedData) {
      setContactData(JSON.parse(savedData))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("contactData", JSON.stringify(contactData))
    toast({
      title: "Contact Info Saved",
      description: "Contact information has been updated successfully.",
    })
  }

  const handleReset = () => {
    setContactData(defaultContactData)
    localStorage.setItem("contactData", JSON.stringify(defaultContactData))
    toast({
      title: "Contact Info Reset",
      description: "Contact information has been reset to defaults.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact Information</h1>
        <p className="text-muted-foreground">
          Manage library contact details and location information.
        </p>
      </div>

      {/* General Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Contact className="h-5 w-5" />
            General Contact Information
          </CardTitle>
          <CardDescription>
            Main contact details displayed on the contact page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Address
            </Label>
            <Textarea
              value={contactData.address}
              onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
              placeholder="Enter full address"
              rows={2}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone Number
              </Label>
              <Input
                value={contactData.phone}
                onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                placeholder="+91-XXXXX-XXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Address
              </Label>
              <Input
                type="email"
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                placeholder="library@example.edu.in"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Website
              </Label>
              <Input
                value={contactData.website}
                onChange={(e) => setContactData({ ...contactData, website: e.target.value })}
                placeholder="https://example.edu.in"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Working Hours
              </Label>
              <Input
                value={contactData.workingHours}
                onChange={(e) => setContactData({ ...contactData, workingHours: e.target.value })}
                placeholder="Monday - Saturday: 8:00 AM - 8:00 PM"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Librarian Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Librarian Contact</CardTitle>
          <CardDescription>Contact details for the head librarian</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={contactData.librarian.name}
                onChange={(e) => setContactData({ 
                  ...contactData, 
                  librarian: { ...contactData.librarian, name: e.target.value } 
                })}
                placeholder="Enter librarian name"
              />
            </div>
            <div className="space-y-2">
              <Label>Designation</Label>
              <Input
                value={contactData.librarian.designation}
                onChange={(e) => setContactData({ 
                  ...contactData, 
                  librarian: { ...contactData.librarian, designation: e.target.value } 
                })}
                placeholder="e.g., Head Librarian, Librarian"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={contactData.librarian.email}
                onChange={(e) => setContactData({ 
                  ...contactData, 
                  librarian: { ...contactData.librarian, email: e.target.value } 
                })}
                placeholder="librarian@example.edu.in"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={contactData.librarian.phone}
                onChange={(e) => setContactData({ 
                  ...contactData, 
                  librarian: { ...contactData.librarian, phone: e.target.value } 
                })}
                placeholder="+91-XXXXXXXXXX"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Embed */}
      <Card>
        <CardHeader>
          <CardTitle>Location Map</CardTitle>
          <CardDescription>
            Google Maps embed URL for the contact page. Get the embed URL from Google Maps by clicking "Share" → "Embed a map"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Google Maps Embed URL</Label>
            <Textarea
              value={contactData.mapEmbed}
              onChange={(e) => setContactData({ ...contactData, mapEmbed: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
              rows={3}
            />
          </div>

          {contactData.mapEmbed && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg overflow-hidden">
                <iframe
                  src={contactData.mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
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
              <AlertDialogTitle>Reset Contact Info?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all contact information to the original defaults. This action cannot be undone.
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
