"use client";
import React, { useState, useEffect } from 'react';
import { journalData, departments, Journal } from '@/data/journals-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, GraduationCap, Filter } from 'lucide-react';

const JournalsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [filteredJournals, setFilteredJournals] = useState<Journal[]>(journalData);

  // Filter journals when any filter criteria changes
  useEffect(() => {
    let result = journalData;
    
    // Filter by journal type (national/international)
    if (activeTab !== "all") {
      result = result.filter(journal => 
        journal.type === (activeTab === "national" ? "National" : "International")
      );
    }
    
    // Filter by department
    if (selectedDepartment !== "all") {
      result = result.filter(journal => journal.department === selectedDepartment);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(journal => 
        journal.name.toLowerCase().includes(query) || 
        journal.department.toLowerCase().includes(query)
      );
    }
    
    setFilteredJournals(result);
  }, [activeTab, searchQuery, selectedDepartment]);

  // Group journals by department
  const journalsByDepartment = departments.reduce((acc, department) => {
    const departmentJournals = filteredJournals.filter(journal => journal.department === department);
    if (departmentJournals.length > 0) {
      acc[department] = departmentJournals;
    }
    return acc;
  }, {} as Record<string, Journal[]>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <BookOpen className="mr-2 h-8 w-8" />
          Academic Journals Collection
        </h1>
        <p className="text-muted-foreground">
          Browse our comprehensive collection of National and International journals across various departments.
        </p>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Search & Filter Journals
          </CardTitle>
          <CardDescription>Find specific journals by name, type, or department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search journals..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for National/International */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Journals</TabsTrigger>
          <TabsTrigger value="national">National</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              {activeTab === "all" ? "All" : activeTab === "national" ? "National" : "International"} Journals
            </h2>
            <Badge variant="outline" className="ml-2">
              {filteredJournals.length} Journals Found
            </Badge>
          </div>

          {/* Journals Display */}
          {Object.keys(journalsByDepartment).length > 0 ? (
            <div className="space-y-6 mt-4">
              {Object.entries(journalsByDepartment).map(([department, journals]) => (
                <Card key={department} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="bg-muted/50">
                    <CardTitle className="text-lg">{department}</CardTitle>
                    <CardDescription>{journals.length} journals available</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ScrollArea className="h-64 rounded-md">
                      <div className="grid gap-2">
                        {journals.map((journal, index) => (
                          <div 
                            key={index} 
                            className="p-3 rounded-lg border bg-card hover:bg-accent/20 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div className="text-sm">{journal.name}</div>
                              <Badge variant={journal.type === "National" ? "default" : "secondary"} className="ml-2">
                                {journal.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <h3 className="text-xl font-medium">No journals found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default JournalsPage;