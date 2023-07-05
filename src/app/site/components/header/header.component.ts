import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-site-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public pathRoad: String = ""

  constructor(
    public authService: AuthService
  ) { 
    this.pathRoad = window.location.pathname
  }

  ngOnInit(): void { }

}