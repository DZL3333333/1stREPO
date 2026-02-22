import { useRef } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useWorkout } from '../../context/WorkoutContext';
import WorkoutCard from './WorkoutCard';

export default function WorkoutFlow() {
  const { flowExercises, reorderExercises, addExercise } = useWorkout();
  const dragOverlayItem = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragStart(event) {
    dragOverlayItem.current = flowExercises.find((e) => e.uid === event.active.id) || null;
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    dragOverlayItem.current = null;

    if (!over || active.id === over.id) return;

    // If dragging from library panel (has data.current.fromLibrary)
    if (event.active.data?.current?.fromLibrary) {
      addExercise(event.active.data.current.exercise);
      return;
    }

    const oldIndex = flowExercises.findIndex((e) => e.uid === active.id);
    const newIndex = flowExercises.findIndex((e) => e.uid === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      reorderExercises(arrayMove(flowExercises, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 items-start min-h-[220px] pb-2">
        <SortableContext
          items={flowExercises.map((e) => e.uid)}
          strategy={horizontalListSortingStrategy}
        >
          {flowExercises.map((card) => (
            <WorkoutCard key={card.uid} card={card} />
          ))}
        </SortableContext>

        {flowExercises.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[180px] border-2 border-dashed border-border rounded-xl text-center p-6">
            <span className="text-3xl mb-2">&#10133;</span>
            <p className="text-textSecondary text-sm font-medium">Add exercises from the library</p>
            <p className="text-textMuted text-xs mt-1">Click the + button or drag cards here</p>
          </div>
        )}

        {/* Drop zone sentinel when list has items */}
        {flowExercises.length > 0 && (
          <div className="flex-shrink-0 w-40 min-h-[220px] border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center">
            <p className="text-xs text-textMuted text-center px-2">Drop here to add at end</p>
          </div>
        )}
      </div>

      <DragOverlay>
        {dragOverlayItem.current && (
          <div className="w-56 bg-surface-100 border border-accent rounded-xl p-3.5 shadow-xl rotate-2 opacity-90">
            <p className="text-sm font-semibold text-textPrimary">{dragOverlayItem.current.name}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
