import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostAdPageRoutingModule } from './post-ad-routing.module';

import { PostAdPage } from './post-ad.page';

import { ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostAdPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PostAdPage]
})
export class PostAdPageModule {}
