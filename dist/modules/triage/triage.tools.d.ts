import { ExecutionContext } from '@nitrostack/core';
import { TriageService } from './triage.service.js';
export declare class TriageTools {
    private triageService;
    constructor(triageService: TriageService);
    analyzeSymptoms(input: {
        symptoms: string[];
    }, context: ExecutionContext): Promise<import("./triage.service.js").TriageResult>;
}
//# sourceMappingURL=triage.tools.d.ts.map