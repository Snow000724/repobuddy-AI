# RepoBuddy AI

> **Understand any codebase. Find bugs faster. Contribute with confidence.**

Built for **Hacktoberfest Hack Day x KCET (Amritsar)**, **RepoBuddy AI** is a responsive, beginner-friendly developer assistant that helps students and new open-source contributors understand public GitHub repositories, inspect project files, explain unfamiliar code snippets, and diagnose bugs.

## Implemented Features

| Feature | What It Does |
| :--- | :--- |
| **Homepage & Quick Launcher** | Clean dark-navy developer interface with URL input, quick-try repository presets, and interactive cards for **Understand Code**, **Find Bugs**, and **Start Contributing**. |
| **Repository Analyzer** | Validates public GitHub URLs (`https://github.com/owner/repo`), queries the **GitHub REST API v3**, and displays repository description, primary language, stars, forks, license, README content, and a categorized list of important files with live file inspection. |
| **AI Project Explanation** | Generates a 5-part beginner walkthrough (*What the Project Does*, *Which Problem It Solves*, *Main Technologies Used*, *How Important Files Relate*, and *How a Beginner Can Start Exploring*) strictly grounded in retrieved repository data, explicitly noting any missing fields. |
| **Code Explainer** | Accepts code snippets in JavaScript, Python, TypeScript, Java, C/C++, Go, Rust, or HTML/CSS and explains what the code does, important variables/functions, step-by-step execution flow, edge cases, and one beginner-friendly improvement. |
| **Bug Helper** | Diagnoses a submitted code snippet + problem description, returning the likely root cause, a corrected code block, an explanation of the fix, and a small verification test case (with an explicit static-analysis notice that code was not executed). |
| **First Contribution Guide** | Suggests beginner-friendly contributions based on actual repository signals (clearly labeled as **`Auto-Generated Suggestion (Not a Confirmed Open Issue)`**) alongside live `good first issue` items retrieved from GitHub. |
| **Labeled Demonstration Mode & Self-Test Suite** | Includes a clearly labeled **Demo Mode** for offline/rate-limited environments and a built-in **6-Test Verification Runner** in the UI. |

## Technologies & AI Models Used

- **Frontend**: Semantic HTML5, CSS3 (`css/styles.css` + Tailwind CSS CDN `3.4.17`, MIT License), Vanilla ES6+ JavaScript (`js/github.js`, `js/analyzer.js`, `js/app.js`). Zero build step required.
- **Data Integration**: Public **GitHub REST API v3** (`https://api.github.com/repos/{owner}/{repo}`, `/readme`, `/contents`, `/languages`, `/issues`).
- **Optional Lightweight Backend**: Zero-dependency Node.js HTTP server (`server.js`) providing a `/api/ai` proxy route so API keys remain stored safely in server-side `.env`.
- **AI Model Support**:
  - Supports open-weight instruction and coding models via OpenRouter, Groq, or local Ollama: **`meta-llama/llama-3.3-70b-instruct:free`**, **`qwen/qwen-2.5-coder-32b-instruct`**, and **`mistralai/mistral-7b-instruct:free`**.
  - Includes a built-in **Grounded Repository & Static Code Analyzer** when no external AI key is configured, clearly labeled in the UI so it never pretends static analysis is a live LLM response.

## Project File Structure

```text
repobuddy-ai/
├── index.html          # Main application layout and responsive UI views
├── css/
│   └── styles.css      # Custom dark-navy theme, glass cards, and code editor styling
├── js/
│   ├── github.js       # GitHub URL validation, REST API client, and labeled Demo Mode presets
│   ├── analyzer.js     # Grounded repo explanation builder, static code/bug parser, and AI client
│   └── app.js          # UI state management, modal controllers, and 6-stage self-test suite
├── server.js           # Optional zero-dependency Node.js server with secure /api/ai proxy
├── .env.example        # Template for server-side AI API key configuration
├── package.json        # Node metadata and start script
├── CONTRIBUTING.md     # Beginner-friendly contribution workflow
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## Installation & Execution Instructions

### Option 1: Instant Browser Run (Zero Setup — Recommended for Quick Demo)
1. Clone or unzip the repository:
   ```bash
   git clone https://github.com/<your-username>/repobuddy-ai.git
   cd repobuddy-ai
   ```
2. Open `index.html` directly in Chrome, Edge, Firefox, or Safari (or serve with VS Code Live Server / `python3 -m http.server 8000`).

### Option 2: Run with Optional Node.js Backend Proxy (For Server-Side `.env` AI Key)
1. Ensure Node.js (`>= 18.0.0`) is installed.
2. Copy `.env.example` to `.env` and add your OpenRouter or Groq API key:
   ```bash
   cp .env.example .env
   ```
3. Start the lightweight server:
   ```bash
   node server.js
   ```
4. Open `http://localhost:3000` in your browser, open **AI Settings**, and select **Local Node.js Backend Proxy (`http://localhost:3000/api/ai`)**.

## Testing the User Journey

You can verify all required scenarios interactively via the **Self-Test** tab in the top navigation bar or manually:

1. **Valid Public Repository URL**: Enter `https://github.com/expressjs/express` or `https://github.com/pallets/flask` and click **Analyze Repository**.
2. **Invalid URL**: Enter `https://google.com/foo` or `https://github.com/onlyowner` to verify clear input validation errors.
3. **Non-Existent Repository**: Enter `https://github.com/nonexistent-user-9999/missing-repo-9999` to verify the HTTP 404 error banner.
4. **Analyze a Short Code Snippet**: Open the **Code Explainer** or **Bug Helper** tab, load a preset or paste a snippet, and click **Explain Code** / **Diagnose & Suggest Fix**.
5. **Handle a Failed AI Request**: Click **AI Settings** in the top bar, check **Simulate Failed AI Request**, save, and run an analysis to verify the non-blocking warning banner and automatic fallback to grounded static analysis.
6. **Responsive Layout**: Resize the browser window between mobile (`375px`) and laptop (`1280px+`) widths.

## Known Limitations

- **Unauthenticated GitHub API Rate Limits**: GitHub allows 60 unauthenticated REST API requests per hour per IP address. When rate-limited (`HTTP 403`), RepoBuddy AI displays the exact reset time and provides a 1-click switch to the clearly labeled **Demonstration Mode**.
- **Public Repositories Only**: Private repositories require authentication and are intentionally not accessed or scraped.
- **Root-Level File Tree Preview**: To keep API usage fast and rate-limit friendly, the analyzer inspects the root directory tree and truncates very large READMEs (`> 3,500` characters) in the inline preview.
- **Static / AI Bug Analysis Only**: Bug Helper analyzes code statically or via AI without executing untrusted code in a live runtime sandbox.

## How to Contribute

We welcome beginner contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for step-by-step instructions on forking, branching, running the built-in verification suite, and opening a Pull Request.

## License

After checking the licensing requirements of included libraries (Tailwind CSS CDN and Google Fonts — both permissive/open), this project is released under the **[MIT License](LICENSE)**.
