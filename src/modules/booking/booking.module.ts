import { Module } from '@nitrostack/core';
import { BookingTools } from './booking.tools.js';

@Module({
  name: 'booking',
  description: 'Specialist medical appointments booking and confirmation',
  controllers: [BookingTools]
})
export class BookingModule {}
