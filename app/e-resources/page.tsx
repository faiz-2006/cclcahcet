"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { libraryData } from "@/data/library-data"
import { Button } from "@/components/ui/button"
import { ExternalLink, X, Copy } from "lucide-react"
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function EResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // DELNET credentials
  const credentials = {
    username: "tncahcet",
    password: "cah3754"
  };

  interface ModalEventHandler {
    preventDefault: () => void;
  }

  const openModal = (e: ModalEventHandler): void => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  interface CopyToClipboardProps {
    text: string;
  }

  const copyToClipboard = ({ text }: CopyToClipboardProps): void => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleContinue = () => {
    window.open(libraryData.eResources.delnet.url, "_blank");
    closeModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">E-Resources</h1>
        <p className="text-muted-foreground"><b>Our Institution is a member of DELNET E-Consortium.</b></p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>DELNET</CardTitle>
            <CardDescription>Developing Library Network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {libraryData.eResources.delnet.description}
              IP Range: {libraryData.eResources.delnet.ipRange}
            </p>
            <div className="flex items-center gap-4">
              <Button onClick={openModal}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Access DELNET
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Screen Modal for displaying credentials */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">DELNET Access Credentials</h2>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Use these credentials to log in to the DELNET portal.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Username</p>
                    <p className="text-lg font-mono">{credentials.username}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard({ text: credentials.username })}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Password</p>
                    <p className="text-lg font-mono">{credentials.password}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard({ text: credentials.password })}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleContinue} className="w-full">
                Continue to DELNET
              </Button>
              
              <p className="text-sm text-gray-500 text-center">
                After clicking, you will be redirected to the DELNET portal where you can enter these credentials.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}