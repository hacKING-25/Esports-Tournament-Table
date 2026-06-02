import { useState, useEffect } from 'react';

document.title = "Esports Leaderboard";

export default function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data from our Express API
  useEffect(() => {
    fetch('http://localhost:3000/api/matches/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-500 tracking-wider uppercase">
          Free Fire Tournament Standings
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading standings...</p>
        ) : (
          <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-slate-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-700 text-gray-300 uppercase text-sm tracking-wider">
                  <th className="py-4 px-6 text-center font-bold w-16">Rank</th>
                  <th className="py-4 px-6 font-bold">Team Name</th>
                  <th className="py-4 px-6 text-center font-bold">Kills</th>
                  <th className="py-4 px-6 text-center font-bold">Placement Pts</th>
                  <th className="py-4 px-6 text-center font-bold text-yellow-500">Total Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {teams.map((team, index) => (
                  <tr key={team._id} className="hover:bg-slate-750 transition-colors">
                    <td className="py-4 px-6 text-center font-bold text-lg text-gray-400">
                      {index + 1 === 1 ? '🥇' : index + 1 === 2 ? '🥈' : index + 1 === 3 ? '🥉' : index + 1}
                    </td>
                    <td className="py-4 px-6 font-semibold text-lg tracking-wide">{team.name}</td>
                    <td className="py-4 px-6 text-center text-gray-300 font-medium">{team.totalKills}</td>
                    <td className="py-4 px-6 text-center text-gray-300 font-medium">{team.totalPlacementPoints}</td>
                    <td className="py-4 px-6 text-center text-xl font-bold text-yellow-400">{team.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}