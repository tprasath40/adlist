import { Component,OnInit } from '@angular/core';
import { AdService } from '../api/ad.service';
import { Router } from '@angular/router';
import { AlertController  } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'view-ads.page.html',
  styleUrls: ['view-ads.page.scss'],
})
export class ViewAdsPage implements OnInit {
  loginObj:any={}
  newValue;
  adList:any=[];
  adObj:any = {};
  sendObj:any={};
  constructor(public adService: AdService,private router: Router,public alertController: AlertController) {}
  ngOnInit() {
    console.log("ngOnInit");
  //  this.fetchAds();
  //  this.adObj.sortBy = "Price ASC";
  //  this.adObj.searchTxt = "";
  }

  fetchAds() {
   this.adService.fetchAds().subscribe((res) => {
    this.adList = res
    console.log(this.adList);
    if(this.adList.length==0)
    {
      this.presentAlertConfirm("No ads to show. Please post ad to view")
    }

  },  err => {
    this.adService.presentAlert("Error Occured. Please try again")
  });
  }

  filterAds(){
    this.adObj.title= this.adObj.searchTxt;
    this.adObj.sortBy= this.adObj.sortBy;
    this.adService.filterAds(this.adObj).subscribe((res) => {
      this.adList = res
    },  err => {
      this.adService.presentAlert("Error Occured. Please try again")
    });
  //
}

sortAds($event)
{
  let sortBy = $event.detail.value;
  this.sendObj.title= this.adObj.searchTxt;
  this.sendObj.sortBy= $event.detail.value;
  console.log(this.sendObj);
  this.adService.sortAds(this.sendObj).subscribe((res) => {
    this.adList = res
  },  err => {
    this.adService.presentAlert("Error Occured. Please try again")
  });

}

goToPostAds()
{
  this.router.navigate(['/post-ad']);

}
ionViewWillEnter()
{
  console.log("ionViewWillEnter");
  this.fetchAds();
  this.adObj.sortBy = "Price ASC";
  this.adObj.searchTxt = "";
}

async presentAlertConfirm(msg) {
  const alert = await this.alertController.create({
    cssClass: 'alertCustomCss',
    header : "Alert",
    message: msg,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'cancel-btn',
        handler: (blah) => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Post ad',
        cssClass: 'ok-btn',
        handler: () => {
          this.goToPostAds();
        }
      }
    ]
  });

  await alert.present();
  return alert;
}
}
