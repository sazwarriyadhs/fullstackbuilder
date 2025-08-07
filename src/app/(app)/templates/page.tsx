import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function TemplatesPage() {
  const templates = [
    {
      title: "E-commerce Dashboard",
      description: "A comprehensive dashboard for managing online sales, products, and customers.",
      image: "https://placehold.co/600x400.png",
      aiHint: "dashboard analytics",
      url: "https://github.com/creativetimofficial/argon-dashboard"
    },
    {
      title: "SaaS Landing Page",
      description: "A modern and clean landing page template for your software as a service.",
      image: "https://placehold.co/600x400.png",
      aiHint: "website landing",
      url: "https://github.com/cruip/tailwind-landing-page-template"
    },
    {
      title: "Project Management App",
      description: "A template for a Kanban-style project management application.",
      image: "https://placehold.co/600x400.png",
      aiHint: "kanban board",
      url: "https://github.com/satansdeer/kanban-board"
    },
    {
      title: "Blog Layout",
      description: "A classic and readable layout for a personal or company blog.",
      image: "https://placehold.co/600x400.png",
      aiHint: "minimalist blog",
      url: "https://github.com/vercel/next.js/tree/canary/examples/blog"
    },
    {
      title: "Social Media Profile",
      description: "A profile page design suitable for a social networking application.",
      image: "https://placehold.co/600x400.png",
      aiHint: "social profile",
      url: "https://github.com/pheralb/next-profile"
    },
    {
      title: "Portfolio Website",
      description: "Showcase your work with this stylish and minimalist portfolio template.",
      image: "https://placehold.co/600x400.png",
      aiHint: "creative portfolio",
      url: "https://github.com/smakosh/portfolio-dev"
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Template Gallery</h1>
        <p className="text-muted-foreground mt-2">
          Choose a template to get started with your new design.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.title} className="flex flex-col">
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
