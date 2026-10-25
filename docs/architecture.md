# Architecture

## Overview
```
Student -> Next.js UI -> Next.js API routes -> Supabase (DB, storage, pgvector)
                                  |
                                  +-> LLM API (vision, embeddings, extraction, explanations, quizzes)
```

## The student journey
Upload -> review CLOs and topics -> learn topic by topic -> quiz after each topic -> see readiness.

## Ingestion flow
1. Student uploads a file or pastes text, and picks its type (lecture_notes, slides, past_paper, clo, important_topics, ...).
2. Files go to Supabase Storage. Pasted text is saved directly.
3. An **extractor** reads the content, chosen by source format:
   - `pdf`, `pptx`, `docx`, `text`: Phase 1
   - `image` for CLO tables: Phase 1 (read with the LLM's image input)
   - `handwritten` (photos, scanned PDFs): Phase 2
   Every extractor returns the same output: a list of pages with text. New formats are added without touching the rest of the pipeline.
4. Pages with no usable text (scans, handwriting) are marked `needs_ocr` and shown to the student as "waiting for handwriting support" until Phase 2.
5. Text is split into chunks (roughly 300-500 tokens, with small overlap), keeping file id, page number, and file type.
6. Each chunk is embedded and stored in `chunks` (pgvector).

## Analysis flow
1. **CLO extraction:** from a CLO image or pasted text, produce rows with code, PLO, weightage, description. Show an editable table and have the student confirm.
2. **Topic extraction:** from lecture notes and slides (and textbook), produce topics, each linked to supporting chunks.
3. **Linking:** match questions from quizzes, assignments, and past papers to topics, and topics to CLOs.
4. **Importance scoring:** combine signals per topic (see below).
5. **Study plan:** given hours until the exam, split time across CLOs in proportion to weightage, then order topics inside each CLO by importance and student weakness.

## Importance scoring (v1, keep it simple)
```
score = 3 * past_paper_or_quiz_mentions
      + 2 * assignment_mentions
      + (linked_clo_weight_percent / 10)     # 30% CLO adds 3 points
      + 3 * important_topics_hint (0 or 1)   # student/instructor said it matters
      + 1 * lecture_coverage (share of lecture chunks on this topic, scaled 0-3)
```
If a topic links to several CLOs, use the highest weight. Store each signal in `topic_signals` so the UI can show "why is this ranked high". Weights are a starting guess; tune them using the test set.

## Tutor flow (per topic)
1. Retrieve top chunks for the topic (lecture and slides first, then textbook).
2. Teach: generate a short explanation using only those chunks, with citations.
3. Quiz: generate practice questions styled after past quizzes, assignments, and past papers for that topic.
4. Student answers; the app grades against source text and solutions if available, and explains mistakes with a citation.
5. Record the attempt and update readiness.

## Key decisions
- One database (Supabase) for everything, including vectors.
- Plain functions and prompts, no extra frameworks.
- Extractor interface from day one so handwritten notes slot in during Phase 2.
- Every LLM call receives retrieved chunks and must return citations.

## Risks
- Messy PDFs and slides (tables, formulas, diagrams) produce bad chunks.
- Image text can be misread (e.g. CLO screenshots), so extracted CLOs are always confirmed by the student.
- Handwriting recognition is the hardest quality problem; it gets its own phase and review step.
- Hallucinated explanations: enforce citations and "not found".
- Bad generated questions: validate against source.
- Copyright: students upload only material they have the right to use; files stay private.
