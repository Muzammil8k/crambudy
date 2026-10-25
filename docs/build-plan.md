# Build plan

Do one step at a time. Test each with real files from the test set. Commit after each working step.

## Phase 1: Core app (typed and digital material)
- [ ] **0. Setup:** Next.js project, Supabase project, env vars, deploy a hello-world page.
- [ ] **1. Upload and extract:** upload a PDF, PPTX, or pasted text, choose its type, show extracted text per page on screen.
- [ ] **2. Chunk and embed:** split into chunks, store with embeddings, show chunk count.
- [ ] **3. Ask with citations:** ask a question, get an answer citing file and page. Test the "not found" case.
- [ ] **4. CLOs:** upload a CLO screenshot or paste CLO text, extract code, PLO, weightage, description, show an editable table to confirm.
- [ ] **5. Topics:** extract topics from lecture notes and slides, link them to CLOs, allow manual edits.
- [ ] **6. Quiz and past-paper material:** upload past quizzes, assignments, past papers, and pasted "important topics"; link their questions to topics.
- [ ] **7. Importance ranking:** compute topic scores from all signals including CLO weightage, and show why each topic ranks where it does.
- [ ] **8. Teach a topic:** short explanation per topic with citations, topics shown most important first.
- [ ] **9. Quiz a topic:** generate questions in the style of past material, grade answers, store attempts.
- [ ] **10. Readiness and study plan:** enter exam date and hours left, get an ordered plan, show readiness per topic and per CLO.

## Phase 2: Handwritten notes
- [ ] **11. Handwritten extractor:** read photos and scanned PDFs using the LLM's image input (or an OCR service), behind the same extractor interface as other formats.
- [ ] **12. Review step:** show the extracted text next to the original image so the student can fix misreads.
- [ ] **13. Quality pass:** test on real handwritten notes, tune, and flag low-confidence pages.

## Phase 3: Extras
- [ ] Textbook vs lecture gap detection
- [ ] Flashcards and formula sheets
- [ ] "Panic mode" (I have 3 hours, what now?)
- [ ] Questions modeled on the instructor's style
- [ ] Privacy policy and terms of use before real users

## Definition of done for every step
- Works on a real file
- Nothing earlier broke
- Citations still shown where relevant
- docs/progress.md updated
