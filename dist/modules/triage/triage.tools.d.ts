import { ExecutionContext } from '@nitrostack/core';
import { TriageService } from './triage.service.js';
import { AnalyzeSymptomsInput, SymptomAnalysisResult, ScoreUrgencyInput, UrgencyResult } from './triage.types.js';
export declare class TriageTools {
    private triageService;
    constructor(triageService: TriageService);
    /**
     * Analyze patient symptoms to detect red flags and suggest candidate conditions
     */
    analyzeSymptoms(input: AnalyzeSymptomsInput, context: ExecutionContext): Promise<SymptomAnalysisResult>;
    /**
     * Score urgency level based on symptom analysis results
     */
    scoreUrgency(input: ScoreUrgencyInput, context: ExecutionContext): Promise<UrgencyResult>;
}
//# sourceMappingURL=triage.tools.d.ts.map