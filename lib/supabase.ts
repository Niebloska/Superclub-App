import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define las posiciones (1 a 6) según el tablero
export const FIXED_SCHEDULE = {
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

function JornadaCard({ jornadaNumber, teams }) {
  const matches = FIXED_SCHEDULE[jornadaNumber];
  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Jornada {jornadaNumber}</h2>
      {matches.map((m, i) => {
        const homeTeam = teams.find((t) => t.position === m.home);
        const awayTeam = teams.find((t) => t.position === m.away);
        return (
          <div
            key={i}
            className="flex justify-between border-b border-gray-700 py-2"
          >
            <span>{homeTeam?.name}</span>
            <span className="text-orange-500 font-mono">VS</span>
            <span>{awayTeam?.name}</span>
          </div>
        );
      })}
    </div>
  );
}
