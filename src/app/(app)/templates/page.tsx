
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

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/templates')
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch templates:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Template Gallery</h1>
        <p className="text-muted-foreground mt-2">
          Choose a template to get started with your new design.
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
                    <Link href={template.url} target="_blank" rel="noopener noreferrer">Use Template</Link>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Template</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit {template.title}</DialogTitle>
                        <DialogDescription>Update your design settings below.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input id="title" defaultValue={template.title} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Input id="description" defaultValue={template.description} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}
