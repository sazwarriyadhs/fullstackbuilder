"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MousePointerClick, Type, RectangleHorizontal, Image as ImageIcon } from "lucide-react"

const components = [
  { name: "Button", icon: MousePointerClick, type: 'button' },
  { name: "Input", icon: Type, type: 'input' },
  { name: "Card", icon: RectangleHorizontal, type: 'card' },
  { name: "Image", icon: ImageIcon, type: 'image' },
]

interface BuilderToolsProps {
  onAddComponent: (component: any) => void;
}

export default function BuilderTools({ onAddComponent }: BuilderToolsProps) {
  return (
    <Card className="w-64 hidden lg:block">
      <CardHeader>
        <CardTitle>Components</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {components.map((component) => (
            <div 
              key={component.name} 
              className="flex items-center gap-3 p-2 rounded-md border hover:bg-muted cursor-grab active:cursor-grabbing"
              onClick={() => onAddComponent(component)}
            >
              <component.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{component.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
