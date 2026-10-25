# Data model

All tables have `id` (uuid), `created_at`, and `user_id` (owner) with Row Level Security so users only see their own rows. The embedding size depends on the embedding model chosen; 1536 is a placeholder.

## Tables

### courses
`name`, `exam_date`, `exam_duration_min`, `exam_format` (mcq / short / long / mixed), `chapters_covered`, `notes`

### files
`course_id`, `file_name`, `storage_path` (null for pasted text), `raw_text` (for pasted text), `file_type` (lecture_notes, slides, handwritten_notes, past_quiz, past_paper, assignment, solution, syllabus, clo, important_topics, textbook, exam_details), `source_format` (pdf, pptx, docx, image, text), `page_count`, `status` (uploaded, parsed, embedded, failed), `needs_ocr` (bool)

### chunks
`file_id`, `course_id`, `page_number`, `chunk_index`, `text`, `embedding vector(1536)`, `file_type` (copied for fast filtering)

### clos
`course_id`, `code` (e.g. CLO-1), `plo` (e.g. PLO-2), `weight` (percent of the exam, e.g. 30.0), `description`, `bloom_level` (nullable), `source` (image / pasted / manual), `confirmed` (bool, set when the student approves the extracted table)

### topics
`course_id`, `name`, `summary`, `importance_score`, `manual_priority` (nullable override), `source` (extracted / manual)

### topic_chunks
`topic_id`, `chunk_id`, `relevance`

### topic_clos
`topic_id`, `clo_id`

### topic_signals
`topic_id`, `quiz_mentions`, `assignment_mentions`, `paper_mentions`, `clo_weight`, `important_topics_hint`, `lecture_coverage` (so the UI can explain every ranking)

### questions
`course_id`, `topic_id`, `clo_id` (nullable), `origin` (past / generated), `question_type` (mcq / short / long), `question_text`, `options` (json, nullable), `answer_text`, `explanation`, `source_chunk_ids` (array), `bloom_level` (nullable)

### attempts
`question_id`, `answer_given`, `is_correct`, `score`, `time_taken_sec`, `attempted_at`

### readiness (view or table)
Per topic and per CLO: attempts, correct rate, last attempt time.

## Relationships
```
course -> files -> chunks
course -> clos <-> topics (topic_clos)
topics <-> chunks (topic_chunks)
topics -> topic_signals
topics -> questions -> attempts
```

## Notes
- Index `chunks.embedding` with an ivfflat or hnsw index once there is enough data.
- Keep `source_chunk_ids` on every question so citations and validation are always possible.
- Allow manual edits to CLOs, topics, and priorities; extraction will sometimes be wrong.
