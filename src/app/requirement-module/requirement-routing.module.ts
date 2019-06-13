import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EnquirerPageComponent } from './enquirer-page/enquirer-page.component';
import { EnquiryPageComponent } from './enquiry-page/enquiry-page.component';

const routes: Routes = [
  { 
    path: '' , component : NavComponent,
    children: [
      { path: '' , component : LandingPageComponent },
      { path: 'admin' , component : AdminPageComponent },
      { path: 'enquirer' , component : EnquirerPageComponent },
      { path: 'enquiry' , component : EnquiryPageComponent }
    ]
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
