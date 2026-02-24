const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Sample API Route (Test Route)
app.get('/api/members', (req, res) => {
  res.json([
    { id: 1, name: "John Doe", plan: "Monthly" },
    { id: 2, name: "Mary Wanjiku", plan: "Weekly" }
  ]);
});

// Root Test (Optional but good)
app.get('/api', (req, res) => {
  res.send("Digitech Fitness API Running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
