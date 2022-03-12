import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public blogs: any;
  public loggedInUser: boolean = false;
  public userComment: any;
  public author: any;
  public user: any;


  constructor(private dataServ: DataServiceService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.blogs = this.dataServ.Posts;
    var User: any = this.dataServ.getUser();
    if (User && User.active) {
      this.loggedInUser = true;
      this.user = User.name;
    }
  }

  setImage(data: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  updateComment(event: any, index: any) {
    this.blogs[index].comments = event.updatedComment;
    this.dataServ.setBlogs(this.blogs);
    this.dataServ.Posts = this.blogs;
  }

  logout() {
    this.loggedInUser = false;
    this.dataServ.removeUser();
    this.user = '';
  }

  addLikes(index: any) {
    this.blogs[index].likes ++;
  }

  showCommentOption(index: any) {
    if (this.blogs[index].showReply != null || this.blogs[index].showReply != undefined)
      this.blogs[index].showReply = !this.blogs[index].showReply;
    else this.blogs[index].showReply = true;
  }

  addComment(index: any) {
    this.blogs[index].showReply = false;
    this.blogs[index].comments.push({
      author: this.author,
      comment: this.userComment,
      likes: 0,
      comments: []
    });
    this.dataServ.setBlogs(this.blogs);
    this.dataServ.Posts = this.blogs;
  }

  deletePost(index: any) {
    this.blogs.splice(index,1);
    this.dataServ.setBlogs(this.blogs);
    this.dataServ.Posts = this.blogs;
  }

}
