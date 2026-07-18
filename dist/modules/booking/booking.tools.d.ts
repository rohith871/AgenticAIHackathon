import { ExecutionContext } from '@nitrostack/core';
import { DataService } from '../../shared/services/data.service.js';
export declare class ConfirmBookingChoiceTool {
    private dataService;
    constructor(dataService: DataService);
    confirmBookingChoice(input: {
        recordId: string;
        doctorId: string;
        hospitalId: string;
        confirmed: boolean;
    }, ctx: ExecutionContext): Promise<{
        booked: boolean;
        message: string;
        bookingId?: undefined;
        appointmentSlot?: undefined;
    } | {
        booked: boolean;
        bookingId: string;
        appointmentSlot: string;
        message?: undefined;
    }>;
}
export declare class GenerateVisitSummaryTool {
    private dataService;
    constructor(dataService: DataService);
    generateVisitSummary(input: {
        recordId: string;
        bookingId: string;
    }, ctx: ExecutionContext): Promise<{
        name: string;
        age: number;
        weight: number;
        symptoms: string[];
        predictedCondition: string;
        urgencyLevel: string;
        doctorName: string;
        hospitalName: string;
        appointmentSlot: string;
    }>;
}
//# sourceMappingURL=booking.tools.d.ts.map