import { Hospital } from '../schemas/hospital.schema.js';
import { Specialty } from '../schemas/specialty.schema.js';
import { Doctor } from '../schemas/doctor.schema.js';
interface IntakeRecord {
    recordId: string;
    name: string;
    age: number;
    weight: number;
    patientId: string;
    symptoms: string[];
    urgency: string;
    timestamp: string;
}
export interface PatientRecord {
    id: string;
    name: string;
    age: number;
    weight: number;
    symptoms: string[];
    medicalHistory?: {
        conditions?: string[];
        medications?: string[];
        allergies?: string[];
    };
    createdAt: string;
}
interface Booking {
    bookingId: string;
    recordId: string;
    doctorId: string;
    hospitalId: string;
    appointmentSlot: string;
    createdAt: string;
}
interface TriageResult {
    patientId: string;
    recordId?: string;
    predictedCondition: string;
    urgencyLevel: string;
    detectedRedFlags: Array<{
        id: string;
        description: string;
        severity: number;
        category: string;
    }>;
    confidenceScore: number;
    timestamp: string;
}
export declare class DataService {
    private seedData;
    private intakeRecords;
    private patients;
    private bookings;
    private triageResults;
    private loadSeedData;
    getHospitals(): Hospital[];
    getHospitalById(id: string): Hospital | undefined;
    getSpecialties(): Specialty[];
    getSpecialtyById(id: string): Specialty | undefined;
    getDoctors(): Doctor[];
    getDoctorsBySpecialty(specialtyId: string): Doctor[];
    getDoctorsByHospital(hospitalId: string): Doctor[];
    searchDoctors(specialtyQuery: string): {
        id: string;
        name: string;
        specialtyId: string;
        specialtyName: string;
        hospitalId: string;
        hospitalName: string;
        imageUrl: string;
    }[];
    storeIntakeRecord(record: IntakeRecord): void;
    getIntakeRecord(recordId: string): IntakeRecord | undefined;
    storePatientRecord(input: {
        name: string;
        age: number;
        weight: number;
        symptoms: string[];
        medicalHistory?: {
            conditions?: string[];
            medications?: string[];
            allergies?: string[];
        };
    }): string;
    getPatientRecord(patientId: string): PatientRecord;
    storeBooking(input: {
        recordId: string;
        doctorId: string;
        hospitalId: string;
        appointmentSlot: string;
    }): string;
    getBooking(bookingId: string): Booking | undefined;
    storeTriageResult(input: {
        patientId: string;
        recordId?: string;
        predictedCondition: string;
        urgencyLevel: string;
        detectedRedFlags: Array<{
            id: string;
            description: string;
            severity: number;
            category: string;
        }>;
        confidenceScore: number;
        timestamp: string;
    }): void;
    getTriageResult(recordId: string): TriageResult | undefined;
}
export {};
//# sourceMappingURL=data.service.d.ts.map