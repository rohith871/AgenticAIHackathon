var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, z, Injectable } from '@nitrostack/core';
import { DataService } from '../../shared/services/data.service.js';
// Helper function to generate next weekday 10:00 AM slot
function generateNextWeekdaySlot() {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    // Skip weekends (0 = Sunday, 6 = Saturday)
    while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
        nextDay.setDate(nextDay.getDate() + 1);
    }
    // Set time to 10:00 AM
    nextDay.setHours(10, 0, 0, 0);
    return nextDay.toISOString();
}
let ConfirmBookingChoiceTool = class ConfirmBookingChoiceTool {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    async confirmBookingChoice(input, ctx) {
        if (!input.confirmed) {
            return {
                booked: false,
                message: 'No booking made. You can choose a different option.'
            };
        }
        try {
            const appointmentSlot = generateNextWeekdaySlot();
            const bookingId = this.dataService.storeBooking({
                recordId: input.recordId,
                doctorId: input.doctorId,
                hospitalId: input.hospitalId,
                appointmentSlot
            });
            return {
                booked: true,
                bookingId,
                appointmentSlot
            };
        }
        catch (error) {
            ctx.logger.error('Error confirming booking', {
                error: error instanceof Error ? error.message : 'Unknown error'
            });
            throw new Error('Failed to confirm booking');
        }
    }
};
__decorate([
    Tool({
        name: 'confirm-booking-choice',
        description: 'Confirm or reject a doctor/hospital booking choice. If confirmed, creates a booking with a next-weekday 10:00 AM appointment slot.',
        inputSchema: z.object({
            recordId: z.string().describe('The intake record ID'),
            doctorId: z.string().describe('The selected doctor ID'),
            hospitalId: z.string().describe('The selected hospital ID'),
            confirmed: z.boolean().describe('Whether the user confirmed the booking choice')
        }),
        examples: {
            request: {
                recordId: 'intake-001',
                doctorId: 'doc-001',
                hospitalId: 'hosp-001',
                confirmed: true
            },
            response: {
                booked: true,
                bookingId: 'booking-1234567890',
                appointmentSlot: '2026-07-21T10:00:00.000Z'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfirmBookingChoiceTool.prototype, "confirmBookingChoice", null);
ConfirmBookingChoiceTool = __decorate([
    Injectable({ deps: [DataService] }),
    __metadata("design:paramtypes", [DataService])
], ConfirmBookingChoiceTool);
export { ConfirmBookingChoiceTool };
let GenerateVisitSummaryTool = class GenerateVisitSummaryTool {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    async generateVisitSummary(input, ctx) {
        try {
            // Fetch intake record
            const intakeRecord = this.dataService.getIntakeRecord(input.recordId);
            if (!intakeRecord) {
                throw new Error(`Intake record not found: ${input.recordId}`);
            }
            // Fetch booking
            const booking = this.dataService.getBooking(input.bookingId);
            if (!booking) {
                throw new Error(`Booking not found: ${input.bookingId}`);
            }
            // Fetch triage result
            const triageResult = this.dataService.getTriageResult(input.recordId);
            // Look up doctor name
            const allDoctors = this.dataService.getDoctors();
            const doctor = allDoctors.find((d) => d.id === booking.doctorId);
            const doctorName = doctor ? doctor.name : 'Unknown Doctor';
            // Look up hospital name
            const hospital = this.dataService.getHospitalById(booking.hospitalId);
            const hospitalName = hospital ? hospital.name : 'Unknown Hospital';
            return {
                name: intakeRecord.name,
                age: intakeRecord.age,
                weight: intakeRecord.weight,
                symptoms: intakeRecord.symptoms,
                predictedCondition: triageResult?.predictedCondition || 'Pending triage analysis',
                urgencyLevel: triageResult?.urgencyLevel || intakeRecord.urgency,
                doctorName,
                hospitalName,
                appointmentSlot: booking.appointmentSlot
            };
        }
        catch (error) {
            ctx.logger.error('Error generating visit summary', {
                error: error instanceof Error ? error.message : 'Unknown error'
            });
            throw new Error('Failed to generate visit summary');
        }
    }
};
__decorate([
    Tool({
        name: 'generate-visit-summary',
        description: 'Generate a comprehensive visit summary combining intake, triage, and booking information.',
        inputSchema: z.object({
            recordId: z.string().describe('The intake record ID'),
            bookingId: z.string().describe('The booking ID')
        }),
        examples: {
            request: {
                recordId: 'intake-001',
                bookingId: 'booking-1234567890'
            },
            response: {
                name: 'John Doe',
                age: 35,
                weight: 75,
                symptoms: ['fever', 'cough'],
                predictedCondition: 'Acute Respiratory Distress / Asthma / Pneumonia',
                urgencyLevel: 'moderate',
                doctorName: 'Dr. Jane Smith',
                hospitalName: 'City Medical Center',
                appointmentSlot: '2026-07-21T10:00:00.000Z'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GenerateVisitSummaryTool.prototype, "generateVisitSummary", null);
GenerateVisitSummaryTool = __decorate([
    Injectable({ deps: [DataService] }),
    __metadata("design:paramtypes", [DataService])
], GenerateVisitSummaryTool);
export { GenerateVisitSummaryTool };
//# sourceMappingURL=booking.tools.js.map