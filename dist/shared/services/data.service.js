var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
let DataService = class DataService {
    seedData = null;
    intakeRecords = new Map();
    patients = new Map();
    loadSeedData() {
        if (this.seedData) {
            return this.seedData;
        }
        const seedPath = path.join(process.cwd(), 'fixtures', 'seed.json');
        const rawData = fs.readFileSync(seedPath, 'utf-8');
        this.seedData = JSON.parse(rawData);
        return this.seedData;
    }
    getHospitals() {
        const data = this.loadSeedData();
        return data.hospitals;
    }
    getHospitalById(id) {
        const data = this.loadSeedData();
        return data.hospitals.find((h) => h.id === id);
    }
    getSpecialties() {
        const data = this.loadSeedData();
        return data.specialties;
    }
    getSpecialtyById(id) {
        const data = this.loadSeedData();
        return data.specialties.find((s) => s.id === id);
    }
    getDoctors() {
        const data = this.loadSeedData();
        return data.doctors;
    }
    getDoctorsBySpecialty(specialtyId) {
        const data = this.loadSeedData();
        return data.doctors.filter((d) => d.specialty === specialtyId);
    }
    getDoctorsByHospital(hospitalId) {
        const data = this.loadSeedData();
        return data.doctors.filter((d) => d.hospital === hospitalId);
    }
    searchDoctors(specialtyQuery) {
        const data = this.loadSeedData();
        const query = specialtyQuery.toLowerCase();
        // Find matching specialty
        const specialty = data.specialties.find((s) => s.id.toLowerCase() === query || s.name.toLowerCase() === query);
        if (!specialty)
            return [];
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
    storeIntakeRecord(record) {
        this.intakeRecords.set(record.recordId, record);
    }
    getIntakeRecord(recordId) {
        return this.intakeRecords.get(recordId);
        // Patient intake methods
        storePatientRecord(input, {
            name: string,
            age: number,
            weight: number,
            symptoms: string[],
            medicalHistory: {
                conditions: string[],
                medications: string[],
                allergies: string[]
            }
        });
        string;
        {
            const patientId = uuidv4();
            const record = {
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
        getPatientRecord(patientId, string);
        PatientRecord;
        {
            const record = this.patients.get(patientId);
            if (!record) {
                throw new Error(`Patient record not found for ID: ${patientId}`);
            }
            return record;
        }
    }
};
DataService = __decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map