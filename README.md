# CramBudy

An AI study tutor for students who start preparing 1-2 days before an exam.

The student uploads everything they have for a course. CramBudy works out what matters most, **teaches the course topic by topic** using the student's own material, and then **quizzes them** on each topic.

## How it works
1. **Upload:** the student adds their course material (see below) and the exam details.
2. **Review:** the app extracts the CLOs and the topic list. The student can correct anything it got wrong.
3. **Learn:** the tutor teaches one topic at a time, most important first, with short explanations taken from the student's own notes and cited back to the source page.
4. **Quiz:** after each topic, the student answers practice questions styled after their real quizzes, assignments, and past papers.
5. **Track:** the app shows readiness per topic and per CLO, so the student knows where to spend the remaining hours.

## What students can upload
| Material | Accepted as | Why it matters |
|---|---|---|
| CLOs (with PLO and weightage) | Screenshot/image of the table, or pasted text | Defines what the exam covers and how it is weighted |
| Lecture notes | PDF, DOCX, pasted text | Main teaching content |
| Slides | PDF, PPTX | Main teaching content |
| Handwritten notes | Photos, scanned PDFs (Phase 2) | Many students only have these |
| Past quizzes | PDF, image, pasted text | Strong signal of what gets tested |
| Assignments / lab sheets | PDF, DOCX, pasted text | Strong signal of what gets tested |
| Past papers | PDF, image, pasted text | Strongest signal of what gets tested |
| Solutions / marking schemes | PDF, image, pasted text | Lets the tutor check answers |
| Syllabus / course outline | PDF, DOCX, pasted text | Official topic list |
| Important topics | Typed or pasted text (what the instructor or classmates said is important) | Manual priority boost |
| Textbook chapters | PDF | Fills gaps in the lecture notes |
| Exam details | Form (date, duration, format, chapters covered) | Drives the study plan and question style |

### Example CLO input
Students will paste or screenshot a table like this:

| CLO | PLO | Weightage | Description |
|---|---|---|---|
| CLO-1 | PLO-2 | 30.0 | Explain fundamental concepts of web technologies and client-server architecture... |
| CLO-2 | PLO-2 | 30.0 | Apply HTML, CSS, JavaScript, and React to design interactive front-end user interfaces. |
| CLO-3 | PLO-3 | 20.0 | Develop and integrate back-end services using Node.js, Express.js, and MongoDB... |
| CLO-4 | PLO-4 | 20.0 | Design and deploy a secure full-stack web application (MERN stack)... |

The weightage is treated as the share of the exam each CLO is worth, so it directly shapes topic ranking and how much study time each area gets. Extracted CLOs are always shown in an editable table so the student can fix typos and misreads before anything is built on them.

## Core features
- Upload and tagging of all material above
- Question answering over the student's files, always with citations
- CLO and topic extraction, with manual editing
- Importance ranking of topics, with visible reasons
- Topic-by-topic teaching, most important first
- Quizzes per topic, in the style of the student's own past material
- Readiness tracking per topic and per CLO
- Study plan based on exam date and hours left

## Rules
- Every explanation and answer must cite its source (file + page).
- If the answer isn't in the uploaded files, say "Not found in your materials". Never guess.
- Importance scores are inferred, so always show why a topic is ranked high and let the student override it.
- Each student's files are private to them.

## Phases
- **Phase 1: Core app** (typed and digital material, CLO images and text)
- **Phase 2: Handwritten notes** (photos and scans)
- **Phase 3: Extras** (see `docs/build-plan.md`)

## Stack
Next.js, Supabase (Postgres, auth, storage, pgvector), an LLM API (with image input), Vercel. See `docs/architecture.md`.

## Docs
- `AGENTS.md`: rules for the coding agent (read first)
- `docs/architecture.md`: how the pieces connect
- `docs/data-model.md`: tables and relationships
- `docs/build-plan.md`: phase and step checklist
- `docs/prompts.md`: prompt library
- `docs/test-set.md`: quality checks
- `docs/progress.md`: session log
