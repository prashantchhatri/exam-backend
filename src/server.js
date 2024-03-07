const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('./middleware/authenticate');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const authRouter = require('./routes/authRoutes');
const itemRouter = require('./routes/itemRoutes');
app.use('/auth', authRouter);
app.use('/items', authenticate, itemRouter); // Protected routes

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Error handling middleware should be the last middleware used
const errorHandler = require('./middleware/errorHandler'); 
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
