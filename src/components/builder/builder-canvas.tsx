"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Download, Eye, FolderDown, Redo2, Save, Undo2, Upload } from "lucide-react";
import React, { useRef } from "react"
import type { Component } from "@/app/(app)/builder/page";
import { useToast } from "@/hooks/use-toast";
import JSZip from 'jszip';
import { renderPreviewComponent } from "./component-renderer";

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
            className={`cursor-grab active:cursor-grabbing p-1 rounded-md ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
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
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

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

    const handleDownload = async () => {
        const response = await fetch('/api/download', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: designTitle, components }),
        });
    
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${designTitle.toLowerCase().replace(/\s+/g, '-')}.zip`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Failed to download design');
        }
    };
    
    const handleUploadClick = () => {
        uploadInputRef.current?.click();
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/zip') {
            toast({
                variant: 'destructive',
                title: 'Invalid File Type',
                description: 'Please upload a .zip file.',
            });
            return;
        }

        const zip = new JSZip();
        try {
            const content = await zip.loadAsync(file);
            const componentsFile = content.file('components.json');
            if (componentsFile) {
                const componentsJson = await componentsFile.async('string');
                const { components: loadedComponents } = JSON.parse(componentsJson);
                setComponents(loadedComponents);
                toast({
                    title: 'Upload Successful',
                    description: 'Your design has been loaded into the builder.',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Zip File',
                    description: 'The zip file must contain a "components.json" file.',
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Upload Failed',
                description: 'There was an error processing your zip file.',
            });
            console.error("Failed to upload and process zip file:", error);
        }

        // Reset the input value to allow uploading the same file again
        event.target.value = '';
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
                <input
                    type="file"
                    ref={uploadInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".zip"
                />
                <Button onClick={handleUploadClick} variant="outline">
                    <Upload className="mr-2" />
                    Unggah
                </Button>
                <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2" />
                    Unduh
                </Button>
            </div>
        </div>
        <Card
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
        </Card>
      </div>
  )
}
