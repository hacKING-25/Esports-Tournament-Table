import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    totalKills: { type: Number, default: 0 },
    totalPlacementPoints: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 }
});

export default mongoose.model('Team', teamSchema);