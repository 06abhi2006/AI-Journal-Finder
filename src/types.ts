export type VerificationStatus =
  | 'VERIFIED'
  | 'NOT_VERIFIED'
  | 'CONFLICTING_EVIDENCE'
  | 'UNAVAILABLE'
  | 'REQUIRES_MANUAL_REVIEW';

export type OpenAccessPreference = 'ANY' | 'GOLD_OA' | 'DIAMOND_NO_FEE' | 'HYBRID_OR_CLOSED';

export interface ResearchInput {
  title: string;
  abstract: string;
  keywords: string;
  domain: string;
  methodology: string;
  fullText?: string;
  fileName?: string;
  fileSize?: string;
  preferredAccess: OpenAccessPreference;
  maxApcBudget: number;
  requestedIndexing: string[];
  maxIterations: number;
}

export interface ResearchProfile {
  title: string;
  abstract: string;
  keywords: string[];
  domain: string;
  methodology: string;
  coreConcepts: string[];
  missingElements: string[];
  extractedTimestamp: string;
}

export interface SearchQuery {
  id: string;
  query: string;
  queryType: 'title_concept' | 'domain_keywords' | 'methodology' | 'follow_up_gap' | 'issn_lookup';
  targetSource: 'openalex' | 'crossref' | 'doaj' | 'all';
  rationale: string;
  executed: boolean;
  resultsCount: number;
  executionTimeMs?: number;
}

export interface EvidenceCheck {
  claim: string;
  status: VerificationStatus;
  evidenceText: string;
  sourceName: string;
  sourceUrl: string;
  confidence: number; // 0.0 - 1.0
  retrievalTimestamp: string;
}

export type VerificationCheck = EvidenceCheck;

export interface CanonicalJournal {
  id: string;
  title: string;
  publisher: string;
  issn: string;
  eissn?: string;
  officialUrl?: string;
  aimsAndScope?: string;
  subjectCategories: string[];
  openAccessStatus: 'Gold OA' | 'Diamond OA (No Fee)' | 'Hybrid' | 'Subscription / Closed' | 'Unknown';
  apcAmount?: number;
  apcCurrency?: string;
  peerReviewType?: string;
  publicationFrequency?: string;
  indexingClaims: string[];
  representativeWorks: string[];
  // Decomposed scores (0 - 100)
  researchRelevanceScore: number;
  publicationSuitabilityScore: number;
  evidenceCompletenessScore: number;
  verificationStatus: VerificationStatus;
  verificationChecks: EvidenceCheck[];
  verificationWarnings: string[];
  recommendationRationale: string;
  potentialMismatches: string[];
  sourceUrls: string[];
  retrievalDate: string;
  confidenceScore: number;
}

export type AgentStepName =
  | 'IDLE'
  | 'VALIDATE_INPUT'
  | 'ANALYZE_RESEARCH'
  | 'CREATE_SEARCH_PLAN'
  | 'SEARCH_SCHOLARLY_SOURCES'
  | 'NORMALIZE_AND_DEDUPLICATE'
  | 'EVALUATE_CANDIDATES'
  | 'CHECK_EVIDENCE_GAPS'
  | 'CREATE_FOLLOW_UP_QUERIES'
  | 'SEARCH_MISSING_EVIDENCE'
  | 'VERIFY_JOURNALS'
  | 'RANK_AND_EXPLAIN'
  | 'GENERATE_EVIDENCE_BACKED_REPORT'
  | 'SAVE_RESULTS_AND_END';

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  step: AgentStepName;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  iteration: number;
  details?: Record<string, unknown>;
}

export interface AgentExecutionState {
  sessionId: string;
  isRunning: boolean;
  isComplete: boolean;
  currentStep: AgentStepName;
  currentIteration: number;
  maxIterations: number;
  apiCallCount: number;
  maxApiCalls: number;
  totalTokensUsed: number;
  stopReason: string;
  startTime: number;
  elapsedTimeSec: number;
  evidenceGaps: string[];
  logs: ActivityLogEntry[];
  completedQueries: SearchQuery[];
  candidatesFound: number;
  duplicatesRemoved: number;
  verifiedCount: number;
}

export interface SearchSessionRecord {
  id: string;
  timestamp: string;
  title: string;
  domain: string;
  candidateCount: number;
  topJournal: string;
  status: 'Completed' | 'Terminated' | 'Partial Results';
  stopReason: string;
  researchInput: ResearchInput;
  results: CanonicalJournal[];
}
