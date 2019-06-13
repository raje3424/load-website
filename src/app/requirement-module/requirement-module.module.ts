import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RequirementRoutingModule } from './requirement-routing.module';
import { RequirementComponent } from './requirement.component';
import { NavComponent } from './nav/nav.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EnquiryPageComponent } from './enquiry-page/enquiry-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EnquirerPageComponent } from './enquirer-page/enquirer-page.component';


@NgModule({
  imports: [
    CommonModule,
    RequirementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RequirementComponent,
    NavComponent,
    LandingPageComponent,
    EnquiryPageComponent,
    AdminPageComponent,
    EnquirerPageComponent
  ]
})
export class RequirementModuleModule { }
