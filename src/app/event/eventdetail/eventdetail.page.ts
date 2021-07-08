/* tslint:disable */
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { JoinsService } from 'src/app/api/joins.service';
import { NotificationsService } from 'src/app/api/notifications.service';
import { PostsService } from 'src/app/api/posts.service';
import { UsersService } from 'src/app/api/users.service';
import { CommentsPage } from 'src/app/comments/comments.page';
import { UserProfile } from 'src/app/models/user';
import { JoinerEventPage } from '../joiner-event/joiner-event.page';


@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.page.html',
  styleUrls: ['./eventdetail.page.scss'],
})
export class EventdetailPage implements OnInit {
  @Input() postId: string;
  // @Input() eventname: string;
  public userProfile: UserProfile;
  dataPost: any;
  description: any;
  name: any;
  type: any;
  datetime: any;
  starttime: any;
  endtime: any;
  place: any;
  location: any;
  amount: any;
  createAt: any;
  allJoin: any;
  thisJoin: any;
  iduser: string;
  join: boolean;
  joinerId: string;
  status: boolean;
  userid: any;
  email_login = ""
  data_user_login = {}
  url = 'http://localhost:3000/user/getuserDetail';
  userDetail: Object;
  countJoin: any;
  total: number;
  eventname: any;
  userName: any;
  joinThisPost: Object;
  joinChecked: any;
  dataJoin: Object;
  img: any;
  dateNow = Date.now();
  Etime: any;
  Ntime: number;

  constructor(public modalCtrl: ModalController,
              public alertController: AlertController,
              public postService: PostsService,
              public http: HttpClient,
              private router: Router,
              public joinService: JoinsService,
              public userService: UsersService,
              public notiService: NotificationsService,
              public loadingController: LoadingController) {
                this.email_login = localStorage.getItem('data_user');
                this.http.get<{ messaeg: string, email: string, status: any }>(this.url + '/' + this.email_login).subscribe((res) => {
                  this.data_user_login = res;
                })
            }

  ngOnInit() {
    console.log('id: ', this.postId);
    this.iduser = localStorage.getItem('id_user');
    this.userService.getidUser(this.iduser).subscribe(data => {
      this.userDetail = data;
      this.userName = this.userDetail['name'];
      // console.log(this.userDetail);
      
    })
    this.postService.getidPost(this.postId).subscribe(data => {
      this.dataPost = data;
    
      this.userid = this.dataPost.userid;
      this.eventname = this.dataPost.eventname;
      this.name = this.dataPost.name;
      this.type = this.dataPost.type,
      this.datetime = this.dataPost.datetime,
      this.starttime = this.dataPost.starttime,
      this.endtime = this.dataPost.endtime,
      this.place = this.dataPost.place,
      this.location = this.dataPost.location,
      this.amount = this.dataPost.amount,
      this.description = this.dataPost.description;
      this.createAt = this.dataPost.createdAt;
      const timeE = new Date(this.endtime);
      const timeN = new Date(this.dateNow);
      this.Etime = timeE.getHours()
      this.Ntime = timeN.getHours()
      console.log(this.dataPost);
      this.userService.getidUser(this.userid).subscribe(usr => {
        this.img = usr['img'];
      });
      this.joinService.getJoin().subscribe(dataJoin => {
        this.allJoin = dataJoin.response;

        this.thisJoin = this.allJoin.filter(join => join.joinerId === this.iduser && join.postId === this.postId);
        this.countJoin = this.allJoin.filter(join => join.postId == this.postId && join.status == true).length
        this.total = this.amount - this.countJoin;
        console.log(this.thisJoin.length);
        console.log(this.countJoin);
        console.log(this.total);
        
        if (this.thisJoin.length > 0){
          this.join = true;
        }else if (this.thisJoin.length === 0) {
          this.join = false;
        }
        console.log(this.thisJoin);

          });

    });

  }

