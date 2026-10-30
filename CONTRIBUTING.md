# Contributing to RepoBuddy AI

Thank you for your interest in contributing to **RepoBuddy AI**! We built this project during **Hacktoberfest Hack Day x KCET** in Amritsar to help beginner developers understand open-source repositories and make their first contributions with confidence.

## How to Contribute

1. **Fork the Repository**: Click the **Fork** button on GitHub and clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/repobuddy-ai.git
   cd repobuddy-ai
   ```
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Run & Test Locally**:
   - Open `index.html` directly in any browser, **or** run `node server.js` and visit `http://localhost:3000`.
   - Open the **Self-Test** tab in the navigation bar and click **Run All 6 Verification Tests** to make sure all core user journeys pass.
   - Check your browser's Developer Console (`F12`) to ensure there are zero runtime errors.
4. **Keep Code Modular & Honest**:
   - Put GitHub API logic in `js/github.js`, analysis/AI logic in `js/analyzer.js`, and DOM event handlers in `js/app.js`.
   - Never hardcode API keys or secrets.
   - Never claim an AI model executed code or invented repository facts not backed by retrieved data.
5. **Submit a Pull Request**: Push your branch and open a Pull Request with a clear summary of what you improved!
