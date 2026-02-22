import { useState } from 'react';
import { MUSCLE_GROUPS, SUB_FOCUS_MAP } from '../../data/exercises';

export default function CustomExerciseModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    muscleGroup: 'Upper Body',
    subFocus: 'Chest',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestPeriod: 60,
    estimatedTimePerSet: 75,
  });
  const [error, setError] = useState('');

  const subFocusList = SUB_FOCUS_MAP[form.muscleGroup] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: ['defaultSets','defaultReps','defaultRestPeriod','estimatedTimePerSet'].includes(name)
        ? Number(value)
        : value,
      ...(name === 'muscleGroup' ? { subFocus: (SUB_FOCUS_MAP[value] || [])[0] || '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Exercise name is required'); return; }
    if (!form.subFocus) { setError('Please select a sub-focus'); return; }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-surface-100 border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-textPrimary">New Custom Exercise</h2>
          <button onClick={onClose} className="text-textMuted hover:text-textPrimary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Exercise Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Incline Cable Fly" className="input-field" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Muscle Group</label>
              <select name="muscleGroup" value={form.muscleGroup} onChange={handleChange} className="input-field">
                {MUSCLE_GROUPS.map((mg) => <option key={mg} value={mg}>{mg}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Sub-focus</label>
              <select name="subFocus" value={form.subFocus} onChange={handleChange} className="input-field">
                {subFocusList.map((sf) => <option key={sf} value={sf}>{sf}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Default Sets</label>
              <input type="number" name="defaultSets" min="1" max="20" value={form.defaultSets} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Default Reps</label>
              <input type="number" name="defaultReps" min="1" max="100" value={form.defaultReps} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Rest Period (sec)</label>
              <input type="number" name="defaultRestPeriod" min="0" max="600" step="15" value={form.defaultRestPeriod} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Time/Set (sec)</label>
              <input type="number" name="estimatedTimePerSet" min="15" max="300" step="15" value={form.estimatedTimePerSet} onChange={handleChange} className="input-field" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1">Create Exercise</button>
          </div>
        </form>
      </div>
    </div>
  );
}
