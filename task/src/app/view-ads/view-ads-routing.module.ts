import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAdsPage } from './view-ads.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAdsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAdPageRoutingModule {}
