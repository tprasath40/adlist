import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient  } from '@angular/common/http';
import { LoadingController,AlertController  } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AdService {
  apiUrl = environment.apiUrl;


  constructor(public http: HttpClient,public alertController: AlertController) { }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: [
        { text:'OK',
        cssClass: 'customClass',
        }
      ]
    });

    await alert.present();
  }


  public fetchAds() {
     return  this.http.get(this.apiUrl+"fetchAds")
   }

  public filterAds(sendObj) {
    console.log(sendObj)
     return  this.http.post(this.apiUrl+"filterAds",sendObj)
   }
   public sortAds(sendObj) {
     console.log(sendObj);
     return  this.http.post(this.apiUrl+"sortAds",sendObj)
   }

   public saveAd(sendObj) {
    console.log(sendObj);
    return  this.http.post(this.apiUrl+"postAds",sendObj)
  }

}
