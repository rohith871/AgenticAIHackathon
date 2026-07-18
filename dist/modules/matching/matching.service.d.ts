import { DataService } from '../../shared/services/data.service.js';
export interface RecommendedSpecialty {
    specialtyId: string;
    specialtyName: string;
    confidenceScore: number;
}
export interface HospitalOption {
    doctorId: string;
    doctorName: string;
    hospitalId: string;
    hospitalName: string;
    isPrimary: boolean;
    fallbackUsed?: boolean;
}
export declare class MatchingService {
    private dataService;
    constructor(dataService: DataService);
    /**
     * Recommend a specialty based on candidate conditions.
     * Returns the top match + alternates if ambiguous.
     */
    recommendSpecialty(candidateConditions: string[]): {
        specialty: RecommendedSpecialty;
        alternates?: RecommendedSpecialty[];
    };
    /**
     * Find hospital/doctor options for a specialty.
     * If preferredHospitalId is given and has a matching doctor, put that first.
     * Otherwise return all available options ranked by hospital.
     */
    findHospitalOptions(specialtyId: string, preferredHospitalId?: string): HospitalOption[];
}
//# sourceMappingURL=matching.service.d.ts.map