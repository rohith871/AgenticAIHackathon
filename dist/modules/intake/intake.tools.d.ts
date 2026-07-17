import { ExecutionContext } from '@nitrostack/core';
import { DataService } from '../../shared/services/data.service.js';
export declare class SubmitPatientIntakeTool {
    private dataService;
    constructor(dataService: DataService);
    submitPatientIntake(input: {
        name: string;
        age: number;
        weight: number;
        symptoms: string[];
        medicalHistory?: {
            conditions?: string[];
            medications?: string[];
            allergies?: string[];
        };
    }, ctx: ExecutionContext): Promise<{
        patientId: string;
        message: string;
    }>;
}
export declare class GetPatientRecordTool {
    private dataService;
    constructor(dataService: DataService);
    getPatientRecord(input: {
        patientId: string;
    }, ctx: ExecutionContext): Promise<import("../../shared/services/data.service.js").PatientRecord>;
}
//# sourceMappingURL=intake.tools.d.ts.map