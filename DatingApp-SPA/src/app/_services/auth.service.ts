import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper=new JwtHelperService();
  decodedToken:any;
  currentUser:User;
  photoUrl=new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl=this.photoUrl.asObservable();


  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json'
});

constructor(private http: HttpClient) { }

changeMemberPhoto(photoUrl:string){
  this.photoUrl.next(photoUrl);
}


login(model: any) {

return this.http.post(this.baseUrl + 'login', model, { headers: this.headers })
.pipe(
  map((response: any) => {
    const user = response;
    if(user)
    {
      
      localStorage.setItem('Token', user.token);
      localStorage.setItem('user',JSON.stringify(user.user));
      this.decodedToken=this.jwtHelper.decodeToken(user.token);
      this.currentUser=user.user;
      this.changeMemberPhoto(this.currentUser.photoUrl);
       //console.log(this.decodedToken);
    }
  })
)
}
register(user:User)
{
  return this.http.post(this.baseUrl+'register',user);
}

loggedIn(){
  const token=localStorage.getItem('Token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
