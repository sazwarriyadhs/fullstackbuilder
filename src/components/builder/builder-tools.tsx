"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { componentCategories } from "./component-list"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
            "flex items-center gap-3 p-2 rounded-md border bg-background hover:bg-muted cursor-grab",
            { "opacity-50 cursor-grabbing": isDragging }
          )}
        >
          <component.icon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">{component.name}</span>
        </div>
      )
}

export default function BuilderTools({ onAddComponent }: { onAddComponent: (component: any) => void }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Components</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <Accordion type="multiple" defaultValue={componentCategories.map(c => c.name)} className="w-full">
          {componentCategories.map((category) => (
            <AccordionItem value={category.name} key={category.name}>
              <AccordionTrigger className="px-4 py-2 text-sm font-medium">{category.name}</AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="grid gap-2">
                  {category.components.map((component) => (
                    <DraggableTool key={component.name} component={component} onAddComponent={onAddComponent} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
