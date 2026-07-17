import { z } from 'zod';
export declare const AppointmentSchema: z.ZodObject<{
    id: z.ZodString;
    patientId: z.ZodString;
    doctorId: z.ZodString;
    hospitalId: z.ZodString;
    specialtyId: z.ZodString;
    dateTime: z.ZodString;
    status: z.ZodEnum<["scheduled", "completed", "cancelled"]>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "scheduled" | "completed" | "cancelled";
    id: string;
    patientId: string;
    doctorId: string;
    hospitalId: string;
    specialtyId: string;
    dateTime: string;
    notes?: string | undefined;
}, {
    status: "scheduled" | "completed" | "cancelled";
    id: string;
    patientId: string;
    doctorId: string;
    hospitalId: string;
    specialtyId: string;
    dateTime: string;
    notes?: string | undefined;
}>;
export type Appointment = z.infer<typeof AppointmentSchema>;
//# sourceMappingURL=appointment.schema.d.ts.map