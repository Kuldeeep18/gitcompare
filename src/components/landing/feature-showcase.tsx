import { BarChart3, Users, Zap, Award, Share2, FileText } from 'lucide-react';

const features = [
  {
    icon: <Users className="h-6 w-6 text-indigo-400" />,
    title: 'Side-by-Side Comparison',
    description: 'Compare basic stats, repositories, watchers, stars, and pull requests side-by-side.',
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-purple-400" />,
    title: 'Language Distribution',
    description: 'Detailed percentages of language usage across repositories visualised with interactive charts.',
  },
  {
    icon: <Zap className="h-6 w-6 text-pink-400" />,
    title: 'Developer Score',
    description: 'A computed skill indicator based on contribution streak, followers, impact and repositories.',
  },
  {
    icon: <Award className="h-6 w-6 text-emerald-400" />,
    title: 'Achievement Badges',
    description: 'Earn community developer badges such as "Star Collector", "Polyglot" or "Streak Keeper".',
  },
  {
    icon: <FileText className="h-6 w-6 text-amber-400" />,
    title: 'PDF Export',
    description: 'Download detailed summary reports containing charts and performance rankings.',
  },
  {
    icon: <Share2 className="h-6 w-6 text-sky-400" />,
    title: 'Easy Sharing',
    description: 'Share comparisons via unique URLs or copy results directly as a dynamic image.',
  },
];

export function FeatureShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <div
          key={i}
          className="relative group rounded-2xl border border-white/5 bg-card/30 backdrop-blur-sm p-6 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-card/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 mb-4 group-hover:bg-white/10 transition-colors">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
