import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Demo1Component } from './demo1/demo1.component';


const routes: Routes = [
  { 
    path: '' , component : Demo1Component
  },
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes) 
  ],
  exports: [RouterModule],
  declarations: []
})
export class InfluencerRoutingModule { }