  async gotoComment(name: string, id: string , uid: string) {
    // console.log(id);
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        eventname: name,
        postId: id,
        userid: uid
      }
    });
    return await modal.present();
  }

  async Join(id: string) {
    const alert = await this.alertController.create({
      header: 'คุณต้องการเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการที่จะเข้าร่วมอีเว้นท์',
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
            console.log('confirm');
            this.join = true;
            this.postService.getidPost(id).subscribe(data => {
              this.dataPost = data;
              const postId = this.dataPost._id;
              const postName = this.dataPost.eventname;
              const ownerId = this.dataPost.userid;
              const ownerName = this.dataPost.name;
              const joinerName = this.userName;
              this.joinerId = localStorage.getItem('id_user');
              this.status = false;
              const datetime = this.dataPost.datetime;
              const starttime = this.dataPost.starttime;
              const endtime = this.dataPost.endtime;
              const place = this.dataPost.place;
              const type = this.dataPost.type;
              const press = 'request';
              const inject = false;
              const description = 'ขอเข้าร่วมอีเว้นท์';
              const read = false;
              // tslint:disable-next-line:max-line-length
              this.joinService.addJoin(postId, postName, ownerName, ownerId, joinerName, this.joinerId, this.status, datetime, starttime, endtime, place, type);
              // tslint:disable-next-line:max-line-length
              this.notiService.addNotification(postId, postName, ownerName, ownerId, joinerName, this.joinerId, this.status, datetime, starttime, endtime, place, type, press, inject, description, read);

            });
            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              // message: 'Please wait...',
              duration: 400
            });
            await loading.present();
        
            this.modalCtrl.dismiss();
            const modal = await this.modalCtrl.create({
              component: EventdetailPage,
              cssClass: 'my-custom-class',
              componentProps: {
                // eventname: this.eventname,
                postId: this.postId,
                // userid: this.userid
              }
            });
            return await modal.present();


          }
        }
      ]
    });
    await alert.present();
  }

  // tslint:disable-next-line:variable-name
  async notJoin(Post_id: string, id: string) {
    const alert = await this.alertController.create({
      header: 'ยกเลิกเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการที่จะยกเลิกการเข้าร่วมอีเว้นท์',
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
            console.log('confirm');
            this.join = false;
            this.joinService.getidJoin(id).subscribe(data => {
              this.dataJoin = data;
              console.log(this.dataJoin);
              const postId = this.dataJoin['postId'];
              const postName = this.dataJoin['postName'];
              const ownerName = this.dataJoin['ownerName'];
              const ownerId = this.dataJoin['ownerId'];
              const joinerName = this.dataJoin['joinerName'];
              const joinerId = this.dataJoin['joinerId'];
              const status = this.dataJoin['status'];
              const datetime = this.dataJoin['datetime'];
              const starttime = this.dataJoin['starttime'];
              const endtime = this.dataJoin['endtime'];
              const place = this.dataJoin['place'];
              const type = this.dataJoin['type'];
              const press = 'out';
              const inject = false;
              const description = 'ออกจากกิจกรรม';
              const read = false;

              // tslint:disable-next-line:max-line-length
              this.notiService.addNotification(postId, postName, ownerName, ownerId, joinerName, joinerId, status, datetime, starttime, endtime, place, type, press, inject, description, read);
            });

            this.joinService.leaveJoin(id);

            // });
            // this.joinService.getJoin().subscribe(data => {
            //   this.nowjoin = data;
            //   const idUser = localStorage.getItem('id_user');
            //   const postId = this.nowjoin['postId'];
            //   console.log(postId);
            // });
            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              // message: 'Please wait...',
              duration: 400
            });
            await loading.present();
        
            this.modalCtrl.dismiss();
            const modal = await this.modalCtrl.create({
              component: EventdetailPage,
              cssClass: 'my-custom-class',
              componentProps: {
                // eventname: this.eventname,
                postId: this.postId,
                // userid: this.userid
              }
            });
            return await modal.present();


          }
        }
      ]
    });
    await alert.present();
  }

  async deletePost(id: string) {
    const alert = await this.alertController.create({
      header: 'ยกเลิกอีเว้นท์',
      message: 'คุณต้องการที่จะยกเลิกกิจกรรมนี้',
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
          handler: () => {
            console.log(id);
            this.joinService.getJoinPostId(id).subscribe(data => {
              this.joinThisPost = data;
              // console.log(this.joinThisPost);
              for (let join in this.joinThisPost) {
                this.joinChecked = this.joinThisPost[join];

                const postId = this.joinChecked.postId;
                // console.log('postId naja ', postId);
                const postName = this.joinChecked.postName;
                const ownerName = this.joinChecked.ownerName;
                const ownerId = this.joinChecked.ownerId;
                const joinerName = this.joinChecked.joinerName;
                const joinerId = this.joinChecked.joinerId;
                const status = this.joinChecked.status;
                const datetime = this.joinChecked.datetime;
                const starttime = this.joinChecked.starttime;
                const endtime = this.joinChecked.endtime;
                const place = this.joinChecked.place;
                const type = this.joinChecked.type;
                const press = 'delete';
                const inject = false;
                const description = 'ยกเลิกกิจกรรมแล้ว';
                const read = false;
                // console.log(this.joinChecked.joinerName);
                // tslint:disable-next-line:max-line-length
                this.notiService.addNotification(postId, postName, ownerName, ownerId, joinerName, joinerId, status, datetime, starttime, endtime, place, type, press, inject, description, read);
                // this.historyService.addHistory(postId, postName, ownerName, ownerId, joinerName, joinerId, datetime, starttime, endtime, place, type);

              }

              this.postService.deletePost(id);
              this.joinService.deleteJoinPost(id);
              // this.joinService.deleteJoinPost(id);
              // this.notiService.addNotification
              window.location.reload();
              this.router.navigateByUrl('home');
            });

          }
        }
      ]
    });
    await alert.present();
  }
  async listJoiner(id: string) {
    // console.log(id);
    const modal = await this.modalCtrl.create({
      component: JoinerEventPage,
      cssClass: 'my-custom-class',
      componentProps: {
        postId: id,
      }
    });
    return await modal.present();
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }


}
