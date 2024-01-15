const express = require('express');
const cors = require('cors'); // Import the cors middleware
const db = require('./db');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(express.json());

app.use(cors());

app.use(courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
