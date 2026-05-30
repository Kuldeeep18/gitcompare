# Contributing to GitCompare

First off, thank you for considering contributing to GitCompare! It's people like you that make GitCompare such a great tool for the open-source community.

We welcome all contributions, whether they are bug fixes, documentation improvements, new features, or even simple enhancements.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### 1. Finding an Issue
We have compiled a long list of future improvements in [ISSUES.md](ISSUES.md) categorized by difficulty labels:
- `good first issue` / `beginner`
- `intermediate`
- `advanced`

You can also browse the active GitHub Issues tab. Once you find an issue you would like to work on, ask to be assigned by leaving a comment.

### 2. Local Development Setup
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/GitCompare.git
   cd GitCompare
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables. Create a `.env.local` file:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   ```
   *Note: While the app will run without a token, unauthenticated rate limits will quickly restrict API requests.*
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Submitting a Pull Request
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and write clean code with TypeScript.
3. Verify that the project builds and lints without error:
   ```bash
   npm run build
   npm run lint
   ```
4. Commit your changes with clear messages.
5. Push to your branch and open a Pull Request against the `main` branch of the parent repository.
6. Fill out the PR template completely.
