var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nitrostack/core';
import { DataService } from '../../shared/services/data.service.js';
import { CONDITION_TO_SPECIALTY_MAP, scoreConditionMatch } from './matching-rules.js';
let MatchingService = class MatchingService {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    /**
     * Recommend a specialty based on candidate conditions.
     * Returns the top match + alternates if ambiguous.
     */
    recommendSpecialty(candidateConditions) {
        if (!candidateConditions || candidateConditions.length === 0) {
            throw new Error('No candidate conditions provided');
        }
        // Get all unique specialties from the mapping
        const allSpecialties = new Set(Object.values(CONDITION_TO_SPECIALTY_MAP));
        // Score each specialty
        const scores = [];
        allSpecialties.forEach((specialtyId) => {
            const score = scoreConditionMatch(candidateConditions, specialtyId);
            if (score > 0) {
                scores.push({ specialtyId, score });
            }
        });
        if (scores.length === 0) {
            throw new Error('No matching specialties found for the provided conditions');
        }
        // Sort by score descending
        scores.sort((a, b) => b.score - a.score);
        // Get specialty names from DataService
        const specialties = this.dataService.getSpecialties();
        const specialtyMap = new Map(specialties.map((s) => [s.id, s.name]));
        // Build result
        const topScore = scores[0];
        const specialty = {
            specialtyId: topScore.specialtyId,
            specialtyName: specialtyMap.get(topScore.specialtyId) || topScore.specialtyId,
            confidenceScore: topScore.score,
        };
        // Alternates: other matches with score > 0.3 (or all if top is < 0.7)
        const alternateThreshold = topScore.score < 0.7 ? 0 : 0.3;
        const alternates = scores
            .slice(1)
            .filter((s) => s.score >= alternateThreshold)
            .map((s) => ({
            specialtyId: s.specialtyId,
            specialtyName: specialtyMap.get(s.specialtyId) || s.specialtyId,
            confidenceScore: s.score,
        }));
        return {
            specialty,
            alternates: alternates.length > 0 ? alternates : undefined,
        };
    }
    /**
     * Find hospital/doctor options for a specialty.
     * If preferredHospitalId is given and has a matching doctor, put that first.
     * Otherwise return all available options ranked by hospital.
     */
    findHospitalOptions(specialtyId, preferredHospitalId) {
        const doctors = this.dataService.getDoctorsBySpecialty(specialtyId);
        if (!doctors || doctors.length === 0) {
            throw new Error(`No doctors found for specialty: ${specialtyId}`);
        }
        const hospitals = this.dataService.getHospitals();
        const hospitalMap = new Map(hospitals.map((h) => [h.id, h.name]));
        // Build options
        const options = doctors.map((doctor) => ({
            doctorId: doctor.id,
            doctorName: doctor.name,
            hospitalId: doctor.hospital,
            hospitalName: hospitalMap.get(doctor.hospital) || doctor.hospital,
            isPrimary: false,
        }));
        // If preferred hospital specified, check if it has a matching doctor
        if (preferredHospitalId) {
            const preferredDoctor = doctors.find((d) => d.hospital === preferredHospitalId);
            if (preferredDoctor) {
                // Move preferred to front and mark as primary
                const preferredIndex = options.findIndex((o) => o.doctorId === preferredDoctor.id);
                if (preferredIndex > -1) {
                    const [preferred] = options.splice(preferredIndex, 1);
                    preferred.isPrimary = true;
                    options.unshift(preferred);
                }
            }
            else {
                // Preferred hospital has no matching doctor — add fallbackUsed flag to all
                options.forEach((opt) => {
                    opt.fallbackUsed = true;
                });
            }
        }
        return options;
    }
};
MatchingService = __decorate([
    Injectable({ deps: [DataService] }),
    __metadata("design:paramtypes", [DataService])
], MatchingService);
export { MatchingService };
//# sourceMappingURL=matching.service.js.map