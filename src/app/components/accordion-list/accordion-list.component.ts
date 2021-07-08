import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { JoinsService } from 'src/app/api/joins.service';
import { PostsService } from 'src/app/api/posts.service';

@Component({
  selector: 'app-accordion-list',
  templateUrl: './accordion-list.component.html',
  styleUrls: ['./accordion-list.component.scss'],
})
export class AccordionListComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  description: string;
  @Input()
  time: string;
  @Input()
  start: string;
  @Input()
  end: string;
  // @Input()
  // time: string;
  // @Input()
  // time: string;
  // tslint:disable-next-line:no-output-native
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();
  public isMenuOpen = false;
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
  joiner: any;
  idOfPost: any;
  userJoinArray: any = [];

  constructor(public navCtrl: NavController,
              private joinService: JoinsService,
              private postService: PostsService) { }

  ngOnInit() {
    this.postService.getallPost().subscribe(result => {
      this.allPost = result.response;
      const idUser = localStorage.getItem('id_user');
      this.myPost = this.allPost.filter(post => post.userid === idUser);
      this.idPost = this.myPost;
      // console.log(this.idPost);

      this.joinService.getJoin().subscribe(data => {
        this.allJoin = data.response;
        // console.log((this.myPost));
        console.log(this.allJoin.length);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.allJoin.length; i++) {
          // console.log(this.allJoin[i]);
          this.joiner = this.allJoin.filter(joiner => joiner.postId === this.idPost[0]);
          console.log(this.joiner);
        }

        // this.idPost.forEach(element => {
        //   this.idOfPost = element._id;
        //   // console.log(this.idOfPost);
        //   this.joiner = this.allJoin.filter(joiner => joiner.postId === this.idOfPost);
        //   console.log(this.joiner);
        //   // this.userJoinArray.push(this.joiner);
        //   // console.log(this.userJoinArray);
        // });
        // tslint:disable-next-line:forin

        // for (const p in this.myPost){
        //   this.myPdetail = this.myPost[p];
        //   const idPost = this.myPdetail._id;
        //   // console.log(idPost);
        //   // tslint:disable-next-line:forin
        //   for (const j in this.allJoin) {
        //     this.myJoin = this.allJoin[j];
        //   }
        //   this.myUserjoin = this.allJoin.filter(joinData => joinData.postId === idPost);
        //   console.log('joinner :', this.myUserjoin);
        // }
        // this.joiner = this.allJoin.filter(joiner => joiner.postId === this.idPost);
        // console.log(this.joiner);
      });
    });
  }
  public toggleAccordion(): void
  {
      this.isMenuOpen = !this.isMenuOpen;
  }

}
