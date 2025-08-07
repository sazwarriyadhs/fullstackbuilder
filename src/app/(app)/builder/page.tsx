"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

import BuilderTools from "@/components/builder/builder-tools"
import BuilderCanvas from "@/components/builder/builder-canvas"
import PropertiesPanel from "@/components/builder/properties-panel"

export type Component = {
  id: string;
  type: string;
  name: string;
  props?: Record<string, any>;
};


export default function BuilderPage() {
  const searchParams = useSearchParams()
  const [components, setComponents] = useState<Component[]>([])
  const [designTitle, setDesignTitle] = useState("Untitled Design")
  const [history, setHistory] = useState<any[][]>([])
  const [future, setFuture] = useState<any[][]>([])
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)

  useEffect(() => {
    const templateData = searchParams.get('template');
    if (templateData) {
      try {
        const parsedTemplate = JSON.parse(decodeURIComponent(templateData));
        if (parsedTemplate.title) {
          setDesignTitle(parsedTemplate.title);
        }
        // Di masa depan, ini juga akan memuat komponen template
        // setComponents(parsedTemplate.components || []);
      } catch (error) {
        console.error("Gagal mem-parsing data template:", error);
      }
    }
  }, [searchParams]);

  const handleAddComponent = (component: any) => {
    const newComponent = { ...component, id: `${component.type}-${Date.now()}` }
    const newComponents = [...components, newComponent]
    setHistory([...history, components])
    setComponents(newComponents)
    setFuture([])
    handleSelectComponent(newComponent)
  }

  const handleSetComponents = (newComponents: any[] | ((prev: any[]) => any[])) => {
    const updatedComponents = typeof newComponents === 'function' ? newComponents(components) : newComponents;
    setHistory([...history, components]);
    setComponents(updatedComponents);
    setFuture([]);
  };

  const handleSelectComponent = (component: Component | null) => {
    setSelectedComponent(component)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.data.current?.isTool) {
      if (over) {
        handleAddComponent(active.data.current.component)
      }
      return
    }

    if (over && active.id !== over.id) {
      handleSetComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        if (oldIndex === -1 || newIndex === -1) {
          return items
        }
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleUndo = () => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setFuture([components, ...future])
    setComponents(prev)
    setHistory(history.slice(0, -1))
  }

  const handleRedo = () => {
    if (future.length === 0) return
    const next = future[0]
    setHistory([...history, components])
    setComponents(next)
    setFuture(future.slice(1))
  }

  const handleUpdateComponent = (id: string, newProps: any) => {
    handleSetComponents(prev => prev.map(c => c.id === id ? { ...c, props: { ...c.props, ...newProps } } : c));
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-[calc(100vh-theme(spacing.24))] w-full gap-6">
        <BuilderTools onAddComponent={handleAddComponent} />
        <BuilderCanvas
          components={components}
          setComponents={handleSetComponents}
          onSelectComponent={handleSelectComponent}
          selectedComponent={selectedComponent}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={history.length > 0}
          canRedo={future.length > 0}
          designTitle={designTitle}
        />
        <PropertiesPanel 
          selectedComponent={selectedComponent} 
          onUpdateComponent={handleUpdateComponent}
        />
      </div>
    </DndContext>
  )
}
