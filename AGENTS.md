# AGENTS.md

Read this file and README.md at the start of every session.

## Project
CramBudy: an AI study tutor for students cramming 1-2 days before an exam. Students upload CLOs, lecture notes, slides, handwritten notes, quizzes, assignments, past papers, and typed notes about what's important. The app ranks topics by importance, teaches them topic by topic from the student's own material, and quizzes them after each topic. Full spec in README.md.

## Stack
Next.js (App Router, TypeScript), Supabase (Postgres, auth, storage, pgvector), an LLM API with image input, deployed on Vercel. Do not swap these without asking.

## Phases
- Phase 1: typed and digital material (PDF, PPTX, DOCX, pasted text) plus CLOs from image or text.
- Phase 2: handwritten notes (photos and scans).
- Phase 3: extras listed in docs/build-plan.md.
Do not start a later phase before the current one is done. But design for it now: all file reading goes through a small "extractor" interface (one extractor per source format) so handwritten support can be added in Phase 2 without rewriting anything.

## Working rules
- Work on ONE step of docs/build-plan.md at a time. Do not jump ahead.
- Keep changes small. Prefer simple, boring, readable code over clever code.
- Ask before adding any new library, service, or framework.
- Before finishing a step, run the app and tell me how to verify it works.
- After each working step, suggest a Git commit message. Do not bundle unrelated changes.
- When something fails, explain the cause in plain language, then fix it.
- Update docs/progress.md at the end of each session (what worked, what broke, what's next).

## Product rules (must never be broken)
1. Every explanation, answer, and quiz question must be grounded in retrieved chunks and carry a citation (file name + page).
2. If retrieval finds nothing relevant, respond "Not found in your materials." Never answer from general knowledge unless the user explicitly asks for it, and label it clearly if so.
3. Each file has a type: lecture_notes, slides, handwritten_notes, past_quiz, past_paper, assignment, solution, syllabus, clo, important_topics, textbook, exam_details. Use the type when ranking importance.
4. Importance scores must be explainable: store the signals (e.g. quiz_mentions, assignment_mentions, paper_mentions, clo_weight, important_topics_hint) next to the score.
5. CLOs have a code, PLO, weightage (percent of the exam), and description. After extracting CLOs from an image or text, always show them in an editable table and have the student confirm. Never silently trust extraction (text in images can be misread).
6. Users can only ever read and write their own data. Use Supabase Row Level Security on every table.
7. Generated quiz questions must be checked against source text. If a question can't be tied to a chunk, discard it.
8. Teaching comes first, then quiz: for each topic the student sees the explanation, then the questions.

## Security
- Never hardcode or print API keys. Use environment variables (see .env.example).
- Never commit .env files.
- Validate file type and size on upload (allowed: PDF, PPTX, DOCX, images, pasted text).
- Put limits on LLM calls (max chunks per request, max questions per call) so a bug can't run up costs.

## Code conventions
- TypeScript strict mode. Small files, clear names.
- Keep LLM prompts in docs/prompts.md and a single `lib/prompts` module, not scattered in route handlers.
- Keep database access in `lib/db`, retrieval in `lib/retrieval`, file reading in `lib/extractors`.
- Add a short comment above any non-obvious logic.

## Commands
(Fill in as the project is created)
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Quality check: see docs/test-set.md

## Done means
The step runs end to end on a real file from the test set, nothing earlier broke, and docs/progress.md is updated.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
