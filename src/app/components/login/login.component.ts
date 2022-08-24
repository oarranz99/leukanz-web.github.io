import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModule, RegisterModule, UserModule } from 'src/app/models/user/user.module';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
   
  ]
})

export class LoginComponent implements OnInit {
  @Output("closeLoginModal") closeLoginModal = new EventEmitter<boolean>();
  @Output("logged") logged = new EventEmitter<{log : boolean , name : string}>();
  isLoginOpened: boolean = false;
  isLogged: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  typePswd = "password";
  remember = Boolean;
  loginForm = new FormGroup({
    'mail': new FormControl('',[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    'password': new FormControl('',[Validators.required])
    });
  registerForm = new FormGroup({
    'mail': new FormControl('',[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    'password': new FormControl('',[Validators.required, Validators.minLength(8)]),
    'userName': new FormControl('',[Validators.required, Validators.minLength(4)])
    });
  loggedUser: UserModule = {
  mail : "",
  password : "",
  userName : "",
  id : ""
  } ;
  
  constructor( private loginService:LoginService) { 
    
  }
  ngOnInit() {
    if(localStorage.getItem('user') === null){
      this.isLoginOpened= true;
    }else{
      //var userData = JSON.parse(localStorage.getItem('user'));
      //this.loggedUser = userData;
      this.isLogged = true;
      this.logged.emit({log : true , name: this.loggedUser.userName});
    }
    
  }
  close(){
    this.isLoginOpened= false;
  }
  open(){
    this.isLoginOpened= true;
  }
  closeModal(){
    this.closeLoginModal.emit();
  }
  doLogin(){
      var userInfo: UserModule;
      if (this.loginForm.invalid) {
        this.loginForm.setErrors ({ ...this.loginForm.errors, 'loginInvalid': true });
        return;
      }
     this.loginService.tryLogin(new LoginModule (this.loginForm.value)).subscribe(resp => {
          if(resp.status == "Ok"){
            if(resp.data.length > 0 ){
              userInfo = resp.data[0];
              this.loggedUser.mail = userInfo.mail;
              this.loggedUser.password = userInfo.password;
              this.loggedUser.userName = userInfo.userName;
              this.logged.emit({log : true , name: this.loggedUser.userName});
              this.isLogged = true; 
              if(this.remember()){
                if(localStorage.getItem('user') === null){
                  localStorage.setItem('user', JSON.stringify(this.loggedUser));
                }
              }
              return;
            }else{
              this.loginForm.setErrors ({ ...this.loginForm.errors, 'loginInvalid': true });
            }
          }else{
            this.loginForm.setErrors ({ ...this.loginForm.errors, 'loginInvalid': true });
            this.isLogged = false
          }
      })    

  }
  doRegister(){
    var userInfo: UserModule;
    if (this.registerForm.invalid) {
      if(this.registerForm.get('password')?.invalid){
        this.registerForm.setErrors({ ...this.registerForm.errors, 'pswdInvalid': true });
      }
      if(this.registerForm.get('userName')?.invalid){
        this.registerForm.setErrors({ ...this.registerForm.errors, 'nameInvalid': true });
      }
      if(this.registerForm.get('mail')?.invalid){
        this.registerForm.setErrors({ ...this.registerForm.errors, 'mailInvalid': true });
      }
      return;
    }
    this.loginService.tryRegister(new RegisterModule (this.registerForm.value)).subscribe(data => {
        if(data.valid){
          if(data.login && data.object != null ){
            console.log(data)
            userInfo = data.object;
            this.loggedUser.id = userInfo.id;
            this.loggedUser.mail = userInfo.mail;
            this.loggedUser.password = userInfo.password;
            this.loggedUser.userName = userInfo.userName;
            this.logged.emit({log : true , name: this.loggedUser.userName});
            this.isLogged = true; 
            return;
          }
        }else{
          this.isLogged = false
        }
    })      
  }
  showPswd(){
    this.typePswd = "text";
  }
  hidePswd(){
    this.typePswd = "password";
  }
  cleanUser(){
    this.logged.emit({log : false , name: ""});
    this.loggedUser.mail = '';
    this.loggedUser.password = '';
    this.loggedUser.userName = '';
    this.isLogged = false; 
  }
}
