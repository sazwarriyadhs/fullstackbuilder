"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Eye } from "lucide-react"
import { Component } from "@/app/(app)/builder/page"
import React, { useEffect, useState } from "react"

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
  selectedComponent: Component | null;
  onUpdateComponent: (id: string, newProps: any) => void;
}

const commonFields = [
  { id: "text", label: "Text", forTypes: ["heading", "text", "button"] },
  { id: "placeholder", label: "Placeholder", forTypes: ["input"] },
]

const componentFields: Record<string, { id: string; label: string }[]> = {
  card: [
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
    { id: "content", label: "Content" },
  ],
  image: [
      { id: "src", label: "Image URL" },
      { id: "alt", label: "Alt Text" },
      { id: "aiHint", label: "AI Hint" },
  ]
}

export default function PropertiesPanel({ selectedComponent, onUpdateComponent }: PropertiesPanelProps) {
  // Use a local state to manage input changes to avoid re-rendering the whole tree on every keystroke
  const [localProps, setLocalProps] = useState(selectedComponent?.props || {});

  useEffect(() => {
    setLocalProps(selectedComponent?.props || {});
  }, [selectedComponent]);

  const handleInputChange = (fieldId: string, value: string) => {
    setLocalProps(currentProps => ({ ...currentProps, [fieldId]: value }));
  }

  const handleBlur = (fieldId: string) => {
    if (selectedComponent && localProps[fieldId] !== selectedComponent.props?.[fieldId]) {
      onUpdateComponent(selectedComponent.id, { [fieldId]: localProps[fieldId] });
    }
  }

  const renderProperties = () => {
    if (!selectedComponent) {
      return (
        <div className="flex items-center justify-center h-full p-4 text-center">
          <p className="text-muted-foreground">Pilih komponen untuk diedit propertinya</p>
        </div>
      )
    }

    const fields = [
      ...commonFields.filter(f => f.forTypes.includes(selectedComponent.type)),
      ...(componentFields[selectedComponent.type] || [])
    ];
    
    return (
      <div className="space-y-6 p-4">
        <div>
          <h3 className="text-lg font-medium capitalize">{selectedComponent.type} Properties</h3>
          <p className="text-sm text-muted-foreground break-all">ID: `{selectedComponent.id}`</p>
        </div>
        {fields.length > 0 ? (
          <div className="space-y-4">
            {fields.map(field => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input 
                  id={field.id} 
                  value={localProps[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  onBlur={() => handleBlur(field.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Tidak ada properti yang dapat diedit untuk komponen ini.</p>
        )}
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
          <TabsContent value="properties" className="flex-1 overflow-y-auto">
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
