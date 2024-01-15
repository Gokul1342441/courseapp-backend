// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const bcrypt = require('bcrypt'); // for password hashing
const { User } = require('../models/User');

// Create a new cours
router.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();

    if (!savedCourse) {
      return res.status(500).send({ error: 'Failed to save the course.' });
    }

    res.status(201).send(savedCourse);
  } catch (error) {
    console.error('Error during course creation:', error);
    res.status(500).send(error);
  }
});

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update content by ID
router.put('/courses/:courseId', async (req, res) => {
  const courseId = req.params.courseId;
  const { content } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { content, updated_at: Date.now() },
      { new: true }
    );

    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }

    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a course by ID
router.delete('/courses/:courseId', async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).send({ error: 'Course not found' });
    }

    res.send(deletedCourse);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
