import mongoose from 'mongoose';

const matchTeamResultSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    kills: { type: Number, required: true },
    placement: { type: Number, required: true } 
});

const matchSchema = new mongoose.Schema({
    matchNumber: { type: Number, required: true, unique: true },
    results: [matchTeamResultSchema] 
}, { timestamps: true });

export default mongoose.model('Match', matchSchema);