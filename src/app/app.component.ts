import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public appLoading: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // sayfa geçişleri
    this.router.events.subscribe((event: any) => {
      this.navigationInterceptor(event)
    })
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.appLoading = true;
    }
    if (event instanceof NavigationEnd) {
      this.appLoading = false;
    }
    if (event instanceof NavigationCancel) {
      this.appLoading = false;
    }
    if (event instanceof NavigationError) {
      this.appLoading = false;
    }
  }
}
