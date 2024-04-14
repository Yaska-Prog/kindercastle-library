const express = require('express');
const dotenv = require('dotenv');
const firebaseAuth = require('./middleware/firebaseAuth');
const bookRouter = require('./routes/bookRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.use(firebaseAuth); // Apply firebase authentication middleware
app.use('/api/books', bookRouter); // Use book routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});