import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-service-navbar-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class NavbarProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit(): void { }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
