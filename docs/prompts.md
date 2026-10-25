# Prompt library

Keep prompts here and mirror them in `lib/prompts`. Change a prompt, then re-run the checks in docs/test-set.md.

General rules for all prompts: use only the provided chunks, cite file and page for every claim, and say "Not found in your materials" if the chunks don't cover it. Return JSON where noted, with no extra text.

## 1. Extract CLOs (from an image or pasted text)
```
You are given a table of Course Learning Outcomes (CLOs), as an image or as text.
Columns are usually: CLO, PLO, Weightage, Description.
Extract every row exactly as written.
Return JSON: [{"code": "CLO-1", "plo": "PLO-2", "weight": 30.0, "description": "..."}]
Rules: do not invent rows. Use null for any value you cannot read. If a word looks garbled or cut off, copy it as seen and add "uncertain": true to that row. The student will review the result.

INPUT:
{image_or_text}
```

## 2. Extract topics
```
From these lecture note chunks, list the main topics a student must know.
For each topic give: name, a one-sentence summary, and the chunk ids that cover it.
Return JSON: [{"name": "...", "summary": "...", "chunk_ids": ["..."]}]
Merge duplicates. Keep the list to the real teaching topics, not housekeeping slides.

CHUNKS:
{chunks_with_ids}
```

## 3. Link a question to topics and CLOs
```
Given this quiz/assignment question, the list of topics, and the list of CLOs, choose the best matching topic id and CLO id (or null).
Return JSON: {"topic_id": "...", "clo_id": "..." or null, "bloom_level": "remember|understand|apply|analyze|evaluate|create"}

QUESTION: {question}
TOPICS: {topics}
CLOS: {clos}
```

## 4. Explain a topic
```
Explain the topic "{topic}" to a student who has little time.
Use ONLY the chunks below. Start with a 2-3 sentence summary, then key points, then one worked example if the chunks contain one.
After each claim add a citation like [file, p.X].
If the chunks don't cover something important, say "Not found in your materials."

CHUNKS:
{chunks_with_sources}
```

## 5. Generate practice questions
```
Write {n} practice questions on the topic "{topic}" using ONLY the chunks below.
Match the style and difficulty of these past questions: {example_questions}
Return JSON: [{"type": "mcq|short|long", "question": "...", "options": [...] or null, "answer": "...", "explanation": "...", "source_chunk_ids": ["..."]}]
Every question must be answerable from the chunks. Avoid ambiguous wording.

CHUNKS:
{chunks_with_ids}
```

## 6. Grade an answer
```
Question: {question}
Reference answer and source text: {answer} {source_chunks}
Student answer: {student_answer}
Grade it. Return JSON: {"correct": true|false, "score": 0-1, "feedback": "what was right, what was missing, with citation [file, p.X]"}
```

## 7. Validate a generated question (optional second pass)
```
Question: {question}
Claimed answer: {answer}
Source: {chunks}
Is the question clear, and is the answer fully supported by the source? Return JSON: {"valid": true|false, "reason": "..."}
```
