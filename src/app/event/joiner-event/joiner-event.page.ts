import { UsersService } from 'src/app/api/users.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertController, IonSlides, ModalController, LoadingController } from '@ionic/angular';
import { HistoriesService } from 'src/app/api/histories.service';
import { JoinsService } from 'src/app/api/joins.service';
import { NotificationsService } from 'src/app/api/notifications.service';
import { ProfileuserPage } from 'src/app/profileuser/profileuser.page';





@Component({
  selector: 'app-joiner-event',
  templateUrl: './joiner-event.page.html',
  styleUrls: ['./joiner-event.page.scss'],
})
export class JoinerEventPage implements OnInit {
 // Data passed in by componentProps
  // @Input() firstName: string;
  // @Input() lastName: string;
  // @Input() middleInitial: string;
  @Input() postId: string;
  allJoin: any;
  joiner: any;
  dataJoin: any;
  joinDetail: any;
  thisUser: any;
  imgUser = [];

  constructor(public modalCtrl: ModalController,
              public joinService: JoinsService,
              public alertController: AlertController,
              public notification: NotificationsService,
              public historyService: HistoriesService,
              public loadingController: LoadingController,
              public userService: UsersService) { }

  ngOnInit() {
    console.log('id : ', this.postId);
    this.joinService.getJoin().subscribe(data => {
      this.allJoin = data.response;
      this.joiner = this.allJoin.filter(joiner => joiner.postId === this.postId);
      for(let i in this.allJoin){
        this.joinDetail = this.allJoin[i];
        const joinerId = this.joinDetail.joinerId;
        const joinId = this.joinDetail._id
        this.userService.getidUser(joinerId).subscribe(usr => {
          this.thisUser = usr['img']; 
          this.imgUser.push({joinerId:joinerId, joinId:joinId , img:this.thisUser})
      })
      }
      console.log(this.joiner.length);
    });
  }

