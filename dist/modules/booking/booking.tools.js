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
import { AppointmentService } from '../../shared/services/appointment.service.js';
import { DataService } from '../../shared/services/data.service.js';
let BookingTools = class BookingTools {
    appointmentService;
    dataService;
    constructor(appointmentService, dataService) {
        this.appointmentService = appointmentService;
        this.dataService = dataService;
    }
    async bookAppointment(input, context) {
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
};
__decorate([
    Tool({
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
    }),
    Widget({ route: 'booking-confirmation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingTools.prototype, "bookAppointment", null);
BookingTools = __decorate([
    Injectable({ deps: [AppointmentService, DataService] }),
    __metadata("design:paramtypes", [AppointmentService,
        DataService])
], BookingTools);
export { BookingTools };
//# sourceMappingURL=booking.tools.js.map