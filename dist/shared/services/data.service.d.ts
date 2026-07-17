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
export declare class DataService {
    private seedData;
    private intakeRecords;
    private patients;
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
}
export {};
//# sourceMappingURL=data.service.d.ts.map