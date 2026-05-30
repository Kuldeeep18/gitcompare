# GitCompare 🚀 — Open Source Developer Analytics & GitHub Comparison Platform

GitCompare is a modern, responsive full-stack platform designed to compare developer profiles side-by-side. It parses user public repositories, contribution calendars, streaks, and programming languages to rank developers, award performance badges, compare code repositories, and generate downloadable PDF summaries.

Built specifically for GSSoC contributors, this repository is fully ready for developer collaboration.

---

## 🎨 Key Features

1. **Side-by-Side Comparison:** Compares bio parameters, repositories, forks, watchers, stars, pull requests, and issues.
2. **Language Analysis:** Visually tracks primary programming language usage percentages.
3. **Capability Radar Chart:** Identifies code output, OSS impact, community size, consistency, and growth shapes.
4. **Repository Comparisons:** Inputs two repositories in `owner/repo` formats to map issue count, forks, size, and stargazers.
5. **Leaderboard Table:** Locally saves comparisons and ranks them dynamically by developer score.
6. **Analytics Scorecard:** Calculates a developer's score out of 100 based on contributions, consistency, and community metrics.
7. **Report Exports:** Renders client-side downloadable PDF summary sheets.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Charts:** Recharts
- **PDF Engines:** html2canvas + jsPDF
- **Theme Support:** next-themes (Dark / Light mode support)

---

## ⚙️ Local Development Setup

Follow these simple steps to run GitCompare locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/GitCompare.git
   cd GitCompare
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:**
   Create a `.env.local` file at the root of the project:
   ```env
   GITHUB_TOKEN=your_personal_access_token_here
   ```
   *Note: Personal Access Tokens can be generated in GitHub Developer settings. They raise the API query limit from 60 to 5,000 requests/hour.*
4. **Start the local server:**
   ```bash
   npm run dev
   ```
5. **Preview the app:**
   Open [http://localhost:3000](http://localhost:3000) on your local browser.

---

## 🏗️ Architecture

```text
src/
├── app/                  # Route layouts, pages and API endpoints
├── components/           # Reusable layout and custom visual cards
├── features/             # Feature logic
├── hooks/                # Custom React state hooks
├── lib/                  # GitHub REST/GraphQL connection utilities
├── services/             # Analytics and leaderboard database controllers
├── types/                # TypeScript interfaces
├── utils/                # Date/number formatting and algorithms
```

---

## 🤝 Contributing

We welcome all contributions! Please review our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

If you are looking for issue ideas, checkout [ISSUES.md](ISSUES.md) which lists over 50 structured developer tasks categorized by difficulty label.
