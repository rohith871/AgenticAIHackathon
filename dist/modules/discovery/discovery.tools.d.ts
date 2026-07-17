import { ExecutionContext } from '@nitrostack/core';
import { DataService } from '../../shared/services/data.service.js';
import { AppointmentService } from '../../shared/services/appointment.service.js';
/**
 * Discovery Tools
 *
 * Tools for browsing hospitals, medical specialties, and appointments
 */
export declare class DiscoveryTools {
    private dataService;
    private appointmentService;
    constructor(dataService: DataService, appointmentService: AppointmentService);
    listHospitals(input: Record<string, never>, context: ExecutionContext): Promise<{
        hospitals: {
            id: string;
            name: string;
            location: string;
            imageUrl: string;
            description: string;
        }[];
    }>;
    listSpecialties(input: Record<string, never>, context: ExecutionContext): Promise<{
        specialties: {
            id: string;
            name: string;
            description: string;
            imageUrl: string;
        }[];
    }>;
    searchDoctors(input: {
        specialty: string;
    }, context: ExecutionContext): Promise<{
        doctors: {
            id: string;
            name: string;
            specialtyId: string;
            specialtyName: string;
            hospitalId: string;
            hospitalName: string;
            imageUrl: string;
        }[];
    }>;
    filterAppointments(input: {
        date: string;
    }, context: ExecutionContext): Promise<{
        appointments: {
            id: string;
            status: "scheduled" | "completed" | "cancelled";
            patientId: string;
            doctorId: string;
            hospitalId: string;
            specialtyId: string;
            dateTime: string;
            notes?: string | undefined;
        }[];
    }>;
}
//# sourceMappingURL=discovery.tools.d.ts.map