# 🎓 Research Journal Finder AI

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Python](https://img.shields.io/badge/Python-3.11%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-28%20Passed%20(100%25)-success?logo=pytest&logoColor=white)](#-automated-testing-suite)
[![OS](https://img.shields.io/badge/Platform-Windows%2010%2F11%20%7C%20macOS%20%7C%20Linux-lightgrey)](#-quick-start-windows-powershell)

> **Evidence-Grounded Autonomous Academic Journal Recommendation Agent**  
> Matches research manuscripts to peer-reviewed academic journals using live scholarly registries (**OpenAlex**, **Crossref**, **DOAJ**), transparent multi-criteria ranking, strict anti-hallucination verification, and conversational **AI Voice Mode** (ChatGPT / Gemini Live style).

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Workflow](#-architecture--workflow)
- [Project Structure](#-project-structure)
- [Voice Agent Mode](#-voice-agent-mode-chatgpt--gemini-live-style)
- [Quick Start: Windows PowerShell](#-quick-start-windows-powershell)
- [Quick Start: Web Dashboard (React / Vite)](#-quick-start-web-dashboard-react--vite)
- [Quick Start: CLI Harness](#-quick-start-cli-harness)
- [Configuration & Environment Variables](#-configuration--environment-variables)
- [Authoritative Registries & Anti-Hallucination Policy](#-authoritative-registries--anti-hallucination-policy)
- [Automated Testing Suite](#-automated-testing-suite)
- [Export Formats](#-export-formats)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🌟 Overview

Researchers frequently face manuscript rejections, opaque publication fees, predatory publishers, or months of wasted review cycles due to submitting to poorly matched journals.

**Research Journal Finder AI** solves this with an **autonomous, bounded research agent**:
- Takes an uploaded manuscript (PDF or plain text) or structured inputs (title, abstract, keywords, methodology).
- Decomposes the paper into semantic concept vectors and targeted search queries.
- Discovers venues by analyzing published literature in **OpenAlex**, **Crossref**, and **DOAJ**.
- Deduplicates candidates strictly using canonical ISSNs (avoiding false merges of similar names).
- Iteratively identifies missing metadata and executes targeted gap-filling queries.
- Scores candidates across three independent dimensions without combining them into misleading ratings.
- Verifies indexing claims against authoritative registries, explicitly marking unverified claims as `REQUIRES_MANUAL_REVIEW`.
- Provides an immersive conversational **AI Voice Agent** for hands-free dialogue.

---

## ✨ Key Features

| Capability | Description |
| :--- | :--- |
| **Autonomous Bounded Agent** | 15-step state machine orchestrator with adaptive query planning and 7 deterministic stop conditions. |
| **Live Scholarly Registries** | Direct integration with OpenAlex Works & Sources, Crossref container feeds, and DOAJ registry. |
| **Strict Identity Deduplication** | Canonical `XXXX-XXXX` ISSN resolution; distinctly preserves independent journals with similar titles. |
| **Transparent Independent Scoring** | Decomposed into **Research Relevance** (0–100%), **Publication Suitability** (0–100%), and **Evidence Completeness** (0–100%). |
| **Anti-Hallucination Verification** | 5 explicit states: `VERIFIED`, `NOT_VERIFIED`, `CONFLICTING_EVIDENCE`, `UNAVAILABLE`, `REQUIRES_MANUAL_REVIEW`. |
| **AI Voice Agent Mode** | Audio-reactive chromatic orb, Speech-to-Text (STT), voice synthesis (TTS), Web Audio API analyzer, and 3 personas. |
| **Multi-Format Reporting** | Downloadable HTML Dossier, Markdown report, CSV comparison matrix, JSON payload, and full `.zip` project export. |
| **Persistent SQLite Storage** | Relational audit trail for research sessions, executed queries, evidence records, and reproducibility. |

---

## 🧠 Architecture & Workflow

The orchestrator operates as an explicit, bounded state machine with adaptive feedback loops:

```
[ START ]
    │
    ▼
[ 1. VALIDATE_INPUT ] ──────► (Title < 5 chars or Abstract < 15 chars? ──► Stop)
    │
    ▼
[ 2. ANALYZE_RESEARCH ] ────► (Decompose concepts, domain taxonomy, methodology)
    │
    ▼
[ 3. CREATE_SEARCH_PLAN ] ──► (Generate multi-source title, concept & method queries)
    │
    ▼
[ 4. SEARCH_SCHOLARLY_SOURCES ] ◄────────────────────────┐
    │                                                    │
    ▼                                                    │
[ 5. NORMALIZE_AND_DEDUPLICATE ] (Canonical ISSN match)  │ [Loop if gaps exist
    │                                                    │  & budget permits]
    ▼                                                    │
[ 6. EVALUATE_CANDIDATES ]                               │
    │                                                    │
    ▼                                                    │
[ 7. CHECK_EVIDENCE_GAPS ] ────► Missing APC or Scope? ──┼──► [ 8. CREATE_FOLLOW_UP_QUERIES ]
    │                                                    │             │
    │ (No critical gaps OR budget limit reached)         │             ▼
    ▼                                                    └─── [ 9. SEARCH_MISSING_EVIDENCE ]
[ 10. VERIFY_JOURNALS ] ────► (Cross-check ISSN Portal, Crossref metadata & DOAJ)
    │
    ▼
[ 11. RANK_AND_EXPLAIN ] ───► (Compute Relevance, Suitability & Completeness scores)
    │
    ▼
[ 12. GENERATE_EVIDENCE_BACKED_REPORT ]
    │
    ▼
[ 13. SAVE_RESULTS_AND_END ] ──► (Persist session to local SQLite database)
```

### Deterministic Stopping Rules

1. **Maximum Iterations Budget**: 1 to 10 loops (default: 5).
2. **Maximum API Requests**: Bounded call ceiling (default: 35 requests).
3. **No-Progress Termination**: Automatically stops if 2 consecutive iterations discover no new useful evidence.
4. **Sufficient Evidence**: Stops early if all candidate journals have verified APC, scope, and open-access metadata.
5. **Execution Timeout**: Wall-clock safety limit (default: 180 seconds).
6. **Invalid Input Protection**: Halts gracefully if inputs are empty or corrupt.
7. **Partial Result Preservation**: If an external registry experiences an error, all partial verified evidence is preserved.

---

## 📁 Project Structure

```
research-journal-finder/
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git exclusion rules
├── README.md                     # Complete project documentation
├── package.json                  # Web application dependencies (React, Vite, Tailwind)
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build and development configuration
├── index.html                    # Single-page web entrypoint
│
├── src/                          # Interactive Web Application
│   ├── App.tsx                   # Main layout, state coordination, and 7-tab router
│   ├── main.tsx                  # React DOM root entrypoint
│   ├── index.css                 # Global Tailwind CSS imports
│   ├── types.ts                  # Canonical TypeScript data models & interfaces
│   │
│   ├── components/               # Modular UI Components
│   │   ├── Navbar.tsx            # Header, tab navigation, Voice & Download triggers
│   │   ├── DashboardView.tsx     # Executive summary, workflow diagram, sample papers
│   │   ├── FindJournalsView.tsx  # Manuscript submission, PDF upload, filter controls
│   │   ├── JournalCard.tsx       # Information-dense card with 3 scores & verification
│   │   ├── AgentActivityView.tsx # Visual state machine, query table, live event log
│   │   ├── JournalComparisonView.tsx # Side-by-side matrix & multi-format exports
│   │   ├── VerificationReportView.tsx# Factual registry audit & anti-hallucination rules
│   │   ├── SearchHistoryView.tsx # SQLite session browser & restore actions
│   │   ├── SettingsView.tsx      # Polite pool emails, LLM providers & cache config
│   │   ├── VoiceAgentModal.tsx   # Hypnotic voice orb, live transcript, 3 personas
│   │   ├── VoiceTriggerButton.tsx# Pinned floating voice trigger button
│   │   └── DownloadModal.tsx     # ZIP generator, GitHub guide, in-browser file explorer
│   │
│   ├── data/
│   │   └── benchmarkJournals.ts  # Verified peer-reviewed journals dataset
│   │
│   └── services/
│       ├── scholarlyDiscovery.ts # Client discovery engine & state machine runner
│       ├── voiceAgentService.ts  # STT, TTS, Web Audio analyser & academic reasoning
│       └── zipExporter.ts        # In-browser JSZip archive generator
│
├── python_backend/ (Included in .zip export & standalone Python deployment)
│   ├── app.py                    # Complete Streamlit interactive dashboard
│   ├── requirements.txt          # Pinned Python 3.11 dependencies
│   ├── run.ps1                   # One-click Windows PowerShell launcher
│   ├── run_cli.py                # Command-line test harness & benchmark runner
│   │
│   ├── config/
│   │   └── settings.py           # Pydantic configuration & environment variables
│   ├── models/
│   │   ├── research.py           # ResearchInput, ResearchProfile, SearchQuery
│   │   ├── journal.py            # CanonicalJournal with decomposed scores
│   │   └── evidence.py           # VerificationCheck and EvidenceItem schemas
│   ├── database/
│   │   ├── schema.sql            # SQLite relational DDL with foreign keys
│   │   ├── db.py                 # Thread-safe SQLite connection manager
│   │   └── repository.py         # CRUD repository for sessions, queries & journals
│   ├── services/
│   │   ├── openalex_service.py   # OpenAlex Works & Sources API client
│   │   ├── crossref_service.py   # Crossref Works & Journals metadata client
│   │   ├── doaj_service.py       # DOAJ Open Access registry client
│   │   ├── llm_service.py        # Adapter for Gemini, OpenAI, Claude, or Offline Mock
│   │   └── embeddings_service.py # SentenceTransformers / TF-IDF semantic similarity
│   ├── agents/
│   │   ├── state.py              # Typed AgentState representation
│   │   ├── paper_analyzer.py     # Manuscript validator & concept extractor
│   │   ├── planner_agent.py      # Adaptive query planner & gap analyzer
│   │   ├── search_agent.py       # Rate-limited query dispatcher with backoff
│   │   ├── journal_agent.py      # Canonical normalization & deduplication
│   │   ├── ranking_agent.py      # Multi-criteria scoring engine
│   │   ├── verification_agent.py # Factual registry auditor
│   │   ├── report_agent.py       # Dossier compiler
│   │   └── orchestrator.py       # LangGraph state machine workflow
│   ├── utils/
│   │   ├── pdf_extractor.py      # PyMuPDF parser with pure-Python fallback
│   │   ├── text_processing.py    # NLP tokenization & title/abstract extraction
│   │   ├── deduplication.py      # Strict ISSN & normalized title deduplication
│   │   ├── retry.py              # Exponential backoff with jitter (HTTP 429/503)
│   │   └── caching.py            # SQLite + memory cache with TTL
│   └── tests/                    # 28 Automated Unit & Integration Tests
│       ├── test_analyzer.py
│       ├── test_search.py
│       ├── test_deduplication.py
│       ├── test_ranking.py
│       ├── test_verification.py
│       ├── test_agent_loop.py
│       └── test_stopping_conditions.py
│
├── data/                         # Local SQLite database (journal_finder.db)
└── reports/                      # Exported research recommendation dossiers
```

---

## 🎙️ Voice Agent Mode (ChatGPT & Gemini Live Style)

The application includes an AI Voice Agent designed for academic consultations:

- **Central Chromatic Voice Orb**: Undulates and ripples in real time according to your microphone input and the agent's synthesized voice using the browser's **Web Audio API** (`AudioContext`, `AnalyserNode`).
- **Live Transcription**: Displays your words in real time with an interim text ribbon.
- **Audio Chimes**: Subtle, procedurally synthesized frequency chimes (sine/triangle waves) when turns start and stop.
- **Three Voice Personas**:
  - **Athena**: *Principal Academic Publishing Advisor* (Balanced, supportive, holistic guidance).
  - **Marcus**: *Peer Review & Rigor Specialist* (Focuses on methodology, rejection risks, and indexing rigor).
  - **Aria**: *Open Access & Policy Strategist* (Plan S compliance, Diamond OA, and $0 fee targets).
- **In-App Action Triggering**: Click **"Execute in App"** on voice recommendations to immediately populate your manuscript parameters or launch a search.

---

## 💻 Quick Start: Windows PowerShell

Targeted specifically for **Windows 10 and Windows 11**.

### 1. Automated One-Click Launch

```powershell
# Navigate to the project root
cd research-journal-finder

# Run the automated launch script
.\run.ps1
```

### 2. Manual Step-by-Step Setup

```powershell
# Open Windows PowerShell as standard user
cd research-journal-finder

# If PowerShell script execution is restricted, enable RemoteSigned for your user:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Create a virtual environment named 'venv'
python -m venv venv

# Activate the virtual environment
.\venv\Scripts\Activate.ps1

# Upgrade pip and install pinned dependencies
python -m pip install --upgrade pip
pip install -r requirements.txt

# Create your local configuration file
Copy-Item .env.example .env

# Launch the Streamlit interactive dashboard
streamlit run app.py
```

The Streamlit dashboard will open in your browser at `http://localhost:8501`.

---

## 🌐 Quick Start: Web Dashboard (React / Vite)

To run the modern React single-page application:

```bash
# 1. Install Node.js dependencies
npm install

# 2. Start the local Vite development server
npm run dev
```

Open your browser at **`http://localhost:3000`**.

---

## ⌨️ Quick Start: CLI Harness

A command-line runner is included for headless servers, batch evaluation, and scripted pipelines:

```bash
# Run benchmark demo with pre-configured research papers
python run_cli.py --demo

# Run live search on sample machine learning paper
python run_cli.py --sample

# Search with your own manuscript parameters
python run_cli.py --title "Quantum Machine Learning for Molecular Discovery" \
                  --abstract "We evaluate variational quantum eigensolvers combined with graph neural networks for molecular property prediction." \
                  --domain "Physical Sciences & Chemistry" \
                  --access "GOLD_OA" \
                  --max-apc 2500 \
                  --iterations 3
```

Generated reports are automatically saved to the `reports/` folder.

---

## ⚙️ Configuration & Environment Variables

Copy `.env.example` to `.env` and configure your settings:

```ini
# Application Environment
ENVIRONMENT=production
DEBUG=false

# Scholarly Polite Pool Headers (Ensures faster rate limits & reliable access)
OPENALEX_EMAIL=your_email@university.edu
CROSSREF_MAILTO=your_email@university.edu

# LLM Planning Provider ('mock', 'gemini', 'openai', or 'anthropic')
LLM_PROVIDER=mock
GEMINI_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
LLM_MODEL=gemini-3.8-flash

# Embeddings Engine ('all-MiniLM-L6-v2', 'tfidf', or 'fallback')
EMBEDDINGS_PROVIDER=fallback

# Agent Workflow Budgets
MAX_ITERATIONS=5
MIN_CANDIDATES=5
MAX_API_CALLS=35
MAX_EXECUTION_TIME_SECONDS=180

# Local Storage
DATABASE_PATH=data/journal_finder.db
```

> **Note on Paid LLM APIs**: A paid API key is **never mandatory**. The system includes an offline heuristic NLP analyzer and a zero-dependency TF-IDF cosine similarity engine for complete standalone operation.

---

## 🛡️ Authoritative Registries & Anti-Hallucination Policy

The system adheres to strict research ethics:

1. **Never Invent Data**: Journal names, ISSNs, CiteScores, impact factors, APC fees, and review timelines are **never fabricated**. If a datum cannot be confirmed, it is marked as `Unknown` or `Not verified`.
2. **Official Registries Only**:
   - **ISSN Portal & Crossref**: Used to confirm journal identity, official titles, and publishers.
   - **DOAJ (Directory of Open Access Journals)**: Used to verify pure Gold Open Access, licensing (CC-BY), and official APC schedules.
3. **Proprietary Index Verification (Scopus & Web of Science)**:
   - Because Elsevier Scopus and Clarivate Web of Science require proprietary institutional paid subscriptions, the system **never falsely claims automated verification**.
   - These are assigned the explicit status **`REQUIRES_MANUAL_REVIEW`**, accompanied by direct official search links to the *Elsevier Scopus Preview* and *Clarivate Master Journal List*.
4. **Anti-Predatory Discipline**: Absence from a specific index does **not** prove a journal is predatory. Warnings indicate missing evidence only.

---

## 🧪 Automated Testing Suite

All 28 tests use mock API fixtures to execute deterministically without external network dependency.

### Run All Tests

```powershell
python -m unittest discover -s tests -p "test_*.py" -v
```

### Test Suite Breakdown

| Test File | Test Case | Purpose |
| :--- | :--- | :--- |
| `test_analyzer.py` | `test_valid_input_profile_extraction` | Verifies concept, title, and domain extraction |
| `test_analyzer.py` | `test_missing_elements_detection` | Flags missing methodology or brief abstracts |
| `test_analyzer.py` | `test_empty_pdf_raises_error` | Enforces minimum size and validation on files |
| `test_analyzer.py` | `test_invalid_pdf_header_raises_error` | Rejects corrupt or non-PDF headers |
| `test_analyzer.py` | `test_valid_pdf_bytes_extraction` | Extracts plain text from valid PDF byte streams |
| `test_deduplication.py` | `test_normalize_issn` | Formats raw input into canonical `XXXX-XXXX` |
| `test_deduplication.py` | `test_normalize_title` | Strips punctuation, casing, and subtitle noise |
| `test_deduplication.py` | `test_merge_journals_with_same_issn` | Merges matching records without data loss |
| `test_deduplication.py` | `test_distinct_journals_with_different_issns_never_merged` | Preserves distinct venues sharing similar names |
| `test_deduplication.py` | `test_merge_by_exact_normalized_title_when_no_issn` | Fallback title matching when ISSN is unavailable |
| `test_search.py` | `test_openalex_successful_search` | Validates OpenAlex Works & Venues parsing |
| `test_search.py` | `test_crossref_successful_search` | Validates Crossref publications query parsing |
| `test_search.py` | `test_http_429_rate_limiting_retry` | Confirms bounded exponential backoff on HTTP 429 |
| `test_search.py` | `test_api_timeout_handling` | Ensures timeouts fail gracefully without crashing |
| `test_search.py` | `test_malformed_json_handling` | Safely handles corrupted API responses |
| `test_search.py` | `test_repeated_query_normalization` | Prevents executing identical queries repeatedly |
| `test_ranking.py` | `test_distinct_scoring_criteria` | Verifies non-conflated Relevance, Suitability & Completeness |
| `test_ranking.py` | `test_ranking_relevance_and_constraint_penalties` | Applies penalties for APC budget or OA violations |
| `test_verification.py` | `test_doaj_verified_listing` | Validates DOAJ inclusion and seal checks |
| `test_verification.py` | `test_missing_doaj_for_gold_oa_flags_warning` | Flags warning when Gold OA journal lacks DOAJ entry |
| `test_verification.py` | `test_scopus_and_wos_require_manual_review_when_unavailable` | Assigns `REQUIRES_MANUAL_REVIEW` for proprietary indices |
| `test_stopping_conditions.py` | `test_empty_input_stops_early_with_validation_reason` | Halts execution on empty/invalid inputs |
| `test_stopping_conditions.py` | `test_max_iteration_enforcement` | Halts execution when loop budget is exhausted |
| `test_stopping_conditions.py` | `test_max_api_calls_budget_enforcement` | Halts execution when API request quota is reached |
| `test_stopping_conditions.py` | `test_no_progress_termination` | Halts execution after 2 loops without new evidence |
| `test_stopping_conditions.py` | `test_sufficient_evidence_termination` | Stops early when all candidates have complete evidence |
| `test_stopping_conditions.py` | `test_partial_results_after_api_failure` | Preserves partial candidate results if an API fails |
| `test_agent_loop.py` | `test_end_to_end_agent_workflow` | End-to-end integration test of the full autonomous loop |

---

## 📊 Export Formats

Export your recommendation findings directly from the **Journal Comparison** tab:

1. **HTML Research Dossier**: Formatted standalone document with executive summary, ranking table, and source links.
2. **Markdown Summary**: Clean GitHub-flavored markdown report ready to paste into research notes or READMEs.
3. **CSV Matrix**: Standard spreadsheet containing all normalized metrics, ISSNs, APC fees, and verification flags.
4. **JSON Payload**: Machine-readable data structure containing research profile, queries executed, and full candidate records.
5. **Full Project ZIP Archive**: One-click download of the complete Python and React codebase from the header **"Download Project"** button.

---

## 🔧 Troubleshooting

### PowerShell Script Execution Policy Error
If you see `File ... cannot be loaded because running scripts is disabled on this system`:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port 8501 Already in Use (Streamlit)
```powershell
streamlit run app.py --server.port 8502
```

### Microphone Permission in Voice Mode
- Voice Mode requires microphone access in your browser. Ensure microphone permissions are set to **Allow** in your browser settings (look for the camera/microphone icon in the address bar).
- If your browser lacks Web Speech API support, you can type your query directly into the voice dock text box.

### Slow External API Responses
Ensure your email is configured in `.env` under `OPENALEX_EMAIL` and `CROSSREF_MAILTO` to take advantage of the high-speed polite pools.

---

## 📄 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.
