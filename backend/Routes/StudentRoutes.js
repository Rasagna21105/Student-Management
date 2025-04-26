const express = require('express');
const router = express.Router();
const Student = require('../Models/StudentModel.js');

// POST /students - Add a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /students - Fetch all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('-__v');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /students/:id - Fetch a student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-__v');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// PUT /students/:id - Update student information
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-__v');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /students/:id - Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id).select('-__v');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

module.exports = router;