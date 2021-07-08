import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, ModalController, NavController } from '@ionic/angular';
import { JoinsService } from '../api/joins.service';



@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.page.html',
  styleUrls: ['./myrequest.page.scss'],
})
export class MyrequestPage implements OnInit {
  @Input() myId: string;
  myData: any;
  myJoin: any;
  constructor(public modalCtrl: ModalController,
              public joinService: JoinsService,
              public navCtrl: NavController,
              public router: Router,
              public loadingController: LoadingController,
              public alertController: AlertController) { }

  ngOnInit() {
    // console.log(this.myId);
    this.joinService.getJoin().subscribe(data => {
      this.myData = data.response;
      this.myJoin = this.myData.filter(res => res.joinerId === this.myId && res.status === false);
      console.log(this.myJoin);

    });

  }
  async cancel(id: string){
    const alert = await this.alertController.create({
      header: 'ยกเลิกคำขอเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการยกเลิกคำขอเข้าร่วมอีเว้นท์',
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

    this.joinService.leaveJoin(id);
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      duration: 400
    });
    await loading.present();

    this.modalCtrl.dismiss();
      const modal = await this.modalCtrl.create({
        component: MyrequestPage,
        cssClass: 'my-custom-class',
        componentProps: {
          myId: id
        }
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
