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
import { detectRedFlags, calculateSeverityScore, getUrgencyLevel } from './triage-rules.js';
let TriageService = class TriageService {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    /**
     * Analyze patient symptoms to detect red flags and suggest candidate conditions
     */
    analyzeSymptoms(input) {
        const { patientId, recordId, symptomDescription } = input;
        // Detect red flags from symptom text
        const detectedRedFlags = detectRedFlags(symptomDescription);
        // Calculate confidence score based on red flags
        const confidenceScore = calculateSeverityScore(detectedRedFlags);
        // Generate candidate conditions based on keywords and patterns
        const candidateConditions = this.generateCandidateConditions(symptomDescription, detectedRedFlags);
        return {
            patientId,
            recordId,
            symptomDescription,
            detectedRedFlags,
            candidateConditions,
            confidenceScore,
            timestamp: new Date().toISOString()
        };
    }
    /**
     * Score urgency level based on symptom analysis
     */
    scoreUrgency(input) {
        const { analysis, recordId } = input;
        // Calculate severity score from detected red flags
        const severityScore = calculateSeverityScore(analysis.detectedRedFlags);
        // Determine urgency level
        const urgencyLevel = getUrgencyLevel(severityScore);
        // Generate rationale
        const rationale = this.generateRationale(analysis.detectedRedFlags, urgencyLevel);
        // Determine if emergency care is advised
        const emergencyCareAdvised = urgencyLevel === 'emergency';
        // Generate recommended actions
        const recommendedActions = this.generateRecommendedActions(urgencyLevel, analysis.detectedRedFlags);
        // Determine predicted condition from candidate conditions
        const predictedCondition = analysis.candidateConditions.length > 0
            ? analysis.candidateConditions[0].name
            : 'General Medical Evaluation Required';
        // Store triage result if recordId is provided
        if (recordId) {
            this.dataService.storeTriageResult({
                patientId: analysis.patientId,
                recordId,
                predictedCondition,
                urgencyLevel,
                detectedRedFlags: analysis.detectedRedFlags.map((flag) => ({
                    id: flag.id,
                    description: flag.description,
                    severity: flag.severity,
                    category: flag.category
                })),
                confidenceScore: analysis.confidenceScore,
                timestamp: new Date().toISOString()
            });
        }
        return {
            urgencyLevel,
            severityScore,
            rationale,
            emergencyCareAdvised,
            recommendedActions,
            detectedRedFlags: analysis.detectedRedFlags.map((flag) => ({
                id: flag.id,
                description: flag.description,
                severity: flag.severity,
                category: flag.category
            }))
        };
    }
    /**
     * Generate candidate conditions based on symptom keywords
     */
    generateCandidateConditions(symptomText, redFlags) {
        const lowerText = symptomText.toLowerCase();
        const conditions = [];
        // Cardiac conditions
        if (lowerText.includes('chest pain') ||
            lowerText.includes('palpitations') ||
            lowerText.includes('heart racing')) {
            conditions.push({
                name: 'Acute Coronary Syndrome / Myocardial Infarction',
                specialty: 'Cardiology',
                confidence: 0.9,
                reasoning: 'Chest pain and palpitations are classic cardiac symptoms'
            });
        }
        // Respiratory conditions
        if (lowerText.includes('shortness of breath') ||
            lowerText.includes('difficulty breathing') ||
            lowerText.includes('wheezing')) {
            conditions.push({
                name: 'Acute Respiratory Distress / Asthma / Pneumonia',
                specialty: 'Pulmonology',
                confidence: 0.85,
                reasoning: 'Respiratory symptoms indicate pulmonary involvement'
            });
        }
        // Neurological conditions
        if (lowerText.includes('numbness') ||
            lowerText.includes('weakness') ||
            lowerText.includes('paralysis')) {
            conditions.push({
                name: 'Stroke / Transient Ischemic Attack',
                specialty: 'Neurology',
                confidence: 0.88,
                reasoning: 'Sudden numbness/weakness are stroke warning signs'
            });
        }
        if (lowerText.includes('severe headache') || lowerText.includes('worst headache')) {
            conditions.push({
                name: 'Subarachnoid Hemorrhage / Meningitis',
                specialty: 'Neurology',
                confidence: 0.8,
                reasoning: 'Severe headache can indicate serious neurological condition'
            });
        }
        // Gastrointestinal conditions
        if (lowerText.includes('severe abdominal pain') ||
            lowerText.includes('acute abdomen')) {
            conditions.push({
                name: 'Acute Abdomen / Appendicitis / Peritonitis',
                specialty: 'Gastroenterology',
                confidence: 0.75,
                reasoning: 'Severe abdominal pain requires urgent evaluation'
            });
        }
        // Allergic/Anaphylaxis
        if (lowerText.includes('anaphylaxis') ||
            lowerText.includes('severe allergic') ||
            lowerText.includes('throat swelling')) {
            conditions.push({
                name: 'Anaphylaxis / Severe Allergic Reaction',
                specialty: 'Emergency Medicine',
                confidence: 0.95,
                reasoning: 'Anaphylaxis is a life-threatening emergency'
            });
        }
        // Infectious conditions
        if (lowerText.includes('high fever') || lowerText.includes('stiff neck')) {
            conditions.push({
                name: 'Meningitis / Sepsis',
                specialty: 'Infectious Disease',
                confidence: 0.8,
                reasoning: 'Fever with stiff neck suggests meningitis'
            });
        }
        // Trauma
        if (lowerText.includes('head injury') ||
            lowerText.includes('head trauma') ||
            lowerText.includes('hit head')) {
            conditions.push({
                name: 'Traumatic Brain Injury / Intracranial Hemorrhage',
                specialty: 'Neurology',
                confidence: 0.85,
                reasoning: 'Head trauma requires neurological assessment'
            });
        }
        // If no specific conditions matched, return generic assessment
        if (conditions.length === 0) {
            conditions.push({
                name: 'General Medical Evaluation Required',
                specialty: 'Internal Medicine',
                confidence: 0.5,
                reasoning: 'Symptoms require further evaluation by primary care'
            });
        }
        return conditions;
    }
    /**
     * Generate human-readable rationale for urgency level
     */
    generateRationale(redFlags, urgencyLevel) {
        if (urgencyLevel === 'emergency') {
            const flagDescriptions = redFlags
                .slice(0, 3)
                .map(f => f.description)
                .join(', ');
            return `EMERGENCY: Critical red flags detected (${flagDescriptions}). Patient requires immediate emergency medical attention.`;
        }
        if (urgencyLevel === 'high') {
            const flagDescriptions = redFlags
                .slice(0, 2)
                .map(f => f.description)
                .join(', ');
            return `HIGH URGENCY: Serious symptoms detected (${flagDescriptions}). Patient should seek urgent medical evaluation today.`;
        }
        if (urgencyLevel === 'medium') {
            return 'MEDIUM URGENCY: Patient should schedule a medical appointment within 24-48 hours for evaluation.';
        }
        return 'LOW URGENCY: Symptoms appear mild. Patient should monitor and contact primary care if symptoms worsen.';
    }
    /**
     * Generate recommended actions based on urgency level
     */
    generateRecommendedActions(urgencyLevel, redFlags) {
        const actions = [];
        if (urgencyLevel === 'emergency') {
            actions.push('Call 911 or go to the nearest emergency room immediately');
            actions.push('Do not drive yourself; use ambulance or have someone drive you');
            actions.push('Inform emergency staff of all detected red flags');
            return actions;
        }
        if (urgencyLevel === 'high') {
            actions.push('Seek urgent care or emergency department evaluation today');
            actions.push('Contact your primary care physician immediately');
            actions.push('Do not delay seeking medical attention');
            return actions;
        }
        if (urgencyLevel === 'medium') {
            actions.push('Schedule an appointment with your primary care physician');
            actions.push('Monitor symptoms closely');
            actions.push('Seek immediate care if symptoms worsen or new red flags appear');
            return actions;
        }
        actions.push('Monitor symptoms');
        actions.push('Rest and maintain hydration');
        actions.push('Contact primary care if symptoms persist or worsen');
        return actions;
    }
};
TriageService = __decorate([
    Injectable({ deps: [DataService] }),
    __metadata("design:paramtypes", [DataService])
], TriageService);
export { TriageService };
//# sourceMappingURL=triage.service.js.map