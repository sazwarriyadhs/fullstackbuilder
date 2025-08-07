"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading1, Type, MousePointerClick, RectangleHorizontal, Pilcrow, ImageIcon, Youtube, Minus, GalleryVertical, ChevronDownSquare, AppWindow, MessageCircle, CheckSquare, CircleDot, ChevronDown, SlidersHorizontal, PanelTop, PanelBottom, List, Star, GanttChartSquare, Calendar, TableIcon, FormInputIcon, Map, LocateFixed } from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const components = [
  { name: "Heading", icon: Heading1, type: 'heading' },
  { name: "Text", icon: Pilcrow, type: 'text' },
  { name: "Button", icon: MousePointerClick, type: 'button' },
  { name: "Input", icon: Type, type: 'input' },
  { name: "Card", icon: RectangleHorizontal, type: 'card' },
  { name: "Image", icon: ImageIcon, type: 'image' },
  { name: "Video", icon: Youtube, type: 'video' },
  { name: "Divider", icon: Minus, type: 'divider' },
  { name: "Tabs", icon: GalleryVertical, type: 'tabs' },
  { name: "Accordion", icon: ChevronDownSquare, type: 'accordion' },
  { name: "Modal", icon: AppWindow, type: 'modal' },
  { name: "Tooltip", icon: MessageCircle, type: 'tooltip' },
  { name: "Checkbox", icon: CheckSquare, type: 'checkbox' },
  { name: "Radio Group", icon: CircleDot, type: 'radio' },
  { name: "Select", icon: ChevronDown, type: 'select' },
  { name: "Slider", icon: SlidersHorizontal, type: 'slider' },
  { name: "Form", icon: FormInputIcon, type: 'form' },
  { name: "Table", icon: TableIcon, type: 'table' },
  { name: "List", icon: List, type: 'list' },
  { name: "Navbar", icon: PanelTop, type: 'navbar' },
  { name: "Footer", icon: PanelBottom, type: 'footer' },
  { name: "Date Picker", icon: Calendar, type: 'datepicker' },
  { name: "Chart", icon: GanttChartSquare, type: 'chart' },
  { name: "Rating", icon: Star, type: 'rating' },
  { name: "Map", icon: Map, type: 'map' },
  { name: "GPS Location", icon: LocateFixed, type: 'gps' },
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
