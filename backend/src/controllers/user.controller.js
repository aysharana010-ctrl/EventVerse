const userService = require('../services/user.service');

async function createUser(req, res) {
  const { name, email, role, department, year, phone, password } = req.body;

  if (!name || !email || !role || !password) {
    return res.status(400).json({ error: 'name, email, role, and password are required' });
  }

  try {
    const user = await userService.createUser({ name, email, role, department, year, phone, password });
    return res.status(201).json("User created successfully");
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    console.error('createUser error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'password is required' });
  }

  try {
    const user = await userService.updateUser(id, password);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json("Password updated successfully");
  } catch (err) {
    console.error('updateUser error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createUser, updateUser };
