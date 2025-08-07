"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Eye } from "lucide-react"

const designSchema = `{
  "users": {
    "id": {
      "type": "integer",
      "primaryKey": true,
      "autoIncrement": true
    },
    "name": {
      "type": "string",
      "maxLength": 255
    },
    "email": {
      "type": "string",
      "unique": true
    },
    "createdAt": {
      "type": "datetime",
      "default": "now()"
    }
  }
}`

interface PropertiesPanelProps {
  selectedComponent: any;
}

export default function PropertiesPanel({ selectedComponent }: PropertiesPanelProps) {

  const renderProperties = () => {
    if (!selectedComponent) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Select a component to edit</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium capitalize">{selectedComponent.type} Properties</h3>
          <p className="text-sm text-muted-foreground">Selected: `{selectedComponent.name}`</p>
        </div>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="text">Text</Label>
                <Input id="text" defaultValue="Get Started"/>
            </div>
              <div className="space-y-2">
                <Label htmlFor="color">Background Color</Label>
                <Input id="color" defaultValue="#3F51B5"/>
            </div>
              <div className="space-y-2">
                <Label htmlFor="padding">Padding</Label>
                <Input id="padding" defaultValue="12px 24px"/>
            </div>
              <div className="space-y-2">
                <Label htmlFor="border-radius">Border Radius</Label>
                <Input id="border-radius" defaultValue="8px"/>
            </div>
        </div>
      </div>
    )
  }


  return (
    <Card className="w-80 hidden md:block">
        <Tabs defaultValue="properties" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-2">
            <TabsTrigger value="properties"><Eye className="mr-2 h-4 w-4"/> Properties</TabsTrigger>
            <TabsTrigger value="schema"><Code className="mr-2 h-4 w-4"/> Schema</TabsTrigger>
          </TabsList>
          <TabsContent value="properties" className="flex-1 overflow-y-auto p-4">
             {renderProperties()}
          </TabsContent>
          <TabsContent value="schema" className="flex-1 overflow-y-auto p-4 bg-muted/50 rounded-b-lg">
             <div className="space-y-4">
                 <div>
                    <h3 className="text-lg font-medium">Design Schema</h3>
                    <p className="text-sm text-muted-foreground">Database schema for the design.</p>
                </div>
                <pre className="bg-background p-3 rounded-md text-xs overflow-x-auto">
                    <code>{designSchema}</code>
                </pre>
             </div>
          </TabsContent>
        </Tabs>
      </Card>
  )
}
