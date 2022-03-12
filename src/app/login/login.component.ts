import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: string = '';
  public password: string = '';
  public showRegisterFlag: boolean = false;

  constructor(private dataServ: DataServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login() {
    var Users =this.dataServ.Users;
    var User = Users.filter((user:any) => user.name == this.userName);
    if (User[0] && User[0].password === this.password) {
      this.dataServ.setValidUser(User[0]);
      this.router.navigate(['home']);
    } else
      alert('Invalid username or password');
  }

  showRegister() {
    this.showRegisterFlag = !this.showRegisterFlag;
  }

  register() {
    var User = this.dataServ.Users.filter((user: { name: string; }) => user.name == this.userName);
    if(User.length > 0)
      alert('User already exist')
    else {
      var users = this.dataServ.Users;
      users.push({
        name: this.userName,
        password: this.password
      });
      this.dataServ.Users = users;
      this.showRegister();
    }
  }

}
