"use client"

import { Button } from "@/components/ui/button"
import { Card as UICard, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Download } from "lucide-react"


interface BuilderCanvasProps {
    components: any[];
}

export default function BuilderCanvas({ components }: BuilderCanvasProps) {

    const handleExport = () => {
        const design = {
          name: 'Untitled Design',
          components: [
            { id: 'btn-1', type: 'button', text: 'Click me', styles: { padding: '10px', color: 'white' } },
            { id: 'input-1', type: 'input', placeholder: 'Enter text', styles: { padding: '8px' } }
          ],
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

    const renderComponent = (component: any, index: number) => {
        switch(component.type) {
            case 'button':
                return <Button key={index}>Click Me</Button>
            case 'input':
                return <Input key={index} placeholder="Text Input" />
            case 'card':
                return (
                    <UICard key={index} className="w-48">
                        <CardContent className="p-4">Card</CardContent>
                    </UICard>
                )
            case 'image':
                 return (
                    <Image 
                        key={index}
                        src="https://placehold.co/100x100.png"
                        alt="placeholder"
                        width={100}
                        height={100}
                        className="bg-muted"
                        data-ai-hint="placeholder"
                    />
                 )
            default:
                return null
        }
    }

  return (
    <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-headline">Untitled Design</h1>
            <Button onClick={handleExport} variant="outline">
                <Download className="mr-2" />
                Export JSON
            </Button>
        </div>
        <UICard className="flex-1 w-full grid-bg">
            <div className="flex flex-wrap items-start justify-start p-4 gap-4 h-full">
                {components.length > 0 ? (
                   components.map((comp, index) => renderComponent(comp, index))
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
