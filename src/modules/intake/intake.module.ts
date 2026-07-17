import { Module } from '@nitrostack/core';
import { IntakeTools } from './intake.tools.js';

@Module({
  name: 'intake',
  description: 'Patient intake management and record storage',
  controllers: [IntakeTools],
})
export class IntakeModule {}
