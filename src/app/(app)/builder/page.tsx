"use client"

import { useState } from "react"
import BuilderTools from "@/components/builder/builder-tools"
import BuilderCanvas from "@/components/builder/builder-canvas"
import PropertiesPanel from "@/components/builder/properties-panel"

export default function BuilderPage() {
    const [components, setComponents] = useState<any[]>([]);

    const handleAddComponent = (component: any) => {
        setComponents(prev => [...prev, component]);
    }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.24))] w-full gap-6">
      <BuilderTools onAddComponent={handleAddComponent} />
      <BuilderCanvas components={components} />
      <PropertiesPanel />
    </div>
  )
}
