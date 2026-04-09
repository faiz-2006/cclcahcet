"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail } from "lucide-react"
import { getContactData, getLibraryHours } from "@/lib/data-service"
import { libraryData } from "@/data/library-data"

export default function ContactPage() {
  const [contact, setContact] = useState({
    address: "C. Abdul Hakeem College of Engineering & Technology, Melvisharam - 632 509, Ranipet Dt., Tamil Nadu, India",
    phone: "+91-4172-266850",
    email: "library@cahcet.edu.in",
    website: "https://cahcet.edu.in",
    mapEmbed: "",
    workingHours: "Monday - Saturday: 8:00 AM - 8:00 PM",
    librarian: {
      name: "A. Fahim Sheriff",
      designation: "Librarian",
      email: "librarian@cahcet.edu.in",
      phone: "+91-4172-267387",
    },
  })
  const [hours, setHours] = useState(libraryData.hours)

  useEffect(() => {
    const loadData = async () => {
      const [c, h] = await Promise.all([getContactData(), getLibraryHours()])
      setContact(c)
      setHours(h)
    }
    loadData()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground">
          We're here to help. Reach out to us with any questions or inquiries.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How to reach our library</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="font-medium">College Library Address</p>
                <p className="text-sm text-muted-foreground">
                  {contact.address}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-sm text-muted-foreground">
                  {contact.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {contact.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form below</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Enter the subject of your message" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Type your message here" 
                  rows={4} 
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operating Hours</CardTitle>
          <CardDescription>When you can visit or contact us</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {hours.map((hour, index) => (
              <div key={index} className="rounded-lg border p-4">
                <h3 className="font-medium">{hour.day}</h3>
                <p className="mt-2 text-sm">{hour.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}