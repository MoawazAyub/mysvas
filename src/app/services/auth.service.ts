import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authStatusListner = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getauthStatusListner()
  {
    return this.authStatusListner.asObservable();
  }

  createUser(email: string, password: string, name: string, telephone: string
    , location: string, businessRole: string, joiningReason: string, companyName: string
    , type: string) {

      const authData: AuthData = { email: email, password: password, name: name, telephone: telephone
      , location: location, businessRole: businessRole, joiningReason: joiningReason,
      companyName: companyName, type: type };

      this.http
      .post('http://localhost:3000/api/user/signup', authData).subscribe(response => {
        console.log(response);
      });

  }

  getToken() {
    return this.token;
  }

  login(email: string, password: string) {
    const authData: any = { email: email, password: password };
    this.http
      .post<{token: string, expiresIn: number}>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe(response => {

        this.token = response.token;
        console.log(this.token);
        this.authStatusListner.next(true);
      });

  }


}

