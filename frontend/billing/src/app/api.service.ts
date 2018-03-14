import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

export interface Creds {
  login: string;
  password: string;
}

export interface Login {
  login: string;
  account : string;
  name: string;
  permission: string[];
}

const apiUrl = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor( private http: HttpClient ) { }

    auth_login ( creds: Creds): Observable<Login>{
      const url = `${apiUrl}auth/login`;
      return this.http.post<Login>(url, creds);
    }
    auth_logout (): Observable<boolean> {
      const url = `${apiUrl}auth/logout`;
      return this.http.post<boolean>(url, {});
    }
    auth_refresh (): Observable<Login>{
      const url = `${apiUrl}auth/refresh`;
      return this.http.post<Login>(url, {});
    }

    call(path: string, data): Observable<any>{
      let url = `${apiUrl}${path}`;
      return this.http.post(url, data);
    }

}
