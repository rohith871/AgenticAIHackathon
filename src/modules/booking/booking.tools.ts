import { ToolDecorator as Tool, ExecutionContext, z, Injectable, Widget } from '@nitrostack/core';
import { AppointmentService } from '../../shared/services/appointment.service.js';
import { DataService } from '../../shared/services/data.service.js';

@Injectable({ deps: [AppointmentService, DataService] })
export class BookingTools {
  constructor(
    private appointmentService: AppointmentService,
    private dataService: DataService
  ) {}

  @Tool({
    name: 'book-appointment',
    description: 'Book a new medical appointment with a specialist doctor',
    inputSchema: z.object({
      patientId: z.string().describe('The unique ID of the patient (e.g. patient-001)'),
      doctorId: z.string().describe('The ID of the doctor (e.g. doctor-001)'),
      hospitalId: z.string().describe('The ID of the hospital (e.g. hospital-001)'),
      specialtyId: z.string().describe('The ID of the specialty (e.g. cardiology)'),
      dateTime: z.string().describe('ISO Date String of the appointment time (e.g. 2026-07-18T10:00:00Z)'),
      notes: z.string().optional().describe('Optional notes/symptoms for the visit')
    }),
    examples: {
      request: {
        patientId: 'patient-001',
        doctorId: 'doctor-001',
        hospitalId: 'hospital-001',
        specialtyId: 'cardiology',
        dateTime: '2026-07-18T10:00:00Z',
        notes: 'Cardiology follow-up'
      },
      response: {
        id: 'apt-xyz',
        patientId: 'patient-001',
        doctorName: 'Dr. Sarah Mitchell',
        hospitalName: 'Metropolitan Medical Center',
        specialtyName: 'Cardiology',
        dateTime: '2026-07-18T10:00:00Z',
        status: 'scheduled',
        notes: 'Cardiology follow-up'
      }
    }
  })
  @Widget({ route: 'booking-confirmation' })
  async bookAppointment(input: any, context: ExecutionContext) {
    const apt = this.appointmentService.bookAppointment(input);
    
    // Resolve names for the booking-confirmation card
    const doctor = this.dataService.getDoctors().find(d => d.id === input.doctorId);
    const hospital = this.dataService.getHospitalById(input.hospitalId);
    const specialty = this.dataService.getSpecialtyById(input.specialtyId);

    return {
      id: apt.id,
      patientId: apt.patientId,
      doctorName: doctor ? doctor.name : 'Unknown Doctor',
      hospitalName: hospital ? hospital.name : 'Unknown Hospital',
      specialtyName: specialty ? specialty.name : 'Unknown Specialty',
      dateTime: apt.dateTime,
      status: apt.status,
      notes: apt.notes
    };
  }
}
