import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
    id!: string;
    mail!: string;
    userName!: string;
    password!: string;
 }
 export class LoginModule {
  mail : string;
  password : string
  constructor(obj: any) {
    this.mail = obj.mail;
    this.password = obj.password;
  }
 }
  export class RegisterModule {
    private id : string | undefined;
    private userName : string;
    private mail : string;
    private password : string

    constructor(obj: any) {
      this.mail = obj.mail;
      this.password = obj.password;
      this.userName = obj.userName;
  }
}
