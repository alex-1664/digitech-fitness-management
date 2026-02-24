const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Firebase Admin Setup using ENV variable
// Set FIREBASE_SERVICE_ACCOUNT in Render Environment Variables
// Value = entire JSON of service account key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Middlewares
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

// API Routes

// Get all members
app.get('/api/members', async (req, res) => {
  try {
    const snapshot = await db.collection('members').get();
    const members = [];
    snapshot.forEach(doc => {
      members.push({ id: doc.id, ...doc.data() });
    });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new member
app.post('/api/members', async (req, res) => {
  try {
    const { name, plan } = req.body;
    if (!name || !plan) return res.status(400).json({ error: "Name & plan required" });

    const docRef = await db.collection('members').add({ name, plan });
    res.json({ id: docRef.id, name, plan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a member
app.delete('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('members').doc(id).delete();
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test root route
app.get('/api', (req, res) => {
  res.send("Digitech Fitness API Running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
