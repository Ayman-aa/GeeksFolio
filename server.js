import express from "express";
import cors from "cors";
import { collection, addDoc, getDocs, limit } from "firebase/firestore";
import { db } from "./firebase.js";

const app = express();
const port = process.env.PORT || 8080;

// More permissive CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test Firebase connection at startup
async function testDbConnection() {
  try {
    const testQuery = await getDocs(collection(db, 'form-submissions').limit(1));
    console.log('Firebase connection successful');
    return true;
  } catch (error) {
    console.error('Firebase connection error:', error);
    return false;
  }
}

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    firebase: dbConnected ? 'connected' : 'disconnected'
  });
});

// OPTIONS handler for CORS preflight
app.options('*', cors());

// POST endpoint to handle form submissions
app.post('/api/submit-form', async (req, res) => {
  try {
    console.log('Received form submission request');
    const formData = req.body;
    console.log('Form data:', formData);
    
    // Add timestamp
    formData.timestamp = new Date();
    
    // Add to Firestore
    console.log('Attempting to add to Firestore...');
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

// Test DB connection before starting server
let dbConnected = false;
testDbConnection().then((connected) => {
  dbConnected = connected;
  
  // Start server on all interfaces
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}, Firebase ${dbConnected ? 'connected' : 'disconnected'}`);
  });
});