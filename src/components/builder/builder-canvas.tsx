"use client"

import { Button } from "@/components/ui/button"
import { Card as UICard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Download, Undo2, Redo2, Save, FolderDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Component } from "@/app/(app)/builder/page";

interface BuilderCanvasProps {
    components: Component[];
    setComponents: (components: Component[] | ((prev: Component[]) => Component[])) => void;
    onSelectComponent: (component: Component | null) => void;
    selectedComponent: Component | null;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

const SortableItem = ({ component, onSelectComponent, selectedComponent }: { component: Component, onSelectComponent: (c: Component) => void, selectedComponent: Component | null }) => {
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

    const renderComponent = (component: Component) => {
        const className = cn("cursor-grab active:cursor-grabbing", {
            "ring-2 ring-primary ring-offset-2": isSelected,
        });

        const props = component.props || {};

        switch(component.type) {
            case 'heading':
                return <h1 onClick={() => onSelectComponent(component)} className={cn("text-4xl font-bold", className)}>{props.text || 'Heading'}</h1>
            case 'text':
                return <p onClick={() => onSelectComponent(component)} className={className}>{props.text || 'Text block'}</p>
            case 'button':
                return <Button onClick={() => onSelectComponent(component)} className={className}>{props.text || 'Click Me'}</Button>
            case 'input':
                return <Input onClick={() => onSelectComponent(component)} placeholder={props.placeholder || "Text Input"} className={cn("w-48", className)} />
            case 'card':
                return (
                    <UICard onClick={() => onSelectComponent(component)} className={cn("w-64", className)}>
                        <CardHeader>
                            <CardTitle>{props.title || 'Card Title'}</CardTitle>
                            <CardDescription>{props.description || 'Card Description'}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{props.content || 'Card content goes here.'}</p>
                        </CardContent>
                    </UICard>
                )
            case 'image':
                 return (
                    <div onClick={() => onSelectComponent(component)} className={cn("w-48 h-32 relative", className)}>
                        <Image 
                            src={props.src || "https://placehold.co/300x200.png"}
                            alt={props.alt || "placeholder"}
                            fill
                            className="bg-muted object-cover rounded-md"
                            data-ai-hint={props.aiHint || "placeholder"}
                        />
                    </div>
                 )
            default:
                return null
        }
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={() => onSelectComponent(component)}>
            {renderComponent(component)}
        </div>
    )
}

export default function BuilderCanvas({ 
    components, 
    setComponents, 
    onSelectComponent, 
    selectedComponent,
    onUndo,
    onRedo,
    canUndo,
    canRedo
}: BuilderCanvasProps) {
    const {setNodeRef} = useDroppable({
        id: 'canvas',
    });

    const handleSave = () => {
        localStorage.setItem('design', JSON.stringify(components));
    };
    
    const handleLoad = () => {
        const saved = localStorage.getItem('design');
        if (saved) {
            setComponents(JSON.parse(saved));
        }
    };
    

  return (
    <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-headline">Untitled Design</h1>
            <div className="flex items-center gap-2">
                <Button onClick={onUndo} variant="outline" size="icon" disabled={!canUndo}>
                    <Undo2 />
                    <span className="sr-only">Undo</span>
                </Button>
                <Button onClick={onRedo} variant="outline" size="icon" disabled={!canRedo}>
                    <Redo2 />
                    <span className="sr-only">Redo</span>
                </Button>
                <Button onClick={handleSave} variant="outline">
                    <Save className="mr-2" />
                    Save
                </Button>
                 <Button onClick={handleLoad} variant="outline">
                    <FolderDown className="mr-2" />
                    Load
                </Button>
            </div>
        </div>
        <UICard ref={setNodeRef} className="flex-1 w-full grid-bg" onClick={() => onSelectComponent(null)}>
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
