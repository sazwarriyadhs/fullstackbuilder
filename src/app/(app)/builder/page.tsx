"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, MousePointerClick, Type, RectangleHorizontal, Image as ImageIcon, Code, Eye } from "lucide-react"

export default function BuilderPage() {

  const handleExport = () => {
    const design = {
      name: 'Untitled Design',
      components: [
        { id: 'btn-1', type: 'button', text: 'Click me', styles: { padding: '10px', color: 'white' } },
        { id: 'input-1', type: 'input', placeholder: 'Enter text', styles: { padding: '8px' } }
      ],
      schema: {
        "users": {
          "id": "INT PRIMARY KEY",
          "name": "VARCHAR(255)",
          "email": "VARCHAR(255)"
        }
      }
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(design, null, 2))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "design.json";
    link.click();
  };

  const components = [
    { name: "Button", icon: MousePointerClick },
    { name: "Input", icon: Type },
    { name: "Card", icon: RectangleHorizontal },
    { name: "Image", icon: ImageIcon },
  ]
  
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

  return (
    <div className="flex h-[calc(100vh-theme(spacing.24))] w-full gap-6">
      <Card className="w-64 hidden lg:block">
        <CardHeader>
          <CardTitle>Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {components.map((component) => (
              <div key={component.name} className="flex items-center gap-3 p-2 rounded-md border hover:bg-muted cursor-grab active:cursor-grabbing">
                <component.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{component.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-headline">Untitled Design</h1>
            <Button onClick={handleExport} variant="outline">
                <Download className="mr-2" />
                Export JSON
            </Button>
        </div>
        <Card className="flex-1 w-full grid-bg">
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-lg">Drop components here</p>
            </div>
        </Card>
      </div>
      <Card className="w-80 hidden md:block">
        <Tabs defaultValue="properties" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-2">
            <TabsTrigger value="properties"><Eye className="mr-2 h-4 w-4"/> Properties</TabsTrigger>
            <TabsTrigger value="schema"><Code className="mr-2 h-4 w-4"/> Schema</TabsTrigger>
          </TabsList>
          <TabsContent value="properties" className="flex-1 overflow-y-auto p-4">
             <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Button Properties</h3>
                  <p className="text-sm text-muted-foreground">Selected: `primary-button`</p>
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
    </div>
  )
}
