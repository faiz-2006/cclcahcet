import { Card, CardContent } from "@/components/ui/card"
import { libraryData } from "@/data/library-data"
import Image from "next/image"

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Library Gallery</h1>
        <p className="text-muted-foreground">Visual tour of our library facilities, events, and collections</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {libraryData.gallery.all.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{image.title}</h3>
                <p className="text-sm text-muted-foreground">{image.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{image.category}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}