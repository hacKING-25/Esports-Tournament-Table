import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import matchRoutes from './routes/matchRoutes.js'; // Import your new router

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

// Link your router middleware!
// This means every route inside matchRoutes will start with /api/matches
app.use('/api/matches', matchRoutes);

mongoose.connect(uri, { dbName: 'EsportsDB' })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

app.get('/', (req, res) => {
    res.send('Esports API is running...');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});