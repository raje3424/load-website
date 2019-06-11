import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequirementRoutingModule } from './requirement-routing.module';
import { RequirementComponent } from './requirement.component';

@NgModule({
  imports: [
    CommonModule,
    RequirementRoutingModule
  ],
  declarations: [
    RequirementComponent
  ]
})
export class RequirementModuleModule { }
