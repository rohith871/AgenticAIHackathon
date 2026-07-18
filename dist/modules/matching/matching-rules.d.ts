/**
 * Condition-to-Specialty Mapping Rules
 * Maps medical conditions/keywords to specialty IDs for recommendation logic.
 * Easy to inspect and extend — add new mappings as needed.
 */
export declare const CONDITION_TO_SPECIALTY_MAP: Record<string, string>;
/**
 * Confidence scoring helper
 * Returns a score 0–1 based on match quality
 */
export declare function scoreConditionMatch(conditions: string[], specialtyId: string): number;
//# sourceMappingURL=matching-rules.d.ts.map