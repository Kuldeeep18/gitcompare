import Image from 'next/image';
import { MapPin, Briefcase, Calendar, Users, FolderGit, Terminal } from 'lucide-react';
import { UserProfile } from '@/types/comparison';
import { formatDate } from '@/utils/format';

interface ProfileCardProps {
  profile: UserProfile;
  position: 'left' | 'right';
}

export function ProfileCard({ profile, position }: ProfileCardProps) {
  const { user, stats } = profile;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md p-6 transition-all duration-300 hover:border-white/20">
      {/* Dynamic background glow */}
      <div className={`absolute -top-10 ${position === 'left' ? '-left-10' : '-right-10'} -z-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-xl`} />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
        <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-indigo-500/30">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center sm:text-left flex-1 min-w-0">
          <h2 className="text-xl font-bold truncate">{user.name || user.login}</h2>
          <p className="text-sm text-indigo-400 font-semibold mb-2">@{user.login}</p>
          {user.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{user.bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-b border-white/5 py-4 mb-6">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{user.followers}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{user.public_repos}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Repos</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{stats.totalStars}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total Stars</p>
        </div>
      </div>

      <div className="space-y-3">
        {user.location && (
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-indigo-400" />
            <span className="truncate">{user.location}</span>
          </div>
        )}
        {user.company && (
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 shrink-0 text-indigo-400" />
            <span className="truncate">{user.company}</span>
          </div>
        )}
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0 text-indigo-400" />
          <span>Joined {formatDate(user.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
