import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper=new JwtHelperService();
  decodedToken:any;


  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json'
});

constructor(private http: HttpClient) { }


login(model: any) {
return this.http.post(this.baseUrl + 'login', model, { headers: this.headers })
.pipe(
  map((response: any) => {
    const user = response;
    if(user)
    {
      localStorage.setItem('Token', user.token);
      this.decodedToken=this.jwtHelper.decodeToken(user.token);
      console.log(this.decodedToken);
    }
  })
)
}
register(model:any)
{
  return this.http.post(this.baseUrl+'register',model);
}

loggedIn(){
  const token=localStorage.getItem('Token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
