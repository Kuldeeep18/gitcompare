import { UserProfile } from '@/types/comparison';

interface ContributionHeatmapProps {
  userA: UserProfile;
  userB: UserProfile;
}

export function ContributionHeatmap({ userA, userB }: ContributionHeatmapProps) {
  const renderCalendar = (profile: UserProfile) => {
    const calendar = profile.contributions?.contributionCalendar;

    if (!calendar) {
      return (
        <div className="flex items-center justify-center h-28 border border-white/5 rounded-xl bg-white/5 text-muted-foreground text-xs p-4 text-center">
          GraphQL credentials needed to load full heatmap.
        </div>
      );
    }

    // Flatten all days and grab the last 12 weeks to keep it compact and pretty
    const weeks = calendar.weeks.slice(-16);

    return (
      <div className="flex flex-col gap-1 w-full overflow-x-auto select-none">
        <div className="flex gap-1">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.contributionDays.map((day, dIdx) => (
                <div
                  key={dIdx}
                  className="h-3 w-3 rounded-[2px]"
                  style={{
                    backgroundColor: day.color || '#2d333b',
                  }}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6">
        <h4 className="text-sm font-semibold mb-4 text-muted-foreground">
          @{userA.user.login}&apos;s Activity Heatmap
        </h4>
        {renderCalendar(userA)}
      </div>

      <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6">
        <h4 className="text-sm font-semibold mb-4 text-muted-foreground">
          @{userB.user.login}&apos;s Activity Heatmap
        </h4>
        {renderCalendar(userB)}
      </div>
    </div>
  );
}
