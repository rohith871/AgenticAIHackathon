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
let IntakeTools = class IntakeTools {
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
        description: 'Submit patient intake with demographics and symptoms',
        inputSchema: z.object({
            name: z.string().describe('Patient full name'),
            age: z.number().describe('Patient age in years'),
            weight: z.number().describe('Patient weight in kg'),
            patientId: z.string().describe('The unique ID of the patient'),
            symptoms: z.array(z.string()).describe('List of symptoms reported by the patient'),
            urgency: z.enum(['low', 'medium', 'high', 'critical']).describe('Calculated or reported urgency level')
        }),
        examples: {
            request: {
                name: 'John Doe',
                age: 45,
                weight: 75,
                patientId: 'patient-001',
                symptoms: ['chest pain', 'shortness of breath'],
                urgency: 'high'
            },
            response: {
                success: true,
                recordId: 'intake-001',
                message: 'Patient intake submitted successfully'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IntakeTools.prototype, "submitPatientIntake", null);
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
], IntakeTools.prototype, "getPatientRecord", null);
IntakeTools = __decorate([
    Injectable({ deps: [DataService] }),
    __metadata("design:paramtypes", [DataService])
], IntakeTools);
export { IntakeTools };
//# sourceMappingURL=intake.tools.js.map