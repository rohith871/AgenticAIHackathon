var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, z, Injectable } from '@nitrostack/core';
import { DataService } from '../../shared/services/data.service.js';
let SubmitPatientIntakeTool = class SubmitPatientIntakeTool {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    async submitPatientIntake(input, ctx) {
        const recordId = `intake-${Date.now()}`;
        // Store intake record with all demographics
        this.dataService.storeIntakeRecord({
            recordId,
            name: input.name,
            age: input.age,
            weight: input.weight,
            patientId: input.patientId,
            symptoms: input.symptoms,
            urgency: input.urgency,
            timestamp: new Date().toISOString()
        });
        return {
            success: true,
            recordId,
            message: 'Patient intake submitted successfully'
        };
    }
    async getPatientRecord(input, ctx) {
        const record = this.dataService.getIntakeRecord(input.recordId);
        if (!record) {
            return {
                success: false,
                error: `No intake record found with recordId: ${input.recordId}`
            };
        }
        return {
            success: true,
            ...record
        };
    }
};
__decorate([
    Tool({
        name: 'submit-patient-intake',
        description: 'Submit a patient intake form with personal and medical information. Returns a unique patient ID.',
        inputSchema: z.object({
            name: z.string().describe('Patient full name'),
            age: z.number().int().min(0).max(150).describe('Patient age in years'),
            weight: z.number().positive().describe('Patient weight in kg'),
            symptoms: z.array(z.string()).describe('List of current symptoms'),
            medicalHistory: z.object({
                conditions: z.array(z.string()).optional().describe('Pre-existing medical conditions'),
                medications: z.array(z.string()).optional().describe('Current medications'),
                allergies: z.array(z.string()).optional().describe('Known allergies')
            }).optional().describe('Optional medical history')
        }),
        examples: {
            request: {
                name: 'John Doe',
                age: 35,
                weight: 75,
                symptoms: ['fever', 'cough'],
                medicalHistory: {
                    conditions: ['hypertension'],
                    medications: ['lisinopril'],
                    allergies: ['penicillin']
                }
            },
            response: {
                patientId: '550e8400-e29b-41d4-a716-446655440000',
                message: 'Patient intake submitted successfully'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubmitPatientIntakeTool.prototype, "submitPatientIntake", null);
__decorate([
    Tool({
        name: 'get-patient-record',
        description: 'Retrieve a stored patient intake record by recordId',
        inputSchema: z.object({
            recordId: z.string().describe('The unique ID of the intake record to retrieve')
        }),
        examples: {
            request: {
                recordId: 'intake-001'
            },
            response: {
                recordId: 'intake-001',
                name: 'John Doe',
                age: 45,
                weight: 75,
                patientId: 'patient-001',
                symptoms: ['chest pain', 'shortness of breath'],
                urgency: 'high',
                timestamp: '2024-01-15T10:30:00Z'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubmitPatientIntakeTool.prototype, "getPatientRecord", null);
SubmitPatientIntakeTool = __decorate([
    Injectable({ deps: [DataService] }),
    __metadata("design:paramtypes", [DataService])
], SubmitPatientIntakeTool);
export { SubmitPatientIntakeTool };
let GetPatientRecordTool = class GetPatientRecordTool {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    async getPatientRecord(input, ctx) {
        try {
            const record = this.dataService.getPatientRecord(input.patientId);
            return record;
        }
        catch (error) {
            throw new Error(`Failed to retrieve patient record: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};
__decorate([
    Tool({
        name: 'get-patient-record',
        description: 'Retrieve a stored patient record by patient ID.',
        inputSchema: z.object({
            patientId: z.string().uuid().describe('The unique patient ID')
        }),
        examples: {
            request: { patientId: '550e8400-e29b-41d4-a716-446655440000' },
            response: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                name: 'John Doe',
                age: 35,
                weight: 75,
                symptoms: ['fever', 'cough'],
                medicalHistory: {
                    conditions: ['hypertension'],
                    medications: ['lisinopril'],
                    allergies: ['penicillin']
                },
                createdAt: '2026-07-17T12:00:00.000Z'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GetPatientRecordTool.prototype, "getPatientRecord", null);
GetPatientRecordTool = __decorate([
    Injectable({ deps: [DataService] }),
    __metadata("design:paramtypes", [DataService])
], GetPatientRecordTool);
export { GetPatientRecordTool };
//# sourceMappingURL=intake.tools.js.map