/**
 * Triage Rules Engine
 *
 * Defines red flags, their severity weights, and urgency thresholds.
 * This is the single source of truth for triage decision logic.
 * Adjust severity values (0-1 scale) to tune urgency scoring.
 */
export interface RedFlag {
    id: string;
    keywords: string[];
    severity: number;
    category: 'cardiac' | 'respiratory' | 'neurological' | 'hemorrhage' | 'trauma' | 'metabolic' | 'infectious' | 'other';
    description: string;
}
export declare const RED_FLAGS: RedFlag[];
/**
 * Urgency thresholds based on cumulative red flag severity score
 * Score is calculated as: max(red_flag_severities) + sum(other_flag_severities) * 0.1
 */
export declare const SEVERITY_THRESHOLDS: {
    emergency: number;
    high: number;
    medium: number;
    low: number;
};
/**
 * Helper function to find matching red flags in symptom text
 */
export declare function detectRedFlags(symptomText: string): RedFlag[];
/**
 * Calculate urgency score from detected red flags
 * Returns a score 0-1 that can be compared against SEVERITY_THRESHOLDS
 */
export declare function calculateSeverityScore(detectedFlags: RedFlag[]): number;
/**
 * Determine urgency level from severity score
 */
export declare function getUrgencyLevel(score: number): 'low' | 'medium' | 'high' | 'emergency';
//# sourceMappingURL=triage-rules.d.ts.map