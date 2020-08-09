import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AdService } from '../api/ad.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.page.html',
  styleUrls: ['./post-ad.page.scss'],
})
export class PostAdPage implements OnInit {
  formGroup: FormGroup;
  postAdObj:any={};
  constructor(public formBuilder: FormBuilder,public adService: AdService,private router: Router) {

    this.formGroup = formBuilder.group({
      imgControl: [
        "",
        Validators.compose([Validators.required])
      ],
      titleControl: [
        "",
        Validators.compose([Validators.required])
      ],
      priceControl: [
        "",
        Validators.compose([
          Validators.pattern("^[0-9]*$"),
          Validators.required
        ])
      ]
    });
   }

  ngOnInit() {
  }

  postAd(formData: any) {
    console.log(this.postAdObj);

    this.adService.saveAd(this.postAdObj).subscribe((res) => {
      this.postAdObj ={};
   this.adService.presentAlert("Ads saved successfully")

    },  err => {
      this.adService.presentAlert("Error Occured. Please try again")
    });
  }

  goToViewAds()
  {
    this.router.navigate(['/view']);

  }
}
