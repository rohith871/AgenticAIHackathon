import { Injectable } from '@nitrostack/core';

export interface TriageResult {
  urgency: 'low' | 'medium' | 'high' | 'critical';
  recommendedSpecialtyId: string;
  recommendedSpecialtyName: string;
  notes: string;
}

@Injectable()
export class TriageService {
  analyzeSymptoms(symptoms: string[]): TriageResult {
    const list = symptoms.map(s => s.toLowerCase());

    // 1. Critical Symptoms - Cardiology / Neurology
    if (list.some(s => s.includes('chest pain') || s.includes('heart racing') || s.includes('palpitations') || s.includes('cardiac'))) {
      return {
        urgency: 'critical',
        recommendedSpecialtyId: 'cardiology',
        recommendedSpecialtyName: 'Cardiology',
        notes: 'Warning: Chest pain or palpitations can be signs of emergency. Please seek immediate medical help or visit the nearest ER.'
      };
    }

    if (list.some(s => s.includes('stroke') || s.includes('numbness') || s.includes('seizure') || s.includes('paralysis') || s.includes('severe headache'))) {
      return {
        urgency: 'critical',
        recommendedSpecialtyId: 'neurology',
        recommendedSpecialtyName: 'Neurology',
        notes: 'Critical neurological symptoms detected. Seek emergency medical attention immediately.'
      };
    }

    // 2. High Symptoms - Oncology / Neurology
    if (list.some(s => s.includes('lump') || s.includes('tumor') || s.includes('unexplained weight loss') || s.includes('cancer'))) {
      return {
        urgency: 'high',
        recommendedSpecialtyId: 'oncology',
        recommendedSpecialtyName: 'Oncology',
        notes: 'Symptoms indicate potential oncological concern. Schedule an oncology consult as soon as possible for evaluation.'
      };
    }

    // 3. Medium Symptoms - Orthopedics, Gastroenterology, Pediatrics
    if (list.some(s => s.includes('fracture') || s.includes('joint pain') || s.includes('bone') || s.includes('sprain') || s.includes('back pain'))) {
      return {
        urgency: 'medium',
        recommendedSpecialtyId: 'orthopedics',
        recommendedSpecialtyName: 'Orthopedics',
        notes: 'Bone or joint issue detected. Rest the affected area and consult an orthopedic specialist.'
      };
    }

    if (list.some(s => s.includes('stomach') || s.includes('nausea') || s.includes('vomiting') || s.includes('acid reflux') || s.includes('diarrhea') || s.includes('abdominal'))) {
      return {
        urgency: 'medium',
        recommendedSpecialtyId: 'gastroenterology',
        recommendedSpecialtyName: 'Gastroenterology',
        notes: 'Digestive symptoms detected. Maintain hydration and schedule an appointment with a gastroenterologist if symptoms persist.'
      };
    }

    if (list.some(s => s.includes('child') || s.includes('pediatric') || s.includes('baby') || s.includes('toddler') || s.includes('growth delay'))) {
      return {
        urgency: 'medium',
        recommendedSpecialtyId: 'pediatrics',
        recommendedSpecialtyName: 'Pediatrics',
        notes: 'Pediatric care recommended. Please consult with a pediatrician for child development or health concerns.'
      };
    }

    // 4. Low Symptoms - Dermatology / General
    if (list.some(s => s.includes('rash') || s.includes('skin') || s.includes('acne') || s.includes('itching') || s.includes('mole'))) {
      return {
        urgency: 'low',
        recommendedSpecialtyId: 'dermatology',
        recommendedSpecialtyName: 'Dermatology',
        notes: 'Skin concern detected. Monitor for changes and schedule an outpatient dermatology consult.'
      };
    }

    // Fallback
    return {
      urgency: 'low',
      recommendedSpecialtyId: 'pediatrics', // fallback general
      recommendedSpecialtyName: 'Pediatrics',
      notes: 'Symptoms appear mild. Rest, monitor, and contact primary care if you feel worse.'
    };
  }
}
