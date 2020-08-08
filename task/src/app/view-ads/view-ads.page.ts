import { Component,OnInit } from '@angular/core';
import { AdService } from '../api/ad.service';
import { Router } from '@angular/router';
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
  constructor(public adService: AdService,private router: Router) {}
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
  },  err => {
    console.log(err);
  });
  }

  filterAds(event){
    this.adObj.title= this.adObj.searchTxt;
    this.adObj.sortBy= this.adObj.sortBy;
    this.adService.filterAds(this.adObj).subscribe((res) => {
      this.adList = res
    },  err => {
      console.log(err.error);
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
    console.log(err.error);
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
}
