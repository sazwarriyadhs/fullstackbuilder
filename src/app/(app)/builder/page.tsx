"use client"

import { useState } from "react"
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"

import BuilderTools from "@/components/builder/builder-tools"
import BuilderCanvas from "@/components/builder/builder-canvas"
import PropertiesPanel from "@/components/builder/properties-panel"

export default function BuilderPage() {
    const [components, setComponents] = useState<any[]>([]);
    const [selectedComponent, setSelectedComponent] = useState<any>(null);

    const handleAddComponent = (component: any) => {
        const newComponent = { ...component, id: Date.now() };
        setComponents(prev => [...prev, newComponent]);
    }

    const handleSelectComponent = (component: any) => {
        setSelectedComponent(component);
    }

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.data.current?.isTool) {
          if (over) {
              handleAddComponent(active.data.current.component);
          }
          return;
      }
  
      if (over && active.id !== over.id) {
        setComponents((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }

  return (
    <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-[calc(100vh-theme(spacing.24))] w-full gap-6">
            <BuilderTools />
            <BuilderCanvas 
                components={components} 
                onSelectComponent={handleSelectComponent}
                selectedComponent={selectedComponent}
                setComponents={setComponents}
            />
            <PropertiesPanel selectedComponent={selectedComponent} />
        </div>
    </DndContext>
  )
}
