import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  //readonly
  baseURL = 'http://localhost:30002/api/users' 
  formData: Users = new Users();
  listUsers: Users[];


  postUsers() {

    return this.http.post(this.baseURL, this.formData);
  }

  putUsers() {

    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);

  }

  /*putDataUsers(id:number, users:Users){

    const apiUsers = this.baseURL + '/' + id;
    return this.http.put<Users>(apiUsers, users);


  }*/

  deleteUsers(id: number) {

    return this.http.delete(`${this.baseURL}/${id}`);


  }

  refreshList() {

    this.http.get(this.baseURL)
      .toPromise()
      .then(res => this.listUsers = res as Users[]);


  }
}
