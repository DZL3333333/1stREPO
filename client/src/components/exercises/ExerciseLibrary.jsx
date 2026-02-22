import { useState, useEffect } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import { EXERCISES } from '../../data/exercises';
import ExerciseLibraryCard from './ExerciseLibraryCard';
import CustomExerciseModal from './CustomExerciseModal';
import api from '../../api';

export default function ExerciseLibrary() {
  const { muscleGroup, subFocus } = useWorkout();
  const [exercises, setExercises] = useState(EXERCISES);
  const [search, setSearch] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);

  const fetchExercises = async () => {
    try {
      const res = await api.get('/exercises');
      setExercises(res.data.exercises);
    } catch {
      // fall back to local data
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleDeleteCustom = async (id) => {
    try {
      await api.delete(`/exercises/custom/${id}`);
      await fetchExercises();
    } catch {
      setExercises((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleCreateCustom = async (form) => {
    try {
      await api.post('/exercises/custom', form);
      await fetchExercises();
    } catch {
      // add locally with temp id
      const tempEx = { ...form, id: `custom-${Date.now()}`, isCustom: true };
      setExercises((prev) => [...prev, tempEx]);
    }
    setShowCustomModal(false);
  };

  // Filter logic
  const filtered = exercises.filter((ex) => {
    if (muscleGroup && ex.muscleGroup !== muscleGroup) return false;
    if (subFocus && ex.subFocus !== subFocus) return false;
    if (search && !ex.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Group by subFocus for display
  const grouped = filtered.reduce((acc, ex) => {
    const key = ex.subFocus;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ex);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Search + Add Custom */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises..."
            className="input-field pl-8 text-sm"
          />
        </div>
        <button
          onClick={() => setShowCustomModal(true)}
          className="btn-primary text-sm flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Custom Exercise
        </button>
      </div>

      {/* Exercise groups */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-8 text-textMuted text-sm">
          No exercises found{muscleGroup ? ` for ${subFocus || muscleGroup}` : ''}
          {search ? ` matching "${search}"` : ''}
        </div>
      ) : (
        Object.entries(grouped).map(([group, exs]) => (
          <div key={group}>
            <h3 className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">{group}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              {exs.map((ex) => (
                <ExerciseLibraryCard
                  key={ex.id}
                  exercise={ex}
                  onDelete={ex.isCustom ? handleDeleteCustom : undefined}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {showCustomModal && (
        <CustomExerciseModal
          onClose={() => setShowCustomModal(false)}
          onSave={handleCreateCustom}
        />
      )}
    </div>
  );
}
