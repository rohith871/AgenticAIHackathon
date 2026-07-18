import { ExecutionContext } from '@nitrostack/core';
import { MatchingService, RecommendedSpecialty, HospitalOption } from './matching.service.js';
export declare class MatchingTools {
    private matchingService;
    constructor(matchingService: MatchingService);
    recommendSpecialty(input: {
        candidateConditions: string[];
    }, ctx: ExecutionContext): Promise<{
        specialty: RecommendedSpecialty;
        alternates?: RecommendedSpecialty[];
    }>;
    findHospitalOptions(input: {
        specialtyId: string;
        preferredHospitalId?: string;
    }, ctx: ExecutionContext): Promise<{
        options: HospitalOption[];
    }>;
}
//# sourceMappingURL=matching.tools.d.ts.map