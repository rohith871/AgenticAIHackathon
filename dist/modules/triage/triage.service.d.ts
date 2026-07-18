import { DataService } from '../../shared/services/data.service.js';
import { AnalyzeSymptomsInput, SymptomAnalysisResult, UrgencyResult } from './triage.types.js';
export declare class TriageService {
    private dataService;
    constructor(dataService: DataService);
    /**
     * Analyze patient symptoms to detect red flags and suggest candidate conditions
     */
    analyzeSymptoms(input: AnalyzeSymptomsInput): SymptomAnalysisResult;
    /**
     * Score urgency level based on symptom analysis
     */
    scoreUrgency(input: any): UrgencyResult;
    /**
     * Generate candidate conditions based on symptom keywords
     */
    private generateCandidateConditions;
    /**
     * Generate human-readable rationale for urgency level
     */
    private generateRationale;
    /**
     * Generate recommended actions based on urgency level
     */
    private generateRecommendedActions;
}
//# sourceMappingURL=triage.service.d.ts.map