'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { UserProfile } from '@/types/comparison';

interface LanguageChartProps {
  userA: UserProfile;
  userB: UserProfile;
}

export function LanguageChart({ userA, userB }: LanguageChartProps) {
  const dataA = userA.languages.slice(0, 5).map(lang => ({
    name: lang.name,
    value: lang.percentage,
    color: lang.color,
  }));

  const dataB = userB.languages.slice(0, 5).map(lang => ({
    name: lang.name,
    value: lang.percentage,
    color: lang.color,
  }));

  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-white/10 bg-background/95 backdrop-blur-md px-3 py-1.5 shadow-md">
          <p className="text-xs font-semibold" style={{ color: data.color }}>
            {data.name}: {data.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6 flex flex-col items-center">
        <h4 className="text-lg font-bold mb-4 text-center">@{userA.user.login}&apos;s Top Languages</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {dataA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={renderCustomTooltip} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6 flex flex-col items-center">
        <h4 className="text-lg font-bold mb-4 text-center">@{userB.user.login}&apos;s Top Languages</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataB}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {dataB.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={renderCustomTooltip} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
