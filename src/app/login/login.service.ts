import { Injectable } from '@angular/core';    
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';    
  
@Injectable({    
  providedIn: 'root'    
})    
export class LoginService {    
  isAuthenticated: boolean = false;  
  constructor(private http: HttpClient) { }    
    
    
  postData(data): any {      
    const body = new HttpParams()          
    .set('grant_type', data.grant_type)          
    .set('username', data.username)    
    .set('password', data.password)    
    return this.http.post('http://localhost:64913/token', body.toString(), {observe: 'response',    
      headers: { 'Content-Type': 'application/json' },    
    });    
  }
  
  checkIsAutheticated() {
    return this.isAuthenticated = true;
  }
}   