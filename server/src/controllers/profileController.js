const { UsersStore } = require('../data/store');

function getProfile(req, res) {
  const user = UsersStore.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...profile } = user;
  res.json({ profile });
}

function updateProfile(req, res) {
  const { name, gender, age } = req.body;
  const updated = UsersStore.update(req.userId, {
    ...(name !== undefined && { name }),
    ...(gender !== undefined && { gender }),
    ...(age !== undefined && { age: Number(age) }),
  });
  if (!updated) return res.status(404).json({ error: 'User not found' });
  const { password, ...profile } = updated;
  res.json({ profile });
}

function addPR(req, res) {
  const { exercise, weight, unit, date } = req.body;
  if (!exercise || !weight) {
    return res.status(400).json({ error: 'Exercise and weight are required' });
  }
  const user = UsersStore.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const pr = { id: Date.now().toString(), exercise, weight, unit: unit || 'lbs', date: date || new Date().toISOString().split('T')[0] };
  const updated = UsersStore.update(req.userId, { prs: [...user.prs, pr] });
  const { password, ...profile } = updated;
  res.json({ profile });
}

function deletePR(req, res) {
  const user = UsersStore.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const updated = UsersStore.update(req.userId, { prs: user.prs.filter((pr) => pr.id !== req.params.prId) });
  const { password, ...profile } = updated;
  res.json({ profile });
}

module.exports = { getProfile, updateProfile, addPR, deletePR };
