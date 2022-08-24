import { Injectable } from '@angular/core';
import { LoginModule, RegisterModule } from 'src/app/models/user/user.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public tryLogin(usr:LoginModule): Observable <any>{
    const url = "http://localhost:8080/api/users/login";
    const headers = { 'content-type': 'application/json'} ;
    const body=JSON.stringify(usr);
    return this.http.post(url, body,{'headers':headers})
  }
  public tryRegister(usr:RegisterModule): Observable <any>{
    const url = "http://localhost:8080/api/users/registerUser";
    const headers = { 'content-type': 'application/json'} ;
    const body=JSON.stringify(usr);
    return this.http.post(url, body,{'headers':headers})
  }
}
