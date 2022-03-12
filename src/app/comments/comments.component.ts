import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments: any;
  @Input() index: any;
  @Input() user: any;

  @Output() updatedComment:EventEmitter<any> = new EventEmitter();

  public userComment: any;
  public author: any;
  public enableDelete: boolean = false;

  constructor(private dataServ: DataServiceService) { }

  ngOnInit(): void {
    var User = this.dataServ.getUser();
    if (this.user && this.user == User.name) {
      this.enableDelete = true;
    }
  }

  showCommentOption(index: any) {
    if (this.comments[index].showReply != null || this.comments[index].showReply != undefined)
      this.comments[index].showReply = !this.comments[index].showReply;
    else this.comments[index].showReply = true;
  }

  addComment(index: any) {
    this.comments[index].showReply = false;
    this.comments[index].comments.push({
      author: this.author,
      comment: this.userComment,
      likes: 0,
      comments: []
    });
    this.updatedComment.emit({updatedComment: this.comments});
  }

  addLikes(index: any) {
    this.comments[index].likes++; 
  }

  updateComment(event: any,index: any) {
    this.comments[index].comments = event.updatedComment;
    this.updatedComment.emit({updatedComment: this.comments});
  }

  deleteComment(index: any) {
    this.comments.splice(index,1);
    this.updatedComment.emit({updatedComment: this.comments});
  }

}
