import type { Component } from "@/app/(app)/builder/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LocateFixed, Star } from "lucide-react";
import Image from "next/image";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

export const renderPreviewComponent = (component: Component) => {
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
                <Card className="w-64">
                    <CardHeader>
                        <CardTitle>{props.title || 'Judul Kartu'}</CardTitle>
                        <CardDescription>{props.description || 'Deskripsi Kartu'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{props.content || 'Konten kartu ada di sini.'}</p>
                    </CardContent>
                </Card>
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
                            <Bar dataKey="total" fill="hsl(var(--primary))" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        case 'rating':
            return (
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={i < (props.stars || 3) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}/>
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
