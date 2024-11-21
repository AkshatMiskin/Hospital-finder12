// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  doctor: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true,
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required'],
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format'], // Validates HH:MM format
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
