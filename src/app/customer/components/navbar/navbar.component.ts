import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { TranslationService } from 'src/app/services/translation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  public profileMenu: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    // private translate: TranslationService,
    public userService: UserService
  ) { }

  ngOnInit(): void { }

  changeLang(lang: string) {
    // this.translate.setLanguage(lang)
  }

  profileToggle() {
    this.profileMenu = !this.profileMenu
  }

  profileOutside() {
    this.profileMenu = false
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}