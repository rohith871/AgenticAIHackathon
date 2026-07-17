export interface TriageResult {
    urgency: 'low' | 'medium' | 'high' | 'critical';
    recommendedSpecialtyId: string;
    recommendedSpecialtyName: string;
    notes: string;
}
export declare class TriageService {
    analyzeSymptoms(symptoms: string[]): TriageResult;
}
//# sourceMappingURL=triage.service.d.ts.map