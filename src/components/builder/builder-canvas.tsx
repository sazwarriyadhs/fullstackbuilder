"use client"

import { Button } from "@/components/ui/button"
import { Card as UICard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Undo2, Redo2, Save, FolderDown, Eye, Download, Upload, Star, LocateFixed } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Component } from "@/app/(app)/builder/page";
import React, { useRef } from "react";
import JSZip from 'jszip';
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Label } from "@/components/ui/label";

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
        case 'video':
            return <iframe width="260" height="145" src={props.src || "https://www.youtube.com/embed/dQw4w9WgXcQ"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
        case 'divider':
            return <Separator className="my-4" />;
        case 'tabs':
            return (
                <Tabs defaultValue="tab1" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="tab1">{props.tab1Title || 'Tab 1'}</TabsTrigger>
                        <TabsTrigger value="tab2">{props.tab2Title || 'Tab 2'}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">{props.tab1Content || 'Konten Tab 1 di sini.'}</TabsContent>
                    <TabsContent value="tab2">{props.tab2Content || 'Konten Tab 2 di sini.'}</TabsContent>
                </Tabs>
            );
        case 'accordion':
            return (
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>{props.triggerText || 'Apakah ini dapat diakses?'}</AccordionTrigger>
                        <AccordionContent>{props.contentText || 'Ya. Itu sesuai dengan standar WAI-ARIA.'}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        case 'modal':
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">{props.buttonText || 'Buka Dialog'}</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{props.title || 'Judul Dialog'}</DialogTitle>
                            <DialogDescription>{props.description || 'Deskripsi dialog di sini.'}</DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
        case 'tooltip':
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">Arahkan kursor ke saya</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{props.text || 'Ini adalah tooltip'}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        case 'checkbox':
            return (
                <div className="flex items-center space-x-2">
                    <Checkbox id={`checkbox-${component.id}`} />
                    <Label htmlFor={`checkbox-${component.id}`}>{props.label || 'Terima syarat dan ketentuan'}</Label>
                </div>
            );
        case 'radio':
            return (
                <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id={`r1-${component.id}`} />
                        <Label htmlFor={`r1-${component.id}`}>{props.option1Label || 'Opsi Satu'}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id={`r2-${component.id}`} />
                        <Label htmlFor={`r2-${component.id}`}>{props.option2Label || 'Opsi Dua'}</Label>
                    </div>
                </RadioGroup>
            );
        case 'select':
            return (
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={props.placeholder || 'Pilih buah'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="apple">{props.item1 || 'Apel'}</SelectItem>
                        <SelectItem value="banana">{props.item2 || 'Pisang'}</SelectItem>
                        <SelectItem value="blueberry">{props.item3 || 'Blueberry'}</SelectItem>
                    </SelectContent>
                </Select>
            );
        case 'slider':
            return <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />;
        case 'form':
            return (
                <div className="border p-4 rounded-md w-80 space-y-4">
                    <h3 className="font-medium">{props.title || 'Formulir Pendaftaran'}</h3>
                    <Input placeholder={props.input1Placeholder || "Nama"}/>
                    <Input placeholder={props.input2Placeholder || "Email"}/>
                    <Button>{props.buttonText || 'Kirim'}</Button>
                </div>
            )
        case 'table':
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{props.col1 || 'Kolom 1'}</TableHead>
                            <TableHead>{props.col2 || 'Kolom 2'}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>{props.row1col1 || 'Data 1A'}</TableCell>
                            <TableCell>{props.row1col2 || 'Data 1B'}</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>{props.row2col1 || 'Data 2A'}</TableCell>
                            <TableCell>{props.row2col2 || 'Data 2B'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
        case 'list':
            return (
                <ul className="list-disc pl-5 space-y-1">
                    <li>{props.item1 || 'Item 1'}</li>
                    <li>{props.item2 || 'Item 2'}</li>
                    <li>{props.item3 || 'Item 3'}</li>
                </ul>
            );
        case 'navbar':
            return (
                <div className="w-full p-2 bg-primary text-primary-foreground rounded-md flex justify-between items-center">
                    <span>{props.title || 'Logo'}</span>
                    <div className="space-x-4">
                        <Button variant="link" className="text-primary-foreground">{props.link1 || 'Beranda'}</Button>
                        <Button variant="link" className="text-primary-foreground">{props.link2 || 'Tentang'}</Button>
                        <Button variant="link" className="text-primary-foreground">{props.link3 || 'Kontak'}</Button>
                    </div>
                </div>
            );
        case 'footer':
             return (
                <div className="w-full p-2 bg-muted text-muted-foreground rounded-md text-center">
                    <p>{props.text || '© 2024 Hak Cipta Dilindungi'}</p>
                </div>
            );
        case 'datepicker':
            return <Calendar mode="single" className="rounded-md border" />;
        case 'chart':
            const data = [
                { name: props.bar1Name || "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
                { name: props.bar2Name || "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
                { name: props.bar3Name || "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
            ];
            return (
                <div className="w-[300px] h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Bar dataKey="total" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        case 'rating':
            return (
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={i <= (props.stars || 3) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}/>
                    ))}
                </div>
            );
        case 'map':
            return (
                <iframe
                  width="300"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={props.src || "https://www.openstreetmap.org/export/embed.html?bbox=-74.0059,40.7128,-73.9959,40.7228&layer=mapnik"}>
                </iframe>
            );
        case 'gps':
            return <Button variant="outline"><LocateFixed className="mr-2"/>{props.text || 'Dapatkan Lokasi'}</Button>;
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
