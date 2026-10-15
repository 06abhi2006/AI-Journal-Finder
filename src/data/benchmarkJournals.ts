import { CanonicalJournal } from '../types';

export const BENCHMARK_JOURNALS: CanonicalJournal[] = [
  {
    id: 'journal-pami',
    title: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
    publisher: 'IEEE Computer Society',
    issn: '0162-8828',
    eissn: '1939-3539',
    officialUrl: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=34',
    aimsAndScope:
      'Covers all aspects of computer vision, image processing, pattern recognition, and machine learning methods including deep learning, neural networks, and statistical reasoning.',
    subjectCategories: ['Computer Science', 'Artificial Intelligence', 'Computer Vision and Pattern Recognition'],
    openAccessStatus: 'Hybrid',
    apcAmount: 2495,
    apcCurrency: 'USD',
    peerReviewType: 'Single-blind peer review',
    publicationFrequency: 'Monthly',
    indexingClaims: ['IEEE Xplore', 'Scopus', 'Web of Science (SCIE)', 'PubMed / MEDLINE', 'DBLP'],
    representativeWorks: [
      'Deep Residual Learning for Image Recognition (He et al.)',
      'Attention Is All You Need in Visual Encoders (Dosovitskiy et al.)',
      'Foundations of Graph Representation Learning (Hamilton et al.)'
    ],
    researchRelevanceScore: 96,
    publicationSuitabilityScore: 88,
    evidenceCompletenessScore: 95,
    verificationStatus: 'VERIFIED',
    verificationChecks: [
      {
        claim: 'Official ISSN Registry Match',
        status: 'VERIFIED',
        evidenceText: 'Valid ISSN 0162-8828 and eISSN 1939-3539 confirmed in ISSN Portal & Crossref container record.',
        sourceName: 'Crossref / ISSN Portal',
        sourceUrl: 'https://portal.issn.org/resource/ISSN/0162-8828',
        confidence: 0.99,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      },
      {
        claim: 'Publisher Identity',
        status: 'VERIFIED',
        evidenceText: 'Confirmed published by IEEE Computer Society with official IEEE Xplore digital library handle.',
        sourceName: 'Crossref Publisher Feed',
        sourceUrl: 'https://api.crossref.org/journals/0162-8828',
        confidence: 0.98,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      },
      {
        claim: 'DOAJ Open Access Inclusion',
        status: 'NOT_VERIFIED',
        evidenceText: 'Journal operates under a hybrid subscription model with optional open access; not listed in DOAJ (which requires pure OA).',
        sourceName: 'Directory of Open Access Journals (DOAJ)',
        sourceUrl: 'https://doaj.org/api/v3/search/journals/0162-8828',
        confidence: 0.95,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      },
      {
        claim: 'Scopus & Web of Science Indexing',
        status: 'REQUIRES_MANUAL_REVIEW',
        evidenceText: 'Active inclusion reported in publisher documentation. Direct verification requires institutional subscription.',
        sourceName: 'Elsevier Scopus Preview / Clarivate Master Journal List',
        sourceUrl: 'https://mjl.clarivate.com/search-results?issn=0162-8828',
        confidence: 0.85,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      }
    ],
    verificationWarnings: [],
    recommendationRationale:
      'Exceptional thematic alignment with core pattern recognition, statistical machine learning models, and deep architecture evaluation.',
    potentialMismatches: ['Review timeline can extend between 4 to 8 months for initial decision.', 'High competitive rejection threshold.'],
    sourceUrls: ['https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=34', 'https://api.crossref.org/journals/0162-8828'],
    retrievalDate: '2026-10-10',
    confidenceScore: 0.96
  },
  {
    id: 'journal-jmlr',
    title: 'Journal of Machine Learning Research (JMLR)',
    publisher: 'Microtome Publishing & JMLR Foundation',
    issn: '1532-4435',
    eissn: '1533-7928',
    officialUrl: 'https://www.jmlr.org/',
    aimsAndScope:
      'Provides an international forum for the electronic and paper dissemination of high-quality scholarly research in all areas of machine learning, theoretical analysis, and experimental empirical studies.',
    subjectCategories: ['Computer Science', 'Machine Learning', 'Artificial Intelligence', 'Statistics'],
    openAccessStatus: 'Diamond OA (No Fee)',
    apcAmount: 0,
    apcCurrency: 'USD',
    peerReviewType: 'Double-blind peer review',
    publicationFrequency: 'Continuous (Annual Volume)',
    indexingClaims: ['DOAJ', 'Scopus', 'Web of Science (SCIE)', 'DBLP', 'Google Scholar'],
    representativeWorks: [
      'Scikit-learn: Machine Learning in Python (Pedregosa et al.)',
      'XGBoost: A Scalable Tree Boosting System (Chen & Guestrin)',
      'Dropout: A Simple Way to Prevent Neural Networks from Overfitting (Srivastava et al.)'
    ],
    researchRelevanceScore: 94,
    publicationSuitabilityScore: 98,
    evidenceCompletenessScore: 97,
    verificationStatus: 'VERIFIED',
    verificationChecks: [
      {
        claim: 'DOAJ Registration & Pure Diamond OA',
        status: 'VERIFIED',
        evidenceText: 'Confirmed listed in DOAJ with zero Article Processing Charges (Diamond Open Access model).',
        sourceName: 'DOAJ Registry',
        sourceUrl: 'https://doaj.org/toc/1532-4435',
        confidence: 0.99,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      },
      {
        claim: 'Zero Publication Fee Verification',
        status: 'VERIFIED',
        evidenceText: 'Community-funded and university-sponsored with no author-facing or reader-facing fees.',
        sourceName: 'JMLR Editorial Constitution',
        sourceUrl: 'https://www.jmlr.org/editorial-board.html',
        confidence: 0.99,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      }
    ],
    verificationWarnings: [],
    recommendationRationale:
      'Premier venue for machine learning theory and foundational algorithms. 100% Diamond Open Access with zero publishing fees.',
    potentialMismatches: ['Manuscripts must present rigorous theoretical or exhaustive benchmark experimental proof.'],
    sourceUrls: ['https://www.jmlr.org/', 'https://doaj.org/toc/1532-4435'],
    retrievalDate: '2026-10-10',
    confidenceScore: 0.98
  },
  {
    id: 'journal-nature-mi',
    title: 'Nature Machine Intelligence',
    publisher: 'Springer Nature',
    issn: '2522-5839',
    eissn: '2522-5839',
    officialUrl: 'https://www.nature.com/natmachintell/',
    aimsAndScope:
      'Publishes high-quality original research and reviews in machine learning, artificial intelligence, robotics, and the societal impact of intelligent automation across disciplines.',
    subjectCategories: ['Multidisciplinary Sciences', 'Artificial Intelligence', 'Computational Biology', 'Robotics'],
    openAccessStatus: 'Hybrid',
    apcAmount: 11690,
    apcCurrency: 'USD',
    peerReviewType: 'Single-blind peer review',
    publicationFrequency: 'Monthly',
    indexingClaims: ['Web of Science (SCIE)', 'Scopus', 'PubMed', 'Google Scholar'],
    representativeWorks: [
      'Highly accurate protein structure prediction with AlphaFold (Jumper et al.)',
      'Artificial intelligence in healthcare and diagnostics (Topol et al.)',
      'Physics-informed neural networks for fluid dynamics (Raissi et al.)'
    ],
    researchRelevanceScore: 92,
    publicationSuitabilityScore: 74,
    evidenceCompletenessScore: 94,
    verificationStatus: 'VERIFIED',
    verificationChecks: [
      {
        claim: 'Official ISSN Registry Match',
        status: 'VERIFIED',
        evidenceText: 'Valid eISSN 2522-5839 confirmed in Springer Nature Crossref metadata.',
        sourceName: 'Crossref',
        sourceUrl: 'https://api.crossref.org/journals/2522-5839',
        confidence: 0.99,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      },
      {
        claim: 'APC Transparency Check',
        status: 'VERIFIED',
        evidenceText: 'Standard Nature portfolio Gold OA option requires $11,690 APC; traditional subscription path costs $0.',
        sourceName: 'Springer Nature Open Access APC Schedule',
        sourceUrl: 'https://www.nature.com/nature-portfolio/open-access',
        confidence: 0.95,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      }
    ],
    verificationWarnings: ['Extremely high Gold OA Article Processing Charge ($11,690 USD) if Open Access is mandatory.'],
    recommendationRationale:
      'High-impact multidisciplinary prestige suitable for cross-domain discoveries blending machine learning with life sciences, physics, or healthcare.',
    potentialMismatches: ['Manuscript must possess broad scientific appeal beyond specialized niche engineering.'],
    sourceUrls: ['https://www.nature.com/natmachintell/'],
    retrievalDate: '2026-10-10',
    confidenceScore: 0.93
  },
  {
    id: 'journal-ieee-access',
    title: 'IEEE Access',
    publisher: 'IEEE',
    issn: '2169-3536',
    eissn: '2169-3536',
    officialUrl: 'https://ieeeaccess.ieee.org/',
    aimsAndScope:
      'A multidisciplinary, rapid-turnaround open access journal covering electrical, electronics, computer engineering, systems, and multidisciplinary technology applications.',
    subjectCategories: ['Engineering', 'Computer Science', 'Applied Physics', 'Information Systems'],
    openAccessStatus: 'Gold OA',
    apcAmount: 1950,
    apcCurrency: 'USD',
    peerReviewType: 'Binary peer review (Accept/Reject without major revisions)',
    publicationFrequency: 'Continuous publishing',
    indexingClaims: ['DOAJ', 'IEEE Xplore', 'Scopus', 'Web of Science (SCIE)', 'Inspec'],
    representativeWorks: [
      'A Survey on Internet of Things (IoT) Security and Privacy (Lin et al.)',
      'Blockchain-based Decentralized Authentication Frameworks (Zhang et al.)',
      'Deep Learning for Cyber-Physical Edge Systems (Wang et al.)'
    ],
    researchRelevanceScore: 85,
    publicationSuitabilityScore: 92,
    evidenceCompletenessScore: 96,
    verificationStatus: 'VERIFIED',
    verificationChecks: [
      {
        claim: 'DOAJ Open Access Status',
        status: 'VERIFIED',
        evidenceText: 'Confirmed listed in DOAJ with full CC-BY license options.',
        sourceName: 'DOAJ Registry',
        sourceUrl: 'https://doaj.org/toc/2169-3536',
        confidence: 0.99,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      },
      {
        claim: 'Turnaround Time Provenance',
        status: 'VERIFIED',
        evidenceText: 'Average review cycle documented at 4 to 6 weeks from initial submission to final decision.',
        sourceName: 'IEEE Access Metrics Portal',
        sourceUrl: 'https://ieeeaccess.ieee.org/about-ieee-access/metrics/',
        confidence: 0.92,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      }
    ],
    verificationWarnings: [],
    recommendationRationale:
      'Optimal when rapid dissemination and broad engineering indexing are required with verified Gold Open Access compliance.',
    potentialMismatches: ['Broad scope means less specialized community focus than dedicated niche transactions.'],
    sourceUrls: ['https://ieeeaccess.ieee.org/'],
    retrievalDate: '2026-10-10',
    confidenceScore: 0.94
  },
  {
    id: 'journal-bioinformatics',
    title: 'Bioinformatics',
    publisher: 'Oxford University Press',
    issn: '1367-4803',
    eissn: '1460-2059',
    officialUrl: 'https://academic.oup.com/bioinformatics',
    aimsAndScope:
      'Publishes original research in computational biology, genomics, proteomics, algorithm development, bioinformatics software, and statistical methods in molecular life sciences.',
    subjectCategories: ['Computational Biology', 'Bioinformatics', 'Genetics', 'Computer Science'],
    openAccessStatus: 'Gold OA',
    apcAmount: 3350,
    apcCurrency: 'USD',
    peerReviewType: 'Single-blind peer review',
    publicationFrequency: 'Semi-monthly (24 issues/year)',
    indexingClaims: ['DOAJ', 'PubMed', 'Scopus', 'Web of Science (SCIE)', 'MEDLINE', 'EMBASE'],
    representativeWorks: [
      'FASTX-Toolkit for preprocessing NGS data',
      'DESeq2: Moderated estimation of fold change and dispersion for RNA-seq (Love et al.)',
      'BLAST+: Architecture and applications (Camacho et al.)'
    ],
    researchRelevanceScore: 91,
    publicationSuitabilityScore: 86,
    evidenceCompletenessScore: 94,
    verificationStatus: 'VERIFIED',
    verificationChecks: [
      {
        claim: 'Official Registry Match',
        status: 'VERIFIED',
        evidenceText: 'ISSN 1367-4803 / eISSN 1460-2059 confirmed in Crossref and DOAJ.',
        sourceName: 'Crossref / DOAJ',
        sourceUrl: 'https://academic.oup.com/bioinformatics',
        confidence: 0.99,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      }
    ],
    verificationWarnings: [],
    recommendationRationale:
      'Top-tier venue for algorithmic bioinformatics, computational biology pipelines, and translational life-science models.',
    potentialMismatches: ['Software submissions require publicly accessible, reproducible open-source code repositories.'],
    sourceUrls: ['https://academic.oup.com/bioinformatics'],
    retrievalDate: '2026-10-10',
    confidenceScore: 0.95
  },
  {
    id: 'journal-plos-comp-bio',
    title: 'PLOS Computational Biology',
    publisher: 'Public Library of Science (PLOS)',
    issn: '1553-7358',
    eissn: '1553-7358',
    officialUrl: 'https://journals.plos.org/ploscompbiol/',
    aimsAndScope:
      'Focuses on computational methodologies applied to living systems across all scales, from molecular biophysics to neurobiology and ecosystem dynamics.',
    subjectCategories: ['Computational Biology', 'Systems Biology', 'Biophysics', 'Quantitative Biology'],
    openAccessStatus: 'Gold OA',
    apcAmount: 2950,
    apcCurrency: 'USD',
    peerReviewType: 'Open or single-blind peer review',
    publicationFrequency: 'Monthly',
    indexingClaims: ['DOAJ', 'PubMed Central', 'Scopus', 'Web of Science (SCIE)'],
    representativeWorks: [
      'Ten Simple Rules for Reproducible Computational Research (Sandve et al.)',
      'Structural and dynamic characterization of macromolecular complexes',
      'Stochastic kinetic modeling of gene regulatory circuits'
    ],
    researchRelevanceScore: 89,
    publicationSuitabilityScore: 90,
    evidenceCompletenessScore: 96,
    verificationStatus: 'VERIFIED',
    verificationChecks: [
      {
        claim: 'DOAJ Registration',
        status: 'VERIFIED',
        evidenceText: 'Pioneer Open Access publisher with verified CC-BY licensing in DOAJ.',
        sourceName: 'DOAJ Registry',
        sourceUrl: 'https://doaj.org/toc/1553-7358',
        confidence: 0.99,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      }
    ],
    verificationWarnings: [],
    recommendationRationale:
      'Leading open-access society journal associated with ISCB, requiring computational code sharing and biological relevance.',
    potentialMismatches: ['Pure machine learning without direct biological insight or hypothesis is routinely rejected.'],
    sourceUrls: ['https://journals.plos.org/ploscompbiol/'],
    retrievalDate: '2026-10-10',
    confidenceScore: 0.95
  },
  {
    id: 'journal-ai-medicine',
    title: 'Artificial Intelligence in Medicine',
    publisher: 'Elsevier',
    issn: '0933-3657',
    eissn: '1873-2860',
    officialUrl: 'https://www.sciencedirect.com/journal/artificial-intelligence-in-medicine',
    aimsAndScope:
      'Publishes original contributions on the theory and practice of AI in medicine and healthcare, clinical decision support systems, and medical knowledge engineering.',
    subjectCategories: ['Health Informatics', 'Artificial Intelligence', 'Biomedical Engineering'],
    openAccessStatus: 'Hybrid',
    apcAmount: 3290,
    apcCurrency: 'USD',
    peerReviewType: 'Double-blind peer review',
    publicationFrequency: 'Monthly',
    indexingClaims: ['MEDLINE', 'PubMed', 'Scopus', 'Web of Science (SCIE)', 'EMBASE'],
    representativeWorks: [
      'Explainable artificial intelligence for clinical decision support (Holzinger et al.)',
      'Deep learning in electronic health record analytics',
      'Predictive modeling of patient mortality in intensive care units'
    ],
    researchRelevanceScore: 88,
    publicationSuitabilityScore: 84,
    evidenceCompletenessScore: 92,
    verificationStatus: 'VERIFIED',
    verificationChecks: [
      {
        claim: 'Official ISSN Registry Match',
        status: 'VERIFIED',
        evidenceText: 'Confirmed in Elsevier ScienceDirect and Crossref.',
        sourceName: 'Crossref',
        sourceUrl: 'https://api.crossref.org/journals/0933-3657',
        confidence: 0.98,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      }
    ],
    verificationWarnings: [],
    recommendationRationale:
      'Ideal for research bridging computer vision or deep predictive models directly with validated clinical healthcare datasets.',
    potentialMismatches: ['Requires rigorous discussion of clinical interpretability and ethical implications.'],
    sourceUrls: ['https://www.sciencedirect.com/journal/artificial-intelligence-in-medicine'],
    retrievalDate: '2026-10-10',
    confidenceScore: 0.92
  },
  {
    id: 'journal-rser',
    title: 'Renewable and Sustainable Energy Reviews',
    publisher: 'Elsevier',
    issn: '1364-0321',
    eissn: '1879-0690',
    officialUrl: 'https://www.sciencedirect.com/journal/renewable-and-sustainable-energy-reviews',
    aimsAndScope:
      'Shares multidisciplinary research and critical reviews on renewable energy systems, clean technology, decarbonization, energy storage, and environmental sustainability policy.',
    subjectCategories: ['Renewable Energy', 'Environmental Engineering', 'Sustainability', 'Energy Technology'],
    openAccessStatus: 'Hybrid',
    apcAmount: 4350,
    apcCurrency: 'USD',
    peerReviewType: 'Single-blind peer review',
    publicationFrequency: 'Monthly',
    indexingClaims: ['Scopus', 'Web of Science (SCIE)', 'Compendex', 'Inspec', 'EI'],
    representativeWorks: [
      'Comprehensive review of battery management systems for electric vehicles',
      'Techno-economic assessment of green hydrogen production pathways',
      'Artificial neural networks in solar irradiance and wind power forecasting'
    ],
    researchRelevanceScore: 87,
    publicationSuitabilityScore: 82,
    evidenceCompletenessScore: 93,
    verificationStatus: 'VERIFIED',
    verificationChecks: [
      {
        claim: 'Publisher & ISSN Validation',
        status: 'VERIFIED',
        evidenceText: 'Confirmed in Elsevier repository and Crossref.',
        sourceName: 'Crossref',
        sourceUrl: 'https://api.crossref.org/journals/1364-0321',
        confidence: 0.99,
        retrievalTimestamp: '2026-10-10T12:00:00Z'
      }
    ],
    verificationWarnings: [],
    recommendationRationale:
      'Premier venue for high-impact review or foundational energy and sustainability research.',
    potentialMismatches: ['Strong preference for papers with comprehensive global energy context rather than narrow local setups.'],
    sourceUrls: ['https://www.sciencedirect.com/journal/renewable-and-sustainable-energy-reviews'],
    retrievalDate: '2026-10-10',
    confidenceScore: 0.94
  }
];
