"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FIXED_SCHEDULE } from '../lib/constants';

type Team = { id: number; name: string; position: number };

export default function ScheduleBoard() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    async function fetchTeams() {
      const { data } = await supabase.from('teams').select('*').order('position');
      if (data) setTeams(data as Team[]);
    }
    fetchTeams();
  }, []);

  return (
    <div className="p-6 bg-[#1a1a1a] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Superclub Jornadas</h1>
      {Object.entries(FIXED_SCHEDULE).map(([jornada, matches]) => (
        <div key={jornada} className="mb-8 max-w-md mx-auto bg-gray-800 p-4 rounded-lg">
          <h2 className="text-orange-500 font-mono text-lg mb-3 border-b border-gray-700 pb-2">
            Jornada {jornada}
          </h2>
          {matches.map((m, i) => {
            const home = teams.find(t => t.position === m.home);
            const away = teams.find(t => t.position === m.away);
            return (
              <div key={i} className="flex justify-between py-2 text-sm border-b border-gray-700 last:border-0">
                <span>{home?.name || '---'}</span>
                <span className="text-gray-500 font-bold mx-2">VS</span>
                <span>{away?.name || '---'}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}