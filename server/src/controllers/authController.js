const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { UsersStore } = require('../data/store');
const { JWT_SECRET } = require('../middleware/auth');

async function register(req, res) {
  const { name, email, password, gender, age } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (UsersStore.findByEmail(email)) {
    return res.status(409).json({ error: 'Email already in use' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = UsersStore.create({
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    gender: gender || '',
    age: age ? Number(age) : null,
    prs: [],
    createdAt: new Date().toISOString(),
  });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: sanitizeUser(user) });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = UsersStore.findByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: sanitizeUser(user) });
}

function me(req, res) {
  const user = UsersStore.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: sanitizeUser(user) });
}

function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

module.exports = { register, login, me };
