import { ExecutionContext } from '@nitrostack/core';
import { DataService } from '../../shared/services/data.service.js';
export declare class IntakeTools {
    private dataService;
    constructor(dataService: DataService);
    submitPatientIntake(input: any, ctx: ExecutionContext): Promise<{
        success: boolean;
        recordId: string;
        message: string;
    }>;
    getPatientRecord(input: any, ctx: ExecutionContext): Promise<{
        success: boolean;
        error: string;
    } | {
        recordId: string;
        name: string;
        age: number;
        weight: number;
        patientId: string;
        symptoms: string[];
        urgency: string;
        timestamp: string;
        success: boolean;
        error?: undefined;
    }>;
}
//# sourceMappingURL=intake.tools.d.ts.map