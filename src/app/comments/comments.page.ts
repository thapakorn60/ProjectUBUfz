import { async } from '@angular/core/testing';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertController, IonSlides, ModalController, LoadingController } from '@ionic/angular';
import { JoinsService } from 'src/app/api/joins.service';
import { CommentsService } from '../api/comments.service';
import { UsersService } from '../api/users.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @Input() eventname: string;
  @Input() postId: string;
  @Input() userid: string;

  allJoin: any;
  joiner: any;
  userId: any;
  // tslint:disable-next-line:variable-name
  email_login = '';
  // tslint:disable-next-line:variable-name
  data_user_login = {};
  url = 'http://localhost:3000/user/getuserDetail';
  Comment = {
    postId: '',
    ownerName: '',
    ownerId: '',
    description: '',
    // reqtojoin:[]
  };
  userName: any;
  allComment: any;
  ownerId: any;
  status: any;
  thisJoin: any;
  joinerId: any;
  thisComment: any;
  iduser: string;
  dataUser: any;
  color = '#575757';
  constructor(public modalCtrl: ModalController,
              public alertController: AlertController,
              public joinService: JoinsService,
              private userService: UsersService,
              public commentService: CommentsService,
              private http: HttpClient,
              public toastController: ToastController,
              public loadingController: LoadingController) {}

  ngOnInit() {
    console.log('name : ', this.eventname);
    console.log('Postid : ', this.postId);
    console.log('userid : ', this.userid);
    this.userId = localStorage.getItem('id_user');
    this.userService.getidUser(this.userId).subscribe(user => {
      this.dataUser = user ;
      // this.userId = this.dataUser._id;
      this.userName = this.dataUser.name;
      // console.log(this.dataUser);
      // console.log(this.userName);
    });
    this.commentService.getComment().subscribe(data => {
      this.allComment = data.response;
      this.thisComment = this.allComment.filter(comment => comment.postId === this.postId);
      console.log(this.thisComment);
    });
    this.joinService.getJoin().subscribe(data => {
      this.allJoin = data.response;
      this.joiner = this.allJoin.filter(joiner => joiner.postId === this.postId && joiner.status === true);
      console.log(this.joiner);
      // tslint:disable-next-line:forin
      for (const i in this.joiner){
        this.thisJoin = this.joiner[i];
        this.ownerId = this.thisJoin.ownerId;
        this.joinerId = this.thisJoin.joinerId;
        this.status = this.thisJoin.status;
      }

    });
  }

  async addComment(){
    if (this.Comment.description === ''){
      const toast = await this.toastController.create({
        message: 'Not message.',
        duration: 2000
      });
      toast.present();
    } else{
    this.commentService.addComment(
      this.postId,
      this.userName,
      this.userId,
      this.Comment.description
    );
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      // message: 'Please wait...',
      duration: 400
    });
    await loading.present();

    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        eventname: this.eventname,
        postId: this.postId,
        userid: this.userid
      }
    });
    return await modal.present();
  }

  async deleteComment(id: string) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'คุณต้องการจะลบคอมเมนท์นี้',
      // cssClass: 'buttonCss',
      buttons: [
        {
          text: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'confirm',
          cssClass: 'dangerClass',
          handler: async () => {
            this.commentService.deleteComment(id);
            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              // message: 'Please wait...',
              duration: 400
            });
            await loading.present();

            this.modalCtrl.dismiss();
            const modal = await this.modalCtrl.create({
              component: CommentsPage,
              cssClass: 'my-custom-class',
              componentProps: {
                eventname: this.eventname,
                postId: this.postId,
                userid: this.userid
              }
            });
            return await modal.present();
          }
        }
      ]
    });
    await alert.present();
  }

  async test() {
    const alert = await this.alertController.create({
      header: 'No more',
      message: 'Do not have anymore',
      buttons: [
        {
          text: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        },
        {
          text: 'confirm',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

}
