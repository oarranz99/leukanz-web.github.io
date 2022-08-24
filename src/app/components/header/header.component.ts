import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpenLoginModal: boolean = false;
  isLogged: boolean = false;
  userName!: string;
  openProfile: boolean = false;
  openIndex: boolean = false;
  @ViewChild(LoginComponent)
  child!: LoginComponent;
  isFixedNavbar :boolean = true;
  @HostBinding('class.navbar-opened') navbarOpened = false;
  constructor() { }

  ngOnInit(): void {
    this.openIndex = true;
    this.openProfile = false;
    
    if(this.isLogged){
      this.isOpenLoginModal = false;
    }
    this.isOpenLoginModal = true;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }
  closeLoginModal(){
    this.isOpenLoginModal = false;
  }
  openLoginModal(){
    this.isOpenLoginModal = true;
  }
  logged(data: any){
    //If the database response is true, is logged is true, and the modal will close
    this.isLogged = data.log;
    this.userName = data.name;
    if(this.isLogged){
      this.closeLoginModal()
    }
  }
  closeSession(){
    this.isLogged = false;
    this.userName = "";
    this.child.cleanUser();
  }
  viewProfile(){
    console.log(this.openProfile)
    this.openProfile = !this.openProfile;
    this.openIndex = !this.openIndex;
    console.log(this.openProfile)
  }
  viewIndex(){
    this.openProfile = !this.openProfile;
    this.openIndex = !this.openIndex;
  }


    collapsed = true;

}
