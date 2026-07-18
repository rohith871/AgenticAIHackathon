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
import { MatchingService } from './matching.service.js';
let MatchingTools = class MatchingTools {
    matchingService;
    constructor(matchingService) {
        this.matchingService = matchingService;
    }
    async recommendSpecialty(input, ctx) {
        try {
            const result = this.matchingService.recommendSpecialty(input.candidateConditions);
            return result;
        }
        catch (error) {
            throw new Error(`Failed to recommend specialty: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async findHospitalOptions(input, ctx) {
        try {
            const options = this.matchingService.findHospitalOptions(input.specialtyId, input.preferredHospitalId);
            return { options };
        }
        catch (error) {
            throw new Error(`Failed to find hospital options: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};
__decorate([
    Tool({
        name: 'recommend-specialty',
        description: 'Recommend a medical specialty based on candidate conditions from symptom analysis. Returns the top specialty match with confidence score and alternate options if ambiguous.',
        inputSchema: z.object({
            candidateConditions: z
                .array(z.string())
                .describe('Array of medical conditions/symptoms to match against specialties'),
        }),
        examples: {
            request: {
                candidateConditions: ['Acute Coronary Syndrome', 'Chest Pain'],
            },
            response: {
                specialty: {
                    specialtyId: 'cardiology',
                    specialtyName: 'Cardiology',
                    confidenceScore: 1.0,
                },
                alternates: undefined,
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MatchingTools.prototype, "recommendSpecialty", null);
__decorate([
    Tool({
        name: 'find-hospital-options',
        description: 'Find available doctor/hospital options for a given specialty. Returns a ranked list with preferred hospital first if specified.',
        inputSchema: z.object({
            specialtyId: z.string().describe('The specialty ID to search for'),
            preferredHospitalId: z
                .string()
                .optional()
                .describe('Optional hospital ID to prioritize. If no matching doctor exists, other options are returned with fallbackUsed flag.'),
        }),
        examples: {
            request: {
                specialtyId: 'cardiology',
                preferredHospitalId: 'hospital-001',
            },
            response: {
                options: [
                    {
                        doctorId: 'doctor-001',
                        doctorName: 'Dr. Sarah Mitchell',
                        hospitalId: 'hospital-001',
                        hospitalName: 'Metropolitan Medical Center',
                        isPrimary: true,
                    },
                    {
                        doctorId: 'doctor-006',
                        doctorName: 'Dr. Robert Kim',
                        hospitalId: 'hospital-002',
                        hospitalName: "Children's Hospital Colorado",
                        isPrimary: false,
                    },
                ],
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MatchingTools.prototype, "findHospitalOptions", null);
MatchingTools = __decorate([
    Injectable({ deps: [MatchingService] }),
    __metadata("design:paramtypes", [MatchingService])
], MatchingTools);
export { MatchingTools };
//# sourceMappingURL=matching.tools.js.map