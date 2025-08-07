
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  aiHint: string;
  url: string;
}

interface EditingTemplate {
  id: string;
  title: string;
  description: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTemplate, setEditingTemplate] = useState<EditingTemplate | null>(null);

  useEffect(() => {
    fetch('/api/templates')
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Gagal mengambil template:", error)
        setLoading(false)
      })
  }, [])

  const handleEditClick = (template: Template) => {
    setEditingTemplate({ id: template.id, title: template.title, description: template.description });
  };

  const handleSaveChanges = () => {
    if (editingTemplate) {
      setTemplates(currentTemplates =>
        currentTemplates.map(t =>
          t.id === editingTemplate.id ? { ...t, title: editingTemplate.title, description: editingTemplate.description } : t
        )
      );
      setEditingTemplate(null);
    }
  };

  const handleInputChange = (field: 'title' | 'description', value: string) => {
    if (editingTemplate) {
      setEditingTemplate({ ...editingTemplate, [field]: value });
    }
  };
  
  const createBuilderLink = (template: Template) => {
    const templateData = {
      id: template.id,
      title: template.title,
    };
    const serializedData = encodeURIComponent(JSON.stringify(templateData));
    return `/builder?template=${serializedData}`;
  };

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Galeri Template</h1>
        <p className="text-muted-foreground mt-2">
          Pilih template untuk memulai desain baru Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                   <Skeleton className="aspect-[3/2] w-full" />
                </CardHeader>
                <CardContent className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          : templates.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <CardHeader>
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="rounded-t-lg object-cover"
                      data-ai-hint={template.aiHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription className="mt-2">{template.description}</CardDescription>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button className="w-full" asChild>
                    <Link href={createBuilderLink(template)}>Gunakan Template</Link>
                  </Button>
                  <Dialog onOpenChange={(isOpen) => !isOpen && setEditingTemplate(null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => handleEditClick(template)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Template</span>
                      </Button>
                    </DialogTrigger>
                    {editingTemplate && editingTemplate.id === template.id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit {template.title}</DialogTitle>
                          <DialogDescription>Perbarui pengaturan desain Anda di bawah ini.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                              Judul
                            </Label>
                            <Input
                              id="title"
                              value={editingTemplate.title}
                              onChange={(e) => handleInputChange('title', e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Deskripsi
                            </Label>
                            <Input
                              id="description"
                              value={editingTemplate.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleSaveChanges}>Simpan perubahan</Button>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}
