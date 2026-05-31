import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Definimos el calendario fijo de 6 participantes
const FIXED_SCHEDULE: Record<number, { home: number; away: number }[]> = {
  1: [
    { home: 1, away: 6 },
    { home: 2, away: 5 },
    { home: 3, away: 4 },
  ],
  2: [
    { home: 6, away: 4 },
    { home: 5, away: 3 },
    { home: 1, away: 2 },
  ],
  3: [
    { home: 2, away: 6 },
    { home: 3, away: 1 },
    { home: 4, away: 5 },
  ],
  4: [
    { home: 6, away: 5 },
    { home: 1, away: 4 },
    { home: 2, away: 3 },
  ],
  5: [
    { home: 3, away: 6 },
    { home: 4, away: 2 },
    { home: 5, away: 1 },
  ],
};

type Team = { id: number; name: string; position: number };

export default function ScheduleBoard() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      const { data } = await supabase
        .from('teams')
        .select('*')
        .order('position');
      if (data) setTeams(data);
      setLoading(false);
    }
    fetchTeams();
  }, []);

  if (loading) return <div className="text-white">Cargando equipos...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-[#1a1a1a] rounded-xl shadow-2xl border border-gray-800">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        Superclub Jornadas
      </h1>

      {Object.entries(FIXED_SCHEDULE).map(([jornada, matches]) => (
        <div key={jornada} className="mb-8">
          <h2 className="text-orange-500 font-mono text-lg mb-3 border-b border-gray-800 pb-2">
            Jornada {jornada}
          </h2>
          <div className="space-y-2">
            {matches.map((m, idx) => {
              const home = teams.find((t) => t.position === m.home);
              const away = teams.find((t) => t.position === m.away);
              return (
                <div
                  key={idx}
                  className="flex justify-between text-sm text-gray-300 bg-gray-800/50 p-2 rounded"
                >
                  <span>{home?.name || '---'}</span>
                  <span className="font-bold text-gray-500">vs</span>
                  <span>{away?.name || '---'}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
