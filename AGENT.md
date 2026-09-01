# Global Agent Rules

## Learning-First Coding Policy

- Use AI as a learning tool, not as a default code generator.
- For learning projects, do not generate a full project or complete feature implementation unless explicitly asked.
- Prefer explaining concepts, tradeoffs, and implementation steps before writing code.
- When the user is practicing or building a portfolio project, guide them with:
  - concepts they need to understand,
  - small tasks they can code themselves,
  - hints before final fixes,
  - review after they paste their own code.
- Help debug and optimize code after the user has attempted an implementation.
- When showing code, keep it scoped to the specific bug, pattern, or example being discussed.
- Make sure the user can explain the code in an interview, not just run it.
- For portfolio projects with a tight timeline, prioritize a small complete MVP, deployment, README, screenshots, and CV-ready talking points.

## Project Git Workflow

- Follow a clear Git workflow for this project before making code changes.
- Check the current branch and worktree status before editing files.
- Keep changes small and focused, matching one logical task at a time.
- Do not mix unrelated UI, backend, refactor, and configuration changes in the same work unit.
- Use meaningful branch names that clearly describe the task or change.
- Follow Git commit message conventions for this project, using clear conventional-style commit messages such as `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, or `chore:`.
- Do not commit automatically unless the user explicitly asks for a commit.
- Before suggesting a commit, summarize what changed and mention any tests or checks that were run.
