import Image from 'next/image';
import { UserProfile } from '@/types/comparison';

interface ComparisonHeaderProps {
  userA: UserProfile;
  userB: UserProfile;
}

export function ComparisonHeader({ userA, userB }: ComparisonHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-8 text-center md:text-left">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-indigo-500/30">
          <Image
            src={userA.user.avatar_url}
            alt={userA.user.name || userA.user.login}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{userA.user.name || userA.user.login}</h2>
          <p className="text-sm text-indigo-400 font-semibold">@{userA.user.login}</p>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full h-12 w-12 mx-auto animate-pulse" />
        <div className="relative h-12 w-12 rounded-full border border-indigo-500/30 bg-background/80 backdrop-blur-sm flex items-center justify-center font-bold text-indigo-400">
          VS
        </div>
      </div>

      <div className="flex items-center gap-4 flex-row-reverse md:flex-row">
        <div className="text-right md:text-left">
          <h2 className="text-xl font-bold">{userB.user.name || userB.user.login}</h2>
          <p className="text-sm text-purple-400 font-semibold">@{userB.user.login}</p>
        </div>
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-purple-500/30">
          <Image
            src={userB.user.avatar_url}
            alt={userB.user.name || userB.user.login}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
