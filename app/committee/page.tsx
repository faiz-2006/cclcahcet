import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { libraryData } from "@/data/library-data"
import Image from "next/image"

export default function LibraryCommitteePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Library Committee</h1>
        <p className="text-muted-foreground">
          Information about the Library Committee, its members, and functions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Committee Members</CardTitle>
            <CardDescription>The governing body of our library</CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Position</th>
                  <th className="text-left py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {libraryData.members.map((member, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{member.position}</td>
                    <td className="py-3">{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Functions/ Activities Of Library Committee</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-7 space-y-2">
              {libraryData.functions.map((function_, index) => (
                <li key={index}>{function_}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>About The Committee</CardTitle>
          <CardDescription>Purpose and responsibilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{libraryData.aboutCommittee.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}