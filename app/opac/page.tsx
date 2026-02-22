"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useState } from "react"

export default function OpacPage() {
  const [showAlert, setShowAlert] = useState(false)

  const handleOpacAccess = () => {
    setShowAlert(true)
  }

  const openOpacInNewTab = () => {
    window.open('http://192.168.1.108', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Library OPAC</h1>
        <p className="text-muted-foreground">Access our Online Public Access Catalog</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Access OPAC</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <Button onClick={handleOpacAccess}>
              Access OPAC
            </Button>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Campus WiFi Required</AlertDialogTitle>
                <AlertDialogDescription>
                  The OPAC can only be accessed from the campus WiFi network. 
                  Please ensure you are connected to the campus wireless network before proceeding.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={openOpacInNewTab}>
                  Proceed to OPAC
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}