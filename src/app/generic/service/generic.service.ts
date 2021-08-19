import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ObjectLength } from './../../model/objectLength';
import { PoResponse } from './../../model/po-response.interface';
import {User} from './user.model'

@Injectable()
export class GenericService<T> {
  user : User
  path: string;

  private readonly urlApi = 'https://localhost:3001';

  constructor(private http: HttpClient) { }

  delete(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.urlApi}/${this.path}/${id}`).pipe(map(() => (id), error => (error)));
  }

  get(): Observable<PoResponse> {
    return this.http.get<PoResponse>(`${this.urlApi}/${this.path}`);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.urlApi}/${this.path}/${id}`);
  }

  getCount(): Observable<number> {
    return this.http.get<ObjectLength>(`${this.urlApi}/${this.path}/count/`).pipe(map(result => (result.length)));
  }

  post(entity: any): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}`, entity);
  }

  postWithPath(path: string, entity: any): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}/${path}`, entity);
  }

  postWithPathLogin(path : string, email:string, password:string): Observable<User> {
    return this.http.post<User>(`${this.urlApi}/${path}`, {email : email, password : password})
                               .pipe(map(user => this.user = user));
  }

  put(entity: any): Observable<T> {
    return this.http.put<T>(`${this.urlApi}/${this.path}/${entity.id}`, entity);
  }
}
