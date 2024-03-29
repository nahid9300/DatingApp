import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularApp-SPA';
  jwtHelper=new JwtHelperService();

constructor(private authservice:AuthService)
{

}
ngOnInit(){
  const token=localStorage.getItem('Token');
  const user:User=JSON.parse(localStorage.getItem('user'));
  if(token)
  {
    this.authservice.decodedToken=this.jwtHelper.decodeToken(token)
  }
  if(user)
  {
    this.authservice.currentUser=user;
    this.authservice.changeMemberPhoto(user.photoUrl);
  }
}

}
