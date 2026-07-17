var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nitrostack/core';
let AppointmentService = class AppointmentService {
    appointments = [
        {
            id: 'apt-001',
            patientId: 'patient-001',
            doctorId: 'doctor-001',
            hospitalId: 'hospital-001',
            specialtyId: 'cardiology',
            dateTime: '2026-07-18T10:00:00Z',
            status: 'scheduled',
            notes: 'Routine cardiovascular follow-up'
        },
        {
            id: 'apt-002',
            patientId: 'patient-002',
            doctorId: 'doctor-004',
            hospitalId: 'hospital-002',
            specialtyId: 'pediatrics',
            dateTime: '2026-07-18T14:30:00Z',
            status: 'scheduled',
            notes: 'General checkup'
        },
        {
            id: 'apt-003',
            patientId: 'patient-003',
            doctorId: 'doctor-002',
            hospitalId: 'hospital-001',
            specialtyId: 'neurology',
            dateTime: '2026-07-19T09:00:00Z',
            status: 'scheduled',
            notes: 'EEG reading review'
        },
        {
            id: 'apt-004',
            patientId: 'patient-001',
            doctorId: 'doctor-005',
            hospitalId: 'hospital-002',
            specialtyId: 'dermatology',
            dateTime: '2026-07-20T11:15:00Z',
            status: 'scheduled',
            notes: 'Skin rash follow-up'
        },
        {
            id: 'apt-005',
            patientId: 'patient-004',
            doctorId: 'doctor-001',
            hospitalId: 'hospital-001',
            specialtyId: 'cardiology',
            dateTime: '2026-07-18T16:00:00Z',
            status: 'scheduled',
            notes: 'Echocardiogram check'
        }
    ];
    getAppointments() {
        return this.appointments;
    }
    filterAppointmentsByDate(dateStr) {
        // Extract date part (YYYY-MM-DD) for robust matching
        const targetDate = dateStr.split('T')[0];
        return this.appointments.filter(apt => {
            const aptDate = apt.dateTime.split('T')[0];
            return aptDate === targetDate;
        });
    }
    bookAppointment(input) {
        const newAppointment = {
            id: `apt-${Math.random().toString(36).substr(2, 9)}`,
            patientId: input.patientId,
            doctorId: input.doctorId,
            hospitalId: input.hospitalId,
            specialtyId: input.specialtyId,
            dateTime: input.dateTime,
            status: 'scheduled',
            notes: input.notes
        };
        this.appointments.push(newAppointment);
        return newAppointment;
    }
};
AppointmentService = __decorate([
    Injectable()
], AppointmentService);
export { AppointmentService };
//# sourceMappingURL=appointment.service.js.map