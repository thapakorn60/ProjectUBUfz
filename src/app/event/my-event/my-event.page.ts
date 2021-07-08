import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JoinsService } from 'src/app/api/joins.service';
import { PostsService } from 'src/app/api/posts.service';
import { EventdetailPage } from '../eventdetail/eventdetail.page';
import { JoinerEventPage } from '../joiner-event/joiner-event.page';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.page.html',
  styleUrls: ['./my-event.page.scss'],
})
export class MyEventPage implements OnInit {
  allPost: any;
  myPost: any;
  idPost: any;
  joiner: any;
  allJoin: any;
  thisJoin: any;
  thisPost: any;
  idThisjoin: any;
  thisJoinR: any;
  thisJoinA: any;
  dateNow = Date.now();
  constructor(public modalController: ModalController,
              public joinService: JoinsService,
              public postService: PostsService ) { }

  ngOnInit() {
    this.postService.getallPost().subscribe(result => {
      this.allPost = result.response;
      const idUser = localStorage.getItem('id_user');
      this.myPost = this.allPost.filter(post => post.userid === idUser);

      console.log();
      // tslint:disable-next-line:forin
      this.joinService.getJoin().subscribe(data => {
        this.allJoin = data.response;
        // for (const post in this.myPost) {
        // this.thisPost = this.myPost[post];
        // console.log('Post ID: ', this.thisPost._id);
        // console.log(this.allJoin);
        // tslint:disable-next-line:forin
        // for (const joi in this.allJoin){
        //   this.thisJoin = this.allJoin[joi];
        //   // console.log(this.thisJoin);
        // }
        // if (this.thisJoin.status === false){

        // this.thisJoinR = this.allJoin.filter(join => join.postId === this.thisPost._id && join.status === false);
        // }else if (this.thisJoin.status === true){

        // this.thisJoinA = this.allJoin.filter(join => join.postId === this.thisPost._id && join.status === true);
        // }

        // console.log('คำขอ ', this.thisJoinR);
        // console.log('ยอมรับแล้ว ', this.thisJoinA);

          // console.log('**********************************');

          // tslint:disable-next-line:forin
          // for (const joi in this.allJoin) {
          //   this.thisJoin = this.allJoin[joi];
          //   console.log(this.thisJoin);
          //   // this.idThisjoin = this.thisJoin.postId;
          //   // console.log(this.idThisjoin);
          //   // this.joiner = this.thisJoin.postId === this.thisPost._id;
          //   //       // console.log(this.thisJoin);
          //   // console.log(this.joiner);
          //   // console.log(this.joiner.length);
          //   }
        // }
      });
      // console.log(this.myPost);
      // this.idPost = this.myPost;
      // console.log(this.idPost);
    });
  }

  async seeDetail(id: string) {
    // console.log(id);
    const modal = await this.modalController.create({
      component: EventdetailPage,
      cssClass: 'my-custom-class',
      componentProps: {
        postId: id,
      }
    });
    return await modal.present();
  }

  async listJoiner(id: string) {
    // console.log(id);
    const modal = await this.modalController.create({
      component: JoinerEventPage,
      cssClass: 'my-custom-class',
      componentProps: {
        postId: id,
      }
    });
    return await modal.present();
  }

}
