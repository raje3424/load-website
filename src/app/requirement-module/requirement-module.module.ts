import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequirementRoutingModule } from './requirement-routing.module';
import { RequirementComponent } from './requirement.component';
import { Demo2Component } from './demo2/demo2.component';

@NgModule({
  imports: [
    CommonModule,
    RequirementRoutingModule
  ],
  declarations: [
    RequirementComponent,
    Demo2Component
  ]
})
export class RequirementModuleModule { }
