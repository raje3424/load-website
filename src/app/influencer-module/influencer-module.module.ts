import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfluencerRoutingModule } from './influencer-routing.module';
import { InfluencerComponent } from './influencer.component';
import { Demo1Component } from './demo1/demo1.component';

@NgModule({
  imports: [
    CommonModule,
    InfluencerRoutingModule
  ],
  declarations: [
    InfluencerComponent,
    Demo1Component
  ]
})
export class InfluencerModuleModule { }
