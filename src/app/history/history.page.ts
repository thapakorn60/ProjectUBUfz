import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoriesService } from '../api/histories.service';
import {AlertController, IonSlides, LoadingController, ModalController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  dateNow = Date.now();
  history: any;
  iduser: string;
  myHistory: any;

  constructor(public historyService: HistoriesService,
              public modalCtrl: ModalController,
              public navCtrl: NavController,
              public loadingController: LoadingController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.iduser = localStorage.getItem('id_user');
    this.historyService.getAllHistory().subscribe(data => {
      this.history = data.response;
      this.myHistory = this.history.filter(history => history.joinerId === this.iduser);
      console.log(this.history);

    });
    // this.slides.startAutoplay();
  }
  async deleteHistory(id: string){
    const alert = await this.alertController.create({
      header: 'ลบประวัติการเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการลบประวัติการเข้าร่วมอีเว้นท์',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        },
        {
          text: 'ตกลง',
          handler: async () => {
    this.historyService.deleteHistory(id);
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      duration: 400
    });
    await loading.present();

    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: HistoryPage,
      cssClass: 'my-custom-class',
    });
      return await modal.present();
  }
}
]
});
await alert.present();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

}
