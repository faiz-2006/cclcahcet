"use client"

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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

interface PolicyData {
  vision: string[]
  mission: string[]
  objectives: string[]
  generalpolicy: string[]
  finepolicy: []
}

interface PolicySectionProps {
  category: keyof PolicyData
  title: string
  description: string
  icon: React.ElementType
  items: string[]
  onAdd: (category: keyof PolicyData, value: string) => void
  onDelete: (category: keyof PolicyData, index: number) => void
  placeholder: string
  useTextarea?: boolean
}

export function PolicySection({
  category,
  title,
  description,
  icon: Icon,
  items,
  onAdd,
  onDelete,
  placeholder,
  useTextarea = false,
}: PolicySectionProps) {
  const [newValue, setNewValue] = useState("")

  const handleAdd = () => {
    if (!newValue.trim()) return
    onAdd(category, newValue)
    setNewValue("")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            Add {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {useTextarea ? (
            <div className="space-y-2">
              <Textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={placeholder}
                rows={3}
              />
              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={placeholder}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current {title} ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-3 flex-1">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm">{item}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-destructive shrink-0 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove this item from {title.toLowerCase()}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(category, index)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No items added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
