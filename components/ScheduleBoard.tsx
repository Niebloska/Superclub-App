"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FIXED_SCHEDULE } from '../lib/constants';
import { Star } from 'lucide-react'; // Asegúrate de tenerlo instalado: npm install lucide-react

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
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden">
      {/* Fondo de campo difuminado */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1] opacity-20 blur-[6px]"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop')" 
        }}
      ></div>
      <div className="absolute inset-0 bg-slate-950/60 z-[-1]"></div> {/* Capa oscura para legibilidad */}

      <div className="max-w-3xl mx-auto">
      <header className="mb-12 text-center">
          {/* Estrellas: 2 filas de 3, color amarillo */}
          <div className="flex flex-col items-center gap-1 mb-3">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => <Star key={`top-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => <Star key={`bot-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />)}
            </div>
          </div>
          
          {/* Título verde */}
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase text-green-500 select-none drop-shadow-lg">
            SUPERCLUB
          </h1>
          
          <div className="h-1 w-24 bg-green-500 mx-auto rounded-full mt-6 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        </header>

        {/* Grid de Jornadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(FIXED_SCHEDULE).map(([jornada, matches]) => (
            <div 
              key={jornada} 
              className="bg-slate-900/70 border border-slate-700/50 backdrop-blur-sm rounded-xl p-5 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-mono text-lg font-bold text-slate-300">JORNADA {jornada}</h2>
              </div>

              <div className="space-y-3">
                {matches.map((m, idx) => {
                  const home = teams.find(t => t.position === m.home);
                  const away = teams.find(t => t.position === m.away);
                  return (
                    <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-slate-700/50 last:border-0">
                      <span className="truncate font-medium text-white">{home?.name || '---'}</span>
                      <span className="text-[10px] font-mono text-green-500 px-2 uppercase tracking-widest">vs</span>
                      <span className="truncate font-medium text-right text-white">{away?.name || '---'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}