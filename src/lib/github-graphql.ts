import { GraphQLUser, ContributionsCollection } from '@/types/github';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

async function queryGraphQL<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error('GitHub token is required for GraphQL API access');
  }
  
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });
  
  if (!res.ok) {
    throw new Error(`GraphQL API error: ${res.status} ${res.statusText}`);
  }
  
  const json: GraphQLResponse<T> = await res.json();
  
  if (json.errors) {
    throw new Error(`GraphQL error: ${json.errors.map(e => e.message).join(', ')}`);
  }
  
  return json.data;
}

const USER_CONTRIBUTIONS_QUERY = `
query($userName: String!) {
  user(login: $userName) {
    login
    name
    avatarUrl
    bio
    followers { totalCount }
    following { totalCount }
    repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}, ownerAffiliations: OWNER) {
      totalCount
      nodes {
        name
        description
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
        url
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
            color
          }
        }
      }
    }
  }
}
`;

export async function getUserContributions(username: string): Promise<GraphQLUser> {
  const data = await queryGraphQL<{ user: GraphQLUser }>(USER_CONTRIBUTIONS_QUERY, {
    userName: username,
  });
  return data.user;
}

export function calculateContributionStreak(contributions: ContributionsCollection): number {
  const allDays = contributions.contributionCalendar.weeks
    .flatMap(w => w.contributionDays)
    .reverse();
  
  let streak = 0;
  let foundFirstContribution = false;
  
  for (const day of allDays) {
    if (day.contributionCount > 0) {
      streak++;
      foundFirstContribution = true;
    } else if (foundFirstContribution) {
      break;
    }
  }
  
  return streak;
}
