import { ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';

export class IntakeTools {
  @Tool({
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
  })
  async registerPatientIntake(input: any, ctx: ExecutionContext) {
    return {
      success: true,
      recordId: `intake-${Date.now()}`,
      message: 'Patient intake registered successfully'
    };
  }
}
