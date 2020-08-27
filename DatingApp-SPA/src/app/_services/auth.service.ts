import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:44311/api/auth/';
  
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
    }
  })
)
}
register(model:any)
{
  return this.http.post(this.baseUrl+'register',model);
}


}
