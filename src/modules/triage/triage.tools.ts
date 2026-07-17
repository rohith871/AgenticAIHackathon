import { ToolDecorator as Tool, ExecutionContext, z, Injectable, Widget } from '@nitrostack/core';
import { TriageService } from './triage.service.js';

@Injectable({ deps: [TriageService] })
export class TriageTools {
  constructor(private triageService: TriageService) {}

  @Tool({
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
  })
  @Widget({ route: 'triage-result' })
  async analyzeSymptoms(input: { symptoms: string[] }, context: ExecutionContext) {
    const result = this.triageService.analyzeSymptoms(input.symptoms);
    return result;
  }
}
