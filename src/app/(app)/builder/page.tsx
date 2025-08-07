"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
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
  const [history, setHistory] = useState<Component[][]>([])
  const [future, setFuture] = useState<Component[][]>([])
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const templateId = searchParams.get('templateId');
    const templateTitle = searchParams.get('templateTitle');

    if (templateTitle) {
      setDesignTitle(templateTitle);
    } else {
      setDesignTitle("Untitled Design");
    }

    if (templateId) {
      fetch(`/api/templates?id=${templateId}`)
        .then(res => res.json())
        .then(data => {
          if (data.components) {
            setComponents(data.components);
            setHistory([]);
            setFuture([]);
            setSelectedComponent(null);
          }
        })
        .catch(error => console.error("Failed to load template components:", error));
    } else {
        setComponents([]);
        setHistory([]);
        setFuture([]);
        setSelectedComponent(null);
    }
  }, [searchParams]);

  const recordHistory = (currentComponents: Component[]) => {
    setHistory([...history, currentComponents]);
    setFuture([]);
  }

  const handleAddComponent = (component: any) => {
    recordHistory(components);
    const newComponent = { ...component, id: `${component.type}-${Date.now()}` }
    const newComponents = [...components, newComponent]
    setComponents(newComponents)
    handleSelectComponent(newComponent)
  }

  const handleSetComponents = (newComponents: Component[] | ((prev: Component[]) => Component[])) => {
    recordHistory(components);
    const updatedComponents = typeof newComponents === 'function' ? newComponents(components) : newComponents;
    setComponents(updatedComponents);
  };

  const handleSelectComponent = (component: Component | null) => {
    setSelectedComponent(component)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.data.current?.isTool) {
      if (over?.id === 'canvas-dropzone') {
        handleAddComponent(active.data.current.component)
      }
      return
    }

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((item) => item.id === active.id)
      const newIndex = components.findIndex((item) => item.id === over.id)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrderedComponents = arrayMove(components, oldIndex, newIndex);
        handleSetComponents(newOrderedComponents);
      }
    }
  }

  const handleUndo = () => {
    if (history.length === 0) return
    const previousState = history[history.length - 1]
    setFuture([components, ...future])
    setComponents(previousState)
    setHistory(history.slice(0, -1))
  }

  const handleRedo = () => {
    if (future.length === 0) return
    const nextState = future[0]
    setHistory([...history, components])
    setComponents(nextState)
    setFuture(future.slice(1))
  }

  const handleUpdateComponent = (id: string, newProps: any) => {
    const newComponents = components.map(c => c.id === id ? { ...c, props: { ...c.props, ...newProps } } : c);
    handleSetComponents(newComponents);
    // Also update the selected component to reflect changes immediately
    if (selectedComponent && selectedComponent.id === id) {
        setSelectedComponent({ ...selectedComponent, props: { ...selectedComponent.props, ...newProps } });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
