import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public blogs: any;
  public User: any;
  public title: any;
  public post: any;
  public image: any;

  constructor(private dataServ: DataServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.blogs = this.dataServ.Posts;
    console.log(this.blogs);
    this.User = this.dataServ.getUser();
  }

  submitPost() {
    this.blogs.push({
      title: this.title ? this.title : '',
      blog: this.post ? this.post : '',
      author: this.User.name,
      likes: 0,
      image: this.image ? this.image : '',
      comments: []
    });
    this.router.navigate(['home']);
  }

  uploadImage(event: any) {
    console.log(event);
    var file: File = event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image);
    }
    myReader.readAsDataURL(file);
  }

}
