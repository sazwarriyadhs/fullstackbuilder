"use client"

import { Button } from "@/components/ui/button"
import { Card as UICard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Undo2, Redo2, Save, FolderDown, Eye } from "lucide-react"
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
    designTitle: string;
}

const renderPreviewComponent = (component: Component) => {
    const props = component.props || {};
    switch(component.type) {
        case 'heading':
            return <h1 className="text-4xl font-bold">{props.text || 'Heading'}</h1>
        case 'text':
            return <p>{props.text || 'Blok teks'}</p>
        case 'button':
            return <Button>{props.text || 'Klik Saya'}</Button>
        case 'input':
            return <Input placeholder={props.placeholder || "Input teks"} className="w-48" />
        case 'card':
            return (
                <UICard className="w-64">
                    <CardHeader>
                        <CardTitle>{props.title || 'Judul Kartu'}</CardTitle>
                        <CardDescription>{props.description || 'Deskripsi Kartu'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{props.content || 'Konten kartu ada di sini.'}</p>
                    </CardContent>
                </UICard>
            )
        case 'image':
             return (
                <div className="w-48 h-32 relative">
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
            return <div className="p-2 border rounded-md bg-muted text-muted-foreground">Unknown Component: {component.type}</div>
    }
}


const SortableItem = ({ component, onSelectComponent, selectedComponent }: { component: Component, onSelectComponent: (c: Component | null) => void, selectedComponent: Component | null }) => {
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

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners} 
            onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(component);
            }}
            className={cn("cursor-grab active:cursor-grabbing p-1 rounded-md", {
                "ring-2 ring-primary ring-offset-2": isSelected,
            })}
        >
            {renderPreviewComponent(component)}
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
    canRedo,
    designTitle
}: BuilderCanvasProps) {
    const {setNodeRef} = useDroppable({
        id: 'canvas-dropzone',
    });

    const handleSave = () => {
        const designData = { title: designTitle, components };
        localStorage.setItem('design', JSON.stringify(designData));
    };
    
    const handleLoad = () => {
        const saved = localStorage.getItem('design');
        if (saved) {
            const designData = JSON.parse(saved);
            // This should be handled in the parent component to also set title
            // For now, just setting components
            setComponents(designData.components || []);
        }
    };
    

  return (
    <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-headline">{designTitle}</h1>
            <div className="flex items-center gap-2">
                <Button onClick={onUndo} variant="outline" size="icon" disabled={!canUndo} aria-label="Undo">
                    <Undo2 />
                </Button>
                <Button onClick={onRedo} variant="outline" size="icon" disabled={!canRedo} aria-label="Redo">
                    <Redo2 />
                </Button>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Eye className="mr-2" />
                             Pratinjau
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh]">
                        <DialogHeader>
                            <DialogTitle>Pratinjau Desain</DialogTitle>
                        </DialogHeader>
                        <div className="border rounded-md p-4 space-y-4 h-full overflow-auto bg-background">
                           {components.map(component => (
                             <div key={component.id} className="flex justify-start">
                               {renderPreviewComponent(component)}
                             </div>
                           ))}
                        </div>
                    </DialogContent>
                </Dialog>
                <Button onClick={handleSave} variant="outline">
                    <Save className="mr-2" />
                    Simpan
                </Button>
                 <Button onClick={handleLoad} variant="outline">
                    <FolderDown className="mr-2" />
                    Muat
                </Button>
            </div>
        </div>
        <UICard 
            ref={setNodeRef} 
            className="flex-1 w-full grid-bg overflow-auto" 
            onClick={() => onSelectComponent(null)}
        >
            <div className="p-4 h-full">
                {components.length > 0 ? (
                    <SortableContext items={components} strategy={verticalListSortingStrategy}>
                        <div className="flex flex-col items-start gap-4">
                            {components.map((comp) => (
                               <SortableItem key={comp.id} component={comp} onSelectComponent={onSelectComponent} selectedComponent={selectedComponent} />
                            ))}
                        </div>
                    </SortableContext>
                ) : (
                    <div className="flex items-center justify-center h-full w-full">
                         <p className="text-muted-foreground text-lg">Letakkan komponen di sini</p>
                    </div>
                )}
            </div>
        </UICard>
      </div>
  )
}
