import { useState, useEffect, useMemo } from 'react';
import { GithubIcon } from '../SocialIcons';
import { ArrowUpRight, Flame, GitCommit, Calendar, Sparkles } from 'lucide-react';
import initialContributionsData from '../../data/githubContributions.json';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Architectural Palette mapped to GitHub contribution levels (0 to 4)
const LEVEL_COLORS = [
  'bg-[#ECE7DC] border-[#DFD8C9]',             // 0: empty
  'bg-[#D8CCA6] border-[#C8B99A]',             // 1: light gold
  'bg-[#BFAF8D] border-[#9E8E6C]',             // 2: medium gold
  'bg-[#5C5749] border-[#444035]',             // 3: dark charcoal-gold
  'bg-[#171715] border-[#171715]',             // 4: deep obsidian
];

export default function GithubContributions() {
  const [data, setData] = useState(initialContributionsData);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch live contributions on mount to ensure real-time accuracy
  useEffect(() => {
    let isMounted = true;
    const fetchLive = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/h4nzdev?y=last');
        if (!res.ok) throw new Error('Failed to fetch live contributions');
        const json = await res.json();
        if (isMounted && json && json.contributions) {
          setData(json);
        }
      } catch (err) {
        console.warn('Using cached GitHub contributions data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLive();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute total, streak, and grid weeks
  const { totalContributions, weeks, currentStreak, maxStreak } = useMemo(() => {
    const list = data?.contributions || [];
    const total = Object.values(data?.total || {})[0] || list.reduce((acc, c) => acc + (c.count || 0), 0);

    // Calculate streaks
    let streak = 0;
    let maxS = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].count > 0) {
        streak++;
        if (streak > maxS) maxS = streak;
      } else {
        streak = 0;
      }
    }

    // Group into 7-day columns (weeks)
    const groupedWeeks = [];
    let currentWeek = [];

    list.forEach((day, idx) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || idx === list.length - 1) {
        groupedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return {
      totalContributions: total,
      weeks: groupedWeeks,
      currentStreak: streak,
      maxStreak: maxS,
    };
  }, [data]);

  // Determine month header labels above week columns
  const monthHeaders = useMemo(() => {
    const headers = [];
    let lastMonth = -1;

    weeks.forEach((week, wIdx) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      if (month !== lastMonth && week.length >= 4) {
        headers.push({ month: MONTH_NAMES[month], colIndex: wIdx });
        lastMonth = month;
      }
    });

    return headers;
  }, [weeks]);

  const featuredRepos = [
    {
      name: 'nyx-chat',
      desc: 'Zero-Knowledge E2EE Post-Quantum Messenger architecture.',
      lang: 'TypeScript',
      langColor: '#3178C6',
      stars: 4,
      url: 'https://github.com/h4nzdev/nyx-chat',
    },
    {
      name: 'mirAI',
      desc: 'Hybrid AI movie recommendation engine using Gemini API & TMDB.',
      lang: 'Python / React',
      langColor: '#3572A5',
      stars: 3,
      url: 'https://github.com/h4nzdev',
    },
    {
      name: 'Portfolio_Hanz',
      desc: 'Architectural portfolio featuring 3D studio, motion shaders & scrollytelling.',
      lang: 'React 19 / Three.js',
      langColor: '#61DAFB',
      stars: 2,
      url: 'https://github.com/h4nzdev',
    },
  ];

  return (
    <div className="w-full pt-16 border-t border-[#C8B99A]/40 space-y-8">
      {/* Header & Meta */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
            <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
              02.5 // Open Source & Engineering Velocity
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715] flex items-center gap-3">
            <span>GitHub Contribution Matrix</span>
            {loading && (
              <span className="text-xs font-mono font-normal text-[#85847E] animate-pulse">
                Syncing live...
              </span>
            )}
          </h3>
        </div>

        {/* Action button to GitHub Profile */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/h4nzdev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-mono font-medium hover:bg-[#292824] transition-all shadow-xs group"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[#C8B99A]" />
            <span>@h4nzdev</span>
            <ArrowUpRight size={13} className="text-[#85847E] group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* Main Heatmap Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#C8B99A]/60 shadow-sm backdrop-blur-xs space-y-6">
        {/* Metric Badges Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#C8B99A]/30">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#85847E] flex items-center gap-1.5">
              <GitCommit size={11} className="text-[#C8B99A]" />
              <span>Total Commits</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715]">
              {totalContributions.toLocaleString()}
            </div>
            <span className="text-[10px] font-mono text-[#85847E]">Past 365 Days</span>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#85847E] flex items-center gap-1.5">
              <Flame size={11} className="text-[#C8B99A]" />
              <span>Current Streak</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715]">
              {currentStreak} <span className="text-sm font-normal text-[#85847E]">days</span>
            </div>
            <span className="text-[10px] font-mono text-[#85847E]">Active momentum</span>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#85847E] flex items-center gap-1.5">
              <Calendar size={11} className="text-[#C8B99A]" />
              <span>Longest Streak</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715]">
              {maxStreak} <span className="text-sm font-normal text-[#85847E]">days</span>
            </div>
            <span className="text-[10px] font-mono text-[#85847E]">Sustained shipping</span>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#85847E] flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#C8B99A]" />
              <span>Public Repos</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715]">
              18+
            </div>
            <span className="text-[10px] font-mono text-[#85847E]">Open-source tools</span>
          </div>
        </div>

        {/* Scrollable Heatmap Grid */}
        <div className="relative">
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="min-w-[780px] space-y-2">
              {/* Month Headers */}
              <div className="relative h-4 text-[10px] font-mono text-[#85847E] select-none pl-8">
                {monthHeaders.map((hdr, idx) => (
                  <span
                    key={idx}
                    style={{ left: `${(hdr.colIndex / weeks.length) * 100}%` }}
                    className="absolute"
                  >
                    {hdr.month}
                  </span>
                ))}
              </div>

              {/* Heatmap Matrix with Day Labels */}
              <div className="flex gap-2">
                {/* Day Labels Column */}
                <div className="flex flex-col justify-between py-0.5 text-[9px] font-mono text-[#85847E] select-none w-6 shrink-0">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* Week Columns */}
                <div className="flex gap-1.5 flex-1">
                  {weeks.map((week, wIdx) => (
                    <div key={`w-${wIdx}`} className="flex flex-col gap-1.5">
                      {week.map((day, dIdx) => {
                        const levelClass = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];
                        return (
                          <div
                            key={`d-${wIdx}-${dIdx}`}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-3 h-3 rounded-[3px] border transition-transform hover:scale-125 hover:z-20 cursor-pointer ${levelClass}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Inspection Tooltip Bar */}
          <div className="mt-4 pt-3 border-t border-[#C8B99A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="text-[#171715] flex items-center gap-2">
              {hoveredDay ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#171715]" />
                  <span className="font-semibold">
                    {hoveredDay.count} contribution{hoveredDay.count === 1 ? '' : 's'}
                  </span>
                  <span className="text-[#85847E]">on {hoveredDay.date}</span>
                </>
              ) : (
                <span className="text-[#85847E]">
                  Hover over any date cell to inspect individual daily commit density
                </span>
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#85847E]">
              <span>Less</span>
              {LEVEL_COLORS.map((col, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-[3px] border ${col} inline-block`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Featured Open Source Repositories */}
        <div className="pt-4 border-t border-[#C8B99A]/30 space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#85847E] font-semibold">
            Featured Open-Source Repositories
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredRepos.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-[#C8B99A]/50 hover:border-[#171715] hover:shadow-md transition-all group flex flex-col justify-between space-y-2 text-left"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-['Space_Grotesk'] font-bold text-sm text-[#171715] group-hover:text-[#A99A7D] transition-colors">
                      {repo.name}
                    </span>
                    <ArrowUpRight size={13} className="text-[#85847E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-[#66635B] mt-1 line-clamp-2 leading-relaxed">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#85847E] pt-2 border-t border-[#C8B99A]/20">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    <span>{repo.lang}</span>
                  </span>
                  <span>★ {repo.stars}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}