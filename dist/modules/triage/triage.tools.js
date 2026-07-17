var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, z, Injectable, Widget } from '@nitrostack/core';
import { TriageService } from './triage.service.js';
let TriageTools = class TriageTools {
    triageService;
    constructor(triageService) {
        this.triageService = triageService;
    }
    async analyzeSymptoms(input, context) {
        const result = this.triageService.analyzeSymptoms(input.symptoms);
        return result;
    }
};
__decorate([
    Tool({
        name: 'analyze-symptoms',
        description: 'Analyze patient symptoms to determine urgency level and recommended medical specialty',
        inputSchema: z.object({
            symptoms: z.array(z.string()).describe('List of symptoms reported by the patient')
        }),
        examples: {
            request: {
                symptoms: ['chest pain', 'shortness of breath']
            },
            response: {
                urgency: 'critical',
                recommendedSpecialtyId: 'cardiology',
                recommendedSpecialtyName: 'Cardiology',
                notes: 'Warning: Chest pain or palpitations can be signs of emergency...'
            }
        }
    }),
    Widget({ route: 'triage-result' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TriageTools.prototype, "analyzeSymptoms", null);
TriageTools = __decorate([
    Injectable({ deps: [TriageService] }),
    __metadata("design:paramtypes", [TriageService])
], TriageTools);
export { TriageTools };
//# sourceMappingURL=triage.tools.js.map