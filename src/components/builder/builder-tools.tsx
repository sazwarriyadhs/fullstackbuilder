"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading1, Type, MousePointerClick, RectangleHorizontal, Pilcrow, ImageIcon } from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

const components = [
  { name: "Heading", icon: Heading1, type: 'heading' },
  { name: "Text", icon: Pilcrow, type: 'text' },
  { name: "Button", icon: MousePointerClick, type: 'button' },
  { name: "Input", icon: Type, type: 'input' },
  { name: "Card", icon: RectangleHorizontal, type: 'card' },
  { name: "Image", icon: ImageIcon, type: 'image' },
]

const DraggableTool = ({ component, onAddComponent }: {component: any, onAddComponent: (component: any) => void}) => {
    const {attributes, listeners, setNodeRef, isDragging} = useDraggable({
        id: `tool-${component.type}`,
        data: {
          isTool: true,
          component,
        },
      });

      return (
        <div 
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          onClick={() => onAddComponent(component)}
          className={cn(
            "flex items-center gap-3 p-2 rounded-md border hover:bg-muted cursor-grab",
            { "opacity-50 cursor-grabbing": isDragging }
          )}
        >
          <component.icon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">{component.name}</span>
        </div>
      )
}

export default function BuilderTools({ onAddComponent }: { onAddComponent: (component: any) => void }) {
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Components</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {components.map((component) => (
            <DraggableTool key={component.name} component={component} onAddComponent={onAddComponent} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
