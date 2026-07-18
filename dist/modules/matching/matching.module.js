var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MatchingService } from './matching.service.js';
import { MatchingTools } from './matching.tools.js';
let MatchingModule = class MatchingModule {
};
MatchingModule = __decorate([
    Module({
        name: 'matching',
        description: 'Specialty matching and hospital/doctor recommendation',
        controllers: [MatchingTools],
        providers: [MatchingService],
    })
], MatchingModule);
export { MatchingModule };
//# sourceMappingURL=matching.module.js.map