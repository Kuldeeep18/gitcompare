'use client';

import { ResponsiveContainer, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { UserProfile } from '@/types/comparison';
import { calculateDeveloperScore } from '@/utils/calculations';

interface RadarChartProps {
  userA: UserProfile;
  userB: UserProfile;
}

export function RadarChart({ userA, userB }: RadarChartProps) {
  const scoreA = calculateDeveloperScore(userA);
  const scoreB = calculateDeveloperScore(userB);

  const data = [
    { subject: 'Code Output', A: scoreA.breakdown.code, B: scoreB.breakdown.code, fullMark: 100 },
    { subject: 'Community', A: scoreA.breakdown.community, B: scoreB.breakdown.community, fullMark: 100 },
    { subject: 'Consistency', A: scoreA.breakdown.consistency, B: scoreB.breakdown.consistency, fullMark: 100 },
    { subject: 'Language Diversity', A: scoreA.breakdown.diversity, B: scoreB.breakdown.diversity, fullMark: 100 },
    { subject: 'OSS Impact', A: scoreA.breakdown.impact, B: scoreB.breakdown.impact, fullMark: 100 },
    { subject: 'Growth', A: scoreA.breakdown.growth, B: scoreB.breakdown.growth, fullMark: 100 },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6 flex flex-col items-center">
      <h3 className="text-xl font-bold mb-6">Developer Capabilities Shape</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--muted-foreground)' }} />
            <Radar
              name={`@${userA.user.login}`}
              dataKey="A"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.25}
            />
            <Radar
              name={`@${userB.user.login}`}
              dataKey="B"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.25}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
