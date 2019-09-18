import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SiteComponent } from './site/site.component';


const routes: Routes = [
  {
    path: '' , component : SiteComponent
  },
  {
    path: 'influencer',
    loadChildren: 'src/app/influencer-module/influencer-module.module#InfluencerModuleModule'
  },
  {
    path: 'requirement',
    loadChildren: 'src/app/requirement-module/requirement-module.module#RequirementModuleModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
