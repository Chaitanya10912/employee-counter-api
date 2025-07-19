const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = './data.json';

app.use(express.json());

// Get all employees
app.get('/employees', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  res.json({
    count: data.length,
    employees: data
  });
});

// Add a new employee
app.post('/employees', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Employee name is required' });
  }

  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  data.push({ name, addedAt: new Date().toISOString() });
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Employee added' });
});

app.listen(PORT, () => {
  console.log(Employee counter API running on port ${PORT});
});