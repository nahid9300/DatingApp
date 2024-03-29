import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any={};
  photoUrl:string;

  constructor(public authService: AuthService, private alertify:AlertifyService,private router:Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl=>this.photoUrl=photoUrl);
  }

  login()
  {
    this.authService.login(this.model).subscribe(next =>{
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error("Wrong Userid and password you noob");
    }, ()=>{
      this.router.navigate(['/members']);
    }
    );
  }
  loggedIn(){
   
    return this.authService.loggedIn();
  }
  logout()
  {
   localStorage.removeItem('Token');
   localStorage.removeItem('user');
   this.authService.decodedToken=null;
   this.authService.currentUser=null;
   this.alertify.message('logged out');
   this.router.navigate(['/home']);
  }




}

// export class userDto{
//   Username :string;
//   password :string;
// }
