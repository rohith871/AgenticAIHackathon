var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, z } from '@nitrostack/core';
export class IntakeTools {
    async registerPatientIntake(input, ctx) {
        return {
            success: true,
            recordId: `intake-${Date.now()}`,
            message: 'Patient intake registered successfully'
        };
    }
}
__decorate([
    Tool({
        name: 'register_patient_intake',
        description: 'Register patient intake details',
        inputSchema: z.object({
            patientId: z.string().describe('The unique ID of the patient'),
            symptoms: z.array(z.string()).describe('List of symptoms reported by the patient'),
            urgency: z.enum(['low', 'medium', 'high', 'critical']).describe('Calculated or reported urgency level')
        }),
        examples: {
            request: {
                patientId: 'patient-001',
                symptoms: ['headache', 'fever'],
                urgency: 'medium'
            },
            response: {
                success: true,
                recordId: 'intake-001',
                message: 'Patient intake registered successfully'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IntakeTools.prototype, "registerPatientIntake", null);
//# sourceMappingURL=intake.tools.js.map