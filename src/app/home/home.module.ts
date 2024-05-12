import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ActionsComponent } from './actions/actions.component';
import { SharedModule } from '../shared/shared.module';
import { VerificationComponent } from './verification/verification.component';

@NgModule({
    declarations: [LandingComponent, ActionsComponent, VerificationComponent],
    imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
