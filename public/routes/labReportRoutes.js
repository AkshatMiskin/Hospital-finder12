// File: routes/labReportRoutes.js
const express = require('express');
const multer = require('multer');
const LabReport = require('../model/labReportModel');  // Ensure this path is correct
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Route for uploading a report
router.post('/upload-report', upload.single('reportFile'), async (req, res) => {
    try {
      const { patientEmail, reportName, notes, uploadedBy } = req.body;
  
      // Check if the report file is provided
      if (!req.file) {
        return res.render('labreport-upload', { errorMessage: 'Please select a file to upload.' });
      }
  
      const newReport = new LabReport({
        patientEmail,
        reportName,
        fileUrl: `/uploads/${req.file.filename}`,
        notes,
        uploadedBy
      });
  
      await newReport.save();
      res.status(201).json({ message: "Lab report uploaded successfully" });
    } catch (error) {
      console.error("Error uploading lab report:", error);
      res.status(500).render('labreport-upload', { errorMessage: 'Server error. Please try again later.' });
    }
  });
  
// Route for fetching reports by user email
// Route to fetch lab reports for a specific email
router.get('/labreports', async (req, res) => {
    const email = req.query.email; // Getting the email from query string
  
    if (!email) {
      return res.status(400).render('error', { message: "Email is required." });
    }
  
    try {
      // Fetch lab reports from database where patientEmail matches the provided email
      const reports = await LabReport.find({ patientEmail: email });
  
      // If no reports found, display an appropriate message
      if (reports.length === 0) {
        return res.render('labreports', { message: "No lab reports found for this user." });
      }
  
      // Render the reports page with the list of reports
      res.render('labreports', { reports });
    } catch (error) {
      console.error("Error fetching lab reports:", error);
      // Handle errors by displaying a friendly message
      res.status(500).render('error', { message: "Error loading lab reports. Please try again later." });
    }
  });

module.exports = router;
