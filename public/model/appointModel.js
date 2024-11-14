// models/Appointment.js
const mongoose = require('mongoose');

// Helper functions to format date and time
const formatDate = (date) => date.toISOString().split('T')[0]; // Converts to "YYYY-MM-DD"
const formatTime = (time) => time.toTimeString().split(' ')[0].slice(0, 5); // Converts to "HH:MM"

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{4}-\d{2}-\d{2}/.test(v); // Validates YYYY-MM-DD format
      },
      message: (props) => `${props.value} is not a valid date format!`,
    },
    get: formatDate,
  },
  appointmentTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{2}:\d{2}/.test(v); // Validates HH:MM format
      },
      message: (props) => `${props.value} is not a valid time format!`,
    },
    get: formatTime,
  },
  notes: {
    type: String,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
