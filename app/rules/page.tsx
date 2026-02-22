import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { libraryData } from "@/data/library-data"

export default function RulesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Rules and Regulations</h1>
        <p className="text-muted-foreground">Guidelines for using the library facilities and resources</p>
      </div>

      <Card>
  <CardHeader>
    <CardTitle>General Rules</CardTitle>
    <CardDescription>Rules applicable to all library users</CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="list-disc pl-5 space-y-2">
      {libraryData.rules.general.map((rule, index) => (
        <li key={`rule-${index}`}>{rule}</li> 
      ))}
    </ul>
  </CardContent>
</Card>


      <Card>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Borrowing Rules</CardTitle>
          <CardDescription>Rules for borrowing books and materials</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {libraryData.rules.borrowing.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
          
      <Card>
        <CardHeader>
          <CardTitle>SC/ST Book Bank Facility</CardTitle>
         
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {libraryData.rules.bookbank.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Best Practice of the Library</CardTitle>
         
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {libraryData.rules.practice.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>   
    </div>
  )
}

