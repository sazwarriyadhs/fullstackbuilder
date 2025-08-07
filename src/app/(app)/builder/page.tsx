"use client"

import { useState } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

import BuilderTools from "@/components/builder/builder-tools"
import BuilderCanvas from "@/components/builder/builder-canvas"
import PropertiesPanel from "@/components/builder/properties-panel"

export default function BuilderPage() {
  const [components, setComponents] = useState<any[]>([])
  const [history, setHistory] = useState<any[][]>([])
  const [future, setFuture] = useState<any[][]>([])
  const [selectedComponent, setSelectedComponent] = useState<any>(null)

  const handleAddComponent = (component: any) => {
    const newComponents = [...components, { ...component, id: Date.now() }]
    setHistory([...history, components])
    setComponents(newComponents)
    setFuture([])
  }

  const handleSetComponents = (newComponents: any[] | ((prev: any[]) => any[])) => {
    const updatedComponents = typeof newComponents === 'function' ? newComponents(components) : newComponents;
    setHistory([...history, components]);
    setComponents(updatedComponents);
    setFuture([]);
  };

  const handleSelectComponent = (component: any) => {
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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-[calc(100vh-theme(spacing.24))] w-full gap-6">
        <BuilderTools />
        <BuilderCanvas
          components={components}
          setComponents={handleSetComponents}
          onSelectComponent={handleSelectComponent}
          selectedComponent={selectedComponent}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={history.length > 0}
          canRedo={future.length > 0}
        />
        <PropertiesPanel selectedComponent={selectedComponent} />
      </div>
    </DndContext>
  )
}
