import { ExecutionContext } from '@nitrostack/core';
import { AppointmentService } from '../../shared/services/appointment.service.js';
import { DataService } from '../../shared/services/data.service.js';
export declare class BookingTools {
    private appointmentService;
    private dataService;
    constructor(appointmentService: AppointmentService, dataService: DataService);
    bookAppointment(input: any, context: ExecutionContext): Promise<{
        id: string;
        patientId: string;
        doctorName: string;
        hospitalName: string;
        specialtyName: string;
        dateTime: string;
        status: "scheduled" | "completed" | "cancelled";
        notes: string | undefined;
    }>;
}
//# sourceMappingURL=booking.tools.d.ts.map