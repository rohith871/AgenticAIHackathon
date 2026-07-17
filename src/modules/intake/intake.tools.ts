import { ToolDecorator as Tool, ExecutionContext, z, Injectable } from '@nitrostack/core';
import { DataService } from '../../shared/services/data.service.js';

@Injectable({ deps: [DataService] })
export class IntakeTools {
  constructor(private dataService: DataService) {}

  @Tool({
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
  })
  async submitPatientIntake(input: any, ctx: ExecutionContext) {
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

  @Tool({
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
  })
  async getPatientRecord(input: any, ctx: ExecutionContext) {
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
}