  async accept(id: string) {
    const alert2 = await this.alertController.create({
      header: 'ยอมรับ',
      message: 'คุณต้องการยอมรับผู้ใช้คนนี้เข้าร่วมอีเว้นท์',
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
            // console.log(id);
            this.joinService.getidJoin(id).subscribe(data => {
              this.dataJoin = data;
              console.log(this.dataJoin);
              const postId = this.dataJoin.postId;
              // console.log('postId naja ', postId);
              const postName = this.dataJoin.postName;
              const ownerName = this.dataJoin.ownerName;
              const ownerId = this.dataJoin.ownerId;
              const joinerName = this.dataJoin.joinerName;
              const joinerId = this.dataJoin.joinerId;
              const status = true;
              const datetime = this.dataJoin.datetime;
              const starttime = this.dataJoin.starttime;
              const endtime = this.dataJoin.endtime;
              const place = this.dataJoin.place;
              const type = this.dataJoin.type;
              const press = 'accept';
              const inject = true;
              const description = 'อนุมัติแล้ว';
              const read = false;

              const varJoin = {
                postId,
                postName,
                ownerName,
                ownerId,
                joinerName,
                joinerId,
                status,
                datetime,
                starttime,
                endtime,
                place,
                type
              };
              console.log(varJoin);

              console.log('this is a ' + id);
              this.joinService.acceptjoin(id,
                postId,
                postName,
                ownerName,
                ownerId,
                joinerName,
                joinerId,
                status,
                datetime,
                starttime,
                endtime,
                place,
                type);
              // -------------------
              // tslint:disable-next-line:max-line-length
              this.notification.addNotification(postId, postName, ownerName, ownerId, joinerName, joinerId, status, datetime, starttime, endtime, place, type, press, inject, description, read);
              // tslint:disable-next-line:max-line-length
              this.historyService.addHistory(postId, postName, ownerName, ownerId, joinerName, joinerId, datetime, starttime, endtime, place, type);

            });

            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Please wait...',
              duration: 500
            });
            await loading.present();

            this.modalCtrl.dismiss();
            const modal = await this.modalCtrl.create({
              component: JoinerEventPage,
              cssClass: 'my-custom-class',
              componentProps: {
                postId: this.postId,
              }
            });
            return await modal.present();
        }
        }
      ]
    });

    await alert2.present();

}
async profileUser(id: string){
  const modal  = await this.modalCtrl.create({
    component: ProfileuserPage,
    cssClass: 'my-custom-class',
    componentProps: {
      userid: id,
    }
  });
  return await modal.present();
}

  async reject(id: string) {
    const alert = await this.alertController.create({
      header: 'ปฏิเสธ',
      message: 'คุณต้องการที่จะปฏิเสธคำขอเข้าร่วมอีเว้นท์ของผู้ใช้คนนี้',
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
            console.log(id);
            this.joinService.getidJoin(id).subscribe(data => {
              this.dataJoin = data;
              console.log(this.dataJoin);
              const postId = this.dataJoin.postId;
              const postName = this.dataJoin.postName;
              const ownerName = this.dataJoin.ownerName;
              const ownerId = this.dataJoin.ownerId;
              const joinerName = this.dataJoin.joinerName;
              const joinerId = this.dataJoin.joinerId;
              const status = true;
              const datetime = this.dataJoin.datetime;
              const starttime = this.dataJoin.starttime;
              const endtime = this.dataJoin.endtime;
              const place = this.dataJoin.place;
              const type = this.dataJoin.type;
              const press = 'reject';
              const inject = false;
              const description = 'คำขอถูกปฏิเสธ';
              const read = false;

              // tslint:disable-next-line:max-line-length
              this.notification.addNotification(postId, postName, ownerName, ownerId, joinerName, joinerId, status, datetime, starttime, endtime, place, type, press, inject, description, read);
            });
            this.joinService.leaveJoin(id);

            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Please wait...',
              duration: 500
            });
            await loading.present();

            this.modalCtrl.dismiss();
            // await alert2.present();
            const modal = await this.modalCtrl.create({
              component: JoinerEventPage,
              cssClass: 'my-custom-class',
              componentProps: {
                postId: this.postId,
              }
            });
            return await modal.present();
          }
        }
      ]
    });
    await alert.present();

    
  }

  async leave(id: string) {
    const alert = await this.alertController.create({
      header: 'ปฏิเสธ',
      message: 'คุณต้องการที่จะปฏิเสธคำขอเข้าร่วมอีเว้นท์ของผู้ใช้คนนี้',
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
            console.log(id);
            this.joinService.getidJoin(id).subscribe(data => {
              this.dataJoin = data;
              console.log(this.dataJoin);
              const postId = this.dataJoin.postId;
              const postName = this.dataJoin.postName;
              const ownerName = this.dataJoin.ownerName;
              const ownerId = this.dataJoin.ownerId;
              const joinerName = this.dataJoin.joinerName;
              const joinerId = this.dataJoin.joinerId;
              const status = true;
              const datetime = this.dataJoin.datetime;
              const starttime = this.dataJoin.starttime;
              const endtime = this.dataJoin.endtime;
              const place = this.dataJoin.place;
              const type = this.dataJoin.type;
              const press = 'kick';
              const inject = false;
              const description = 'คุณถูกเตะจากอีเว้น';
              const read = false;

              // tslint:disable-next-line:max-line-length
              this.notification.addNotification(postId, postName, ownerName, ownerId, joinerName, joinerId, status, datetime, starttime, endtime, place, type, press, inject, description, read);
            });
            this.joinService.leaveJoin(id);

            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Please wait...',
              duration: 500
            });
            await loading.present();
            
            this.modalCtrl.dismiss();
            const modal = await this.modalCtrl.create({
              component: JoinerEventPage,
              cssClass: 'my-custom-class',
              componentProps: {
                postId: this.postId,
              }
            });
            return await modal.present();
          }
        }
      ]
    });
    await alert.present();
  }

  moveToNext(slides){
    // console.log(slides);
    slides.slideNext();
}
moveToPrev(slides){
  // console.log(slides);
  slides.slidePrev();
}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
