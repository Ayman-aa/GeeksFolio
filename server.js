import express from "express";
import cors from "cors";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.js";

const app = express(); // Create express app instance

app.use(cors());
app.use(express.json());
const port = 3000;

// POST endpoint to handle form submissions
app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    
    // Add timestamp to the form data
    formData.timestamp = new Date();
    
    // Add the form submission to Firestore
    const docRef = await addDoc(collection(db, 'form-submissions'), formData);
    
    console.log('Form submission saved with ID:', docRef.id);
    res.status(201).json({ 
      success: true,
      message: 'Form submitted successfully',
      id: docRef.id
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit form',
      error: error.message 
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});