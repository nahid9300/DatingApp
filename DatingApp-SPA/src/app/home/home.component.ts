import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode=false;
// values: any;

  constructor(private http:HttpClient, private authService:AuthService) { }

  ngOnInit() {
  //  this.getValues();
  }

  registerToggle(){
  this.registerMode= true;
  }

//   getValues()
//   {
//     this.http.get('https://localhost:44311/api/Values').subscribe(response=>{
// this.values = response;
//     }, error => {
//       console.log(error);
//     });
//   }

  cancelRegisterMode(registerMode:boolean)
  {
    this.registerMode=registerMode;
  }

  loggedIn(){
   
    return this.authService.loggedIn();
  }

}
