import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Demo2Component } from './demo2/demo2.component';

const routes: Routes = [
  { 
    path: '' , component : Demo2Component
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
export class RequirementRoutingModule { }
