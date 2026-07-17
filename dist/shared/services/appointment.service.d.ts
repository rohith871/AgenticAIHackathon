import { Appointment } from '../schemas/appointment.schema.js';
export declare class AppointmentService {
    private appointments;
    getAppointments(): Appointment[];
    filterAppointmentsByDate(dateStr: string): Appointment[];
    bookAppointment(input: {
        patientId: string;
        doctorId: string;
        hospitalId: string;
        specialtyId: string;
        dateTime: string;
        notes?: string;
    }): Appointment;
}
//# sourceMappingURL=appointment.service.d.ts.map