# GitCompare — 50+ Contributor Issue Ideas

This document contains over 50 structured issue ideas categorized by difficulty level for GSSoC contributors.

---

## 🟢 Beginner & Good First Issues (15 Issues)

These issues are ideal for new contributors looking to get comfortable with the codebase. They focus on styling, layout, simple logic, and basic components.

### 1. `documentation` Add inline tooltips to metric comparisons
- **Description:** Provide helpful popover tooltips using Shadcn UI describing metrics (e.g., explaining what "watcher count" or "repos contributed to" represents).
- **Target File:** [stats-comparison.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/stats-comparison.tsx)

### 2. `enhancement` Implement profile search autocomplete debounce
- **Description:** Delay query fetches on search input changes to prevent unnecessary triggers before typing concludes.
- **Target File:** [search-bar.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/landing/search-bar.tsx)

### 3. `enhancement` Highlight the metric "Winner"
- **Description:** Stylistically highlight the developer with the superior score in each row (e.g., wrap in a subtle green highlight border).
- **Target File:** [stats-comparison.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/stats-comparison.tsx)

### 4. `bug` Handle profile bios exceeding 3 lines
- **Description:** Truncate extremely long profile bios gracefully using Tailwind's `line-clamp-3`.
- **Target File:** [profile-card.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/profile-card.tsx)

### 5. `enhancement` Add quick username clear buttons
- **Description:** Add small 'X' buttons inside the search input boxes to easily clear username strings.
- **Target File:** [search-bar.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/landing/search-bar.tsx)

### 6. `documentation` Add comments explaining score weights
- **Description:** Improve code readability by documenting the logic behind the weights in developer score calculations.
- **Target File:** [constants.ts](file:///c:/Users/kano/Desktop/devduel/src/utils/constants.ts)

### 7. `enhancement` Add custom animations on hover
- **Description:** Make landing page feature cards scale slightly on mouse hover for a more interactive experience.
- **Target File:** [feature-showcase.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/landing/feature-showcase.tsx)

### 8. `bug` Correct padding issues on mobile headers
- **Description:** Fix horizontal padding cutoff on header nav links for viewport widths below 380px.
- **Target File:** [header.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/layout/header.tsx)

### 9. `enhancement` Format account age breakdown
- **Description:** Make account age displays cleaner by showing years, months, and days (e.g., "5 years, 3 months").
- **Target File:** [format.ts](file:///c:/Users/kano/Desktop/devduel/src/utils/format.ts)

### 10. `documentation` Create README setup screenshots
- **Description:** Add screenshots illustrating the landing page, repository charts, and leaderboard view.
- **Target File:** [README.md](file:///c:/Users/kano/Desktop/devduel/README.md)

### 11. `enhancement` Add local storage verification warning
- **Description:** Prompt the user with a warning before clearing entries from the leaderboard table.
- **Target File:** [leaderboard/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/leaderboard/page.tsx)

### 12. `enhancement` Dynamic browser tab title updating
- **Description:** Dynamically set the document page title based on the compared developers.
- **Target File:** [compare/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/compare/page.tsx)

### 13. `bug` Filter out forks from language count calculation
- **Description:** Exclude forked repositories when calculating a developer's primary programming language distribution.
- **Target File:** [calculations.ts](file:///c:/Users/kano/Desktop/devduel/src/utils/calculations.ts)

### 14. `enhancement` Add a copy comparison link button
- **Description:** Allow users to copy the shareable comparison URL directly with a single click.
- **Target File:** [compare/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/compare/page.tsx)

### 15. `enhancement` Add a loading skeleton placeholder for repo charts
- **Description:** Enhance repository comparison loading feedback with a animated skeleton bar grid.
- **Target File:** [repositories/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/repositories/page.tsx)

---

## 🟡 Intermediate Issues (20 Issues)

These issues require familiarity with state management, custom React hooks, Next.js routing, and chart configurations.

### 16. `enhancement` Multi-user Comparison (up to 4 developers)
- **Description:** Extend the comparison layout to compare up to 4 developer profiles concurrently.
- **Target File:** [compare/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/compare/page.tsx)

### 17. `enhancement` Add interactive tooltips to language charts
- **Description:** Improve language distribution analysis by adding custom data overlays showing total repository count per language.
- **Target File:** [language-chart.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/language-chart.tsx)

### 18. `bug` Prevent token rate limit cutoff on REST API calls
- **Description:** Implement a fallback check when rate limits are exceeded, prompting user to input an optional personal token.
- **Target File:** [github-api.ts](file:///c:/Users/kano/Desktop/devduel/src/lib/github-api.ts)

### 19. `enhancement` Add star trends over time chart
- **Description:** Fetch and visualize a repository's historical star growth timeline using Recharts LineChart.
- **Target File:** [repositories/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/repositories/page.tsx)

### 20. `enhancement` Leaderboard pagination
- **Description:** Paginate leaderboard table rows (e.g. 10 per page) to prevent layout overflows on large datasets.
- **Target File:** [leaderboard/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/leaderboard/page.tsx)

### 21. `bug` Handle GraphQL fetch failure fallback
- **Description:** Fallback gracefully to public REST endpoints when the token is missing or invalid.
- **Target File:** [comparison-service.ts](file:///c:/Users/kano/Desktop/devduel/src/services/comparison-service.ts)

### 22. `enhancement` Add custom radar shape customizations
- **Description:** Allow toggling specific skills on/off the Radar chart using checkbox selectors.
- **Target File:** [radar-chart.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/radar-chart.tsx)

### 23. `enhancement` Search history panel
- **Description:** Maintain a list of the last 5 successful comparisons in local storage and display them on the homepage.
- **Target File:** [page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/page.tsx)

### 24. `enhancement` Developer achievements page
- **Description:** Create a page showing badge cards, details, and logic required to unlock them.
- **Target File:** [analytics/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/analytics/page.tsx)

### 25. `bug` Fix hydrations mismatch in dark mode initialization
- **Description:** Address next-themes hydration alerts by ensuring layout toggles mount on client-side only.
- **Target File:** [theme-toggle.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/layout/theme-toggle.tsx)

### 26. `enhancement` Add repository size comparison chart
- **Description:** Visualize repository disk space allocations (in Megabytes) with a relative bar chart.
- **Target File:** [repositories/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/repositories/page.tsx)

### 27. `enhancement` Filter repos by primary language
- **Description:** Allow filtering repos in comparison calculations by primary programming language.
- **Target File:** [comparison-service.ts](file:///c:/Users/kano/Desktop/devduel/src/services/comparison-service.ts)

### 28. `bug` Address CORS errors during PDF export
- **Description:** Correct avatar canvas exports by setting `useCORS: true` on html2canvas config objects.
- **Target File:** [compare/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/compare/page.tsx)

### 29. `enhancement` Display repository health score indicators
- **Description:** Calculate open-to-closed issues ratios and pull request merge speeds to generate health metrics.
- **Target File:** [repositories/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/repositories/page.tsx)

### 30. `enhancement` Interactive contribution heatmap cells
- **Description:** Show contribution count and dates when hovering over calendar heatmap grid cells.
- **Target File:** [contribution-heatmap.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/contribution-heatmap.tsx)

### 31. `enhancement` Add CSV format export option
- **Description:** Support exporting raw compared metrics as a downloadable CSV spreadsheet.
- **Target File:** [compare/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/compare/page.tsx)

### 32. `bug` Fix Recharts console warnings in test env
- **Description:** Silence Recharts responsive container warning errors during build compilation processes.
- **Target File:** [radar-chart.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/radar-chart.tsx)

### 33. `enhancement` Compare user commit metrics over past 30 days
- **Description:** Compare the exact number of commits pushed by developers over the past 30 days.
- **Target File:** [comparison-service.ts](file:///c:/Users/kano/Desktop/devduel/src/services/comparison-service.ts)

### 34. `enhancement` Render top 3 languages comparison bar
- **Description:** Render the relative ratios of the top 3 languages used in a stacked progress bar.
- **Target File:** [language-chart.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/language-chart.tsx)

### 35. `enhancement` Add a sorting toggle on compared repositories
- **Description:** Let users sort compared repos by stars, forks, or date updated.
- **Target File:** [repositories/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/repositories/page.tsx)

---

## 🔴 Advanced Issues (15 Issues)

These issues involve server-side logic, API proxies, advanced optimizations, performance auditing, and visual canvas manipulations.

### 36. `enhancement` Server-side Caching using Redis / PostgreSQL
- **Description:** Set up a database cache layer to store parsed profile configurations and bypass GitHub API rate limit thresholds.
- **Target File:** [github-api.ts](file:///c:/Users/kano/Desktop/devduel/src/lib/github-api.ts)

### 37. `enhancement` Export comparison results as an Image
- **Description:** Let users copy comparison card layouts to the clipboard as a PNG image.
- **Target File:** [compare/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/compare/page.tsx)

### 38. `enhancement` Parse commit patterns heatmap from scratch
- **Description:** Build a completely responsive heatmap component without any grid library dependencies.
- **Target File:** [contribution-heatmap.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/contribution-heatmap.tsx)

### 39. `enhancement` Add trending developers section on Landing
- **Description:** Pull trending developers from GitHub Explore API dynamically and display cards on the home page.
- **Target File:** [page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/page.tsx)

### 40. `bug` Correct memory leak in animated counter components
- **Description:** Ensure requestAnimationFrame references are canceled immediately on component unmounting.
- **Target File:** [animated-counter.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/shared/animated-counter.tsx)

### 41. `enhancement` Parse developer pull request merge rates
- **Description:** Use GraphQL query outputs to calculate percentage ratios of successfully merged developer PRs.
- **Target File:** [github-graphql.ts](file:///c:/Users/kano/Desktop/devduel/src/lib/github-graphql.ts)

### 42. `enhancement` Custom PDF rendering layout using jsPDF primitives
- **Description:** Create custom layouts, margins, styling templates and page breaks instead of taking screenshots.
- **Target File:** [compare/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/compare/page.tsx)

### 43. `enhancement` Interactive developer timeline chart
- **Description:** Parse repo creation dates to map developer history across a timeline.
- **Target File:** [comparison-service.ts](file:///c:/Users/kano/Desktop/devduel/src/services/comparison-service.ts)

### 44. `bug` Handle organization profile fallbacks
- **Description:** Render layout variations when comparing organization profiles instead of developer profiles.
- **Target File:** [profile-card.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/profile-card.tsx)

### 45. `enhancement` Add multi-theme options (Retro, Cyberpunk)
- **Description:** Add visual themes with unique background graphics and custom fonts.
- **Target File:** [globals.css](file:///c:/Users/kano/Desktop/devduel/src/app/globals.css)

### 46. `enhancement` Real-time rate limit reset countdown timer
- **Description:** Display a countdown timer indicating when the GitHub rate limit resets when blocked.
- **Target File:** [error-state.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/shared/error-state.tsx)

### 47. `enhancement` Add developer comparison radar shape overlaps
- **Description:** Render two overlapping shapes on a single RadarChart to visually compare skills.
- **Target File:** [radar-chart.tsx](file:///c:/Users/kano/Desktop/devduel/src/components/comparison/radar-chart.tsx)

### 48. `bug` Solve layout overlaps during PDF export on mobile viewports
- **Description:** Temporarily scale viewport configurations during print captures to avoid layouts splitting.
- **Target File:** [compare/page.tsx](file:///c:/Users/kano/Desktop/devduel/src/app/compare/page.tsx)

### 49. `enhancement` Parse repository contribution tiers
- **Description:** Distinguish commit tiers (Major, Moderate, Minor) based on contribution counts.
- **Target File:** [calculations.ts](file:///c:/Users/kano/Desktop/devduel/src/utils/calculations.ts)

### 50. `enhancement` Setup automated visual regression tests
- **Description:** Add Playwright assertions to verify comparison layouts, skeletons, and score dials.
- **Target File:** [package.json](file:///c:/Users/kano/Desktop/devduel/package.json)
