import express from 'express';
import Team from '../Models/Team.js';
import Match from '../Models/Match.js';

const router = express.Router();

const FF_PLACEMENT_POINTS = {
    1: 12, 2: 9, 3: 8, 4: 7, 5: 6, 6: 5, 7: 4, 8: 3, 9: 2, 10: 1, 11: 0, 12: 0
};

// This handles POST requests to /matches (relative to where it's used)
router.post('/', async (req, res) => {
    try {
        const { matchNumber, results } = req.body;

        const newMatch = new Match({ matchNumber, results });
        await newMatch.save();

        for (let result of results) {
            const killPoints = result.kills;
            const placementPoints = FF_PLACEMENT_POINTS[result.placement] || 0;
            const matchTotalPoints = killPoints + placementPoints;

            await Team.findOneAndUpdate(
                { name: result.teamName },
                { 
                    $inc: { 
                        totalKills: killPoints, 
                        totalPlacementPoints: placementPoints,
                        totalPoints: matchTotalPoints
                    } 
                },
                { upsert: true, new: true }
            );
        }

        res.status(201).send({ message: "Match recorded and standings updated!", match: newMatch });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// This handles GET requests to /matches/leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await Team.find({}).sort({ totalPoints: -1, totalKills: -1 });
        res.send(leaderboard);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;