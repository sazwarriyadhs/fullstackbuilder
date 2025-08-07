
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
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
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={template.url} target="_blank" rel="noopener noreferrer">Use Template</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}
