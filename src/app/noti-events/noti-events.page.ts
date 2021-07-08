import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { JoinsService } from '../api/joins.service';
import { PostsService } from '../api/posts.service';



@Component({
  selector: 'app-noti-events',
  templateUrl: './noti-events.page.html',
  styleUrls: ['./noti-events.page.scss'],
})
export class NotiEventsPage implements OnInit {
  allPost: any;
  idUser: string;
  myPost: any;
  allJoin: any;
  idPost: any;
  userJoin: any;
  enabled = true;
  public join: boolean;
  public notjoin: boolean;
  myJoin: any;
  myPdetail: any;
  myUserjoin: any;

  constructor(public navCtrl: NavController,
              private joinService: JoinsService,
              private postService: PostsService,
              public modalCtrl: ModalController,
              public loadingController: LoadingController) {
    this.join = true;
    this.notjoin = false;
  }
  // public technologies: Array<{ name: string, description: string, time: string }> = [
  //   {
  //      name : 'กินข้าวร้านพี่แบงค์',
  //      description : 'หาเพื่อนกินข้าว',
  //      time : '29/04/2564 17:00 ถึง 19:00'
  //   },
  //   {
  //      name : 'เตะบอลโว้ยย',
  //      description : 'เตะบอลออกกำลังกาย',
  //      time: '29/04/2564 17:00 ถึง 19:00'
  //   }
  // ];


  ngOnInit() {
    this.postService.getallPost().subscribe(result => {
      this.allPost = result.response;
      const idUser = localStorage.getItem('id_user');
      this.myPost = this.allPost.filter(post => post.userid === idUser);

      this.joinService.getJoin().subscribe(data => {
        this.allJoin = data.response;
        // console.log((this.myPost));

        // tslint:disable-next-line:forin
        for (const p in this.myPost){
          this.myPdetail = this.myPost[p];
          const idPost = this.myPdetail._id;
          // console.log(idPost);
          // tslint:disable-next-line:forin
          for (const j in this.allJoin) {
            this.myJoin = this.allJoin[j];
          }
          this.myUserjoin = this.allJoin.filter(joinData => joinData.postId === idPost);
          // console.log(this.myUserjoin);
        }


      });
    });


  }
  Join() {
    this.join = false;
    this.notjoin = true;
  }
  notJoin() {
    this.join = true;
    this.notjoin = false;
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
