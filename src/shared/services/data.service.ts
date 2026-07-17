import { Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
import { Hospital } from '../schemas/hospital.schema.js';
import { Specialty } from '../schemas/specialty.schema.js';
import { Doctor } from '../schemas/doctor.schema.js';
import { v4 as uuidv4 } from 'uuid';

interface SeedData {
  hospitals: Hospital[];
  specialties: Specialty[];
  doctors: Doctor[];
}

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

@Injectable()
export class DataService {
  private seedData: SeedData | null = null;
  private intakeRecords: Map<string, IntakeRecord> = new Map();
  private patients: Map<string, PatientRecord> = new Map();

  private loadSeedData(): SeedData {
    if (this.seedData) {
      return this.seedData;
    }

    const seedPath = path.join(process.cwd(), 'fixtures', 'seed.json');
    const rawData = fs.readFileSync(seedPath, 'utf-8');
    this.seedData = JSON.parse(rawData) as SeedData;
    return this.seedData;
  }

  getHospitals(): Hospital[] {
    const data = this.loadSeedData();
    return data.hospitals;
  }

  getHospitalById(id: string): Hospital | undefined {
    const data = this.loadSeedData();
    return data.hospitals.find((h) => h.id === id);
  }

  getSpecialties(): Specialty[] {
    const data = this.loadSeedData();
    return data.specialties;
  }

  getSpecialtyById(id: string): Specialty | undefined {
    const data = this.loadSeedData();
    return data.specialties.find((s) => s.id === id);
  }

  getDoctors(): Doctor[] {
    const data = this.loadSeedData();
    return data.doctors;
  }

  getDoctorsBySpecialty(specialtyId: string): Doctor[] {
    const data = this.loadSeedData();
    return data.doctors.filter((d) => d.specialty === specialtyId);
  }

  getDoctorsByHospital(hospitalId: string): Doctor[] {
    const data = this.loadSeedData();
    return data.doctors.filter((d) => d.hospital === hospitalId);
  }

  searchDoctors(specialtyQuery: string) {
    const data = this.loadSeedData();
    const query = specialtyQuery.toLowerCase();
    
    // Find matching specialty
    const specialty = data.specialties.find(
      (s) => s.id.toLowerCase() === query || s.name.toLowerCase() === query
    );
    
    if (!specialty) return [];
    
    const doctors = data.doctors.filter((d) => d.specialty === specialty.id);
    
    return doctors.map((d) => {
      const hospital = data.hospitals.find((h) => h.id === d.hospital);
      return {
        id: d.id,
        name: d.name,
        specialtyId: specialty.id,
        specialtyName: specialty.name,
        hospitalId: d.hospital,
        hospitalName: hospital ? hospital.name : 'Unknown Hospital',
        imageUrl: d.imageUrl
      };
    });
  }

  storeIntakeRecord(record: IntakeRecord): void {
    this.intakeRecords.set(record.recordId, record);
  }

  getIntakeRecord(recordId: string): IntakeRecord | undefined {
    return this.intakeRecords.get(recordId);
  }

  // Patient intake methods
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
  }): string {
    const patientId = uuidv4();
    const record: PatientRecord = {
      id: patientId,
      name: input.name,
      age: input.age,
      weight: input.weight,
      symptoms: input.symptoms,
      medicalHistory: input.medicalHistory,
      createdAt: new Date().toISOString()
    };
    this.patients.set(patientId, record);
    return patientId;
  }

  getPatientRecord(patientId: string): PatientRecord {
    const record = this.patients.get(patientId);
    if (!record) {
      throw new Error(`Patient record not found for ID: ${patientId}`);
    }
    return record;
  }
}
