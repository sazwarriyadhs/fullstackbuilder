"use client"

import { Button } from "@/components/ui/button"
import { Card as UICard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface BuilderCanvasProps {
    components: any[];
    setComponents: (components: any[]) => void;
    onSelectComponent: (component: any) => void;
    selectedComponent: any;
}

const SortableItem = ({ component, onSelectComponent, selectedComponent }: { component: any, onSelectComponent: (c: any) => void, selectedComponent: any }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: component.id});
      
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

      const isSelected = selectedComponent?.id === component.id;

    const renderComponent = (component: any) => {
        const className = cn("cursor-grab active:cursor-grabbing", {
            "ring-2 ring-primary ring-offset-2": isSelected,
        });

        switch(component.type) {
            case 'heading':
                return <h1 onClick={() => onSelectComponent(component)} className={cn("text-4xl font-bold", className)}>Heading</h1>
            case 'text':
                return <p onClick={() => onSelectComponent(component)} className={className}>Text block</p>
            case 'button':
                return <Button onClick={() => onSelectComponent(component)} className={className}>Click Me</Button>
            case 'input':
                return <Input onClick={() => onSelectComponent(component)} placeholder="Text Input" className={cn("w-48", className)} />
            case 'card':
                return (
                    <UICard onClick={() => onSelectComponent(component)} className={cn("w-64", className)}>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card content goes here.</p>
                        </CardContent>
                    </UICard>
                )
            case 'image':
                 return (
                    <div onClick={() => onSelectComponent(component)} className={cn("w-48 h-32 relative", className)}>
                        <Image 
                            src="https://placehold.co/300x200.png"
                            alt="placeholder"
                            fill
                            className="bg-muted object-cover rounded-md"
                            data-ai-hint="placeholder"
                        />
                    </div>
                 )
            default:
                return null
        }
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {renderComponent(component)}
        </div>
    )
}

export default function BuilderCanvas({ components, setComponents, onSelectComponent, selectedComponent }: BuilderCanvasProps) {
    const {setNodeRef} = useDroppable({
        id: 'canvas',
    });

    const handleExport = () => {
        const design = {
          name: 'Untitled Design',
          components: components.map(({icon, ...rest}) => rest), // Remove icon before export
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

  return (
    <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-headline">Untitled Design</h1>
            <Button onClick={handleExport} variant="outline" disabled={components.length === 0}>
                <Download className="mr-2" />
                Export JSON
            </Button>
        </div>
        <UICard ref={setNodeRef} className="flex-1 w-full grid-bg">
            <div className="flex flex-wrap items-start justify-start p-4 gap-4 h-full">
                {components.length > 0 ? (
                    <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
                        {components.map((comp) => (
                           <SortableItem key={comp.id} component={comp} onSelectComponent={onSelectComponent} selectedComponent={selectedComponent} />
                        ))}
                    </SortableContext>
                ) : (
                    <div className="flex items-center justify-center h-full w-full">
                         <p className="text-muted-foreground text-lg">Drop components here</p>
                    </div>
                )}
            </div>
        </UICard>
      </div>
  )
}
