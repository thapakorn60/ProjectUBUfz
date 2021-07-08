import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  logData: {};
  constructor(private http: HttpClient) { }

  addComment(
    postId: string,
    ownerName: string,
    ownerId: string,
    description: string

  ){
    this.logData = {
      postId,
      ownerId,
      ownerName,
      description

    };
    this.http.post('http://localhost:3000/comment/addcomment', this.logData).subscribe((res) => {
      console.log(res);
    });
  }
  getComment() {
    return this.http.get<{ response: any }>('http://localhost:3000/comment/getcomment');
  }
  deleteComment(id: string) {
    console.log(id);
    this.http.delete('http://localhost:3000/comment/deletecomment/' + id).subscribe(res => {
      console.log(res);
    });

  }
}
