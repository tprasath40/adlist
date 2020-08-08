import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ViewAdsPage } from './view-ads.page';

import { ViewAdPageRoutingModule } from './view-ads-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAdPageRoutingModule
  ],
  declarations: [ViewAdsPage]
})
export class ViewAdPageModule {}
